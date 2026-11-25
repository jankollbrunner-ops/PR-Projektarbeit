import { MONGODB_URI } from '$app/env/private';
import { fail } from '@sveltejs/kit';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { getRecipeRatingSummary } from '#lib/server/recipe-rating.js';
import { parseTikTokVideoId, resolveTikTokVideoId } from '#lib/server/tiktok.js';
import {
	createSession,
	deleteSession,
	getUsernameSuggestion,
	getUsersCollection,
	normalizeUsername,
	validateUsername
} from '#lib/server/auth.js';

function escapeRegex(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function load({ url }) {
	const query = url.searchParams.get('q')?.trim() ?? '';
	if (!MONGODB_URI) {
		return {
			recipes: [],
			categories: [],
			randomRecipe: null,
			query,
			databaseError: 'MongoDB ist noch nicht verbunden. Richte deine Atlas-Verbindung in der lokalen .env-Datei ein.'
		};
	}

	const filter = query
		? {
				$or: [
					{ name: { $regex: escapeRegex(query), $options: 'i' } },
					{ category: { $regex: escapeRegex(query), $options: 'i' } },
					{ ingredients: { $regex: escapeRegex(query), $options: 'i' } }
				]
			}
		: {};
	const collection = await getRecipesCollection();
	const storedRecipes = await collection.find(filter).sort({ createdAt: -1 }).toArray();
	const recipes = await Promise.all(
		storedRecipes.map(async (recipe) => {
			let videoId = recipe.videoId ?? parseTikTokVideoId(recipe.tiktokUrl);
			if (!videoId) {
				videoId = await resolveTikTokVideoId(recipe.tiktokUrl);
				if (videoId) {
					await collection.updateOne({ _id: recipe._id }, { $set: { videoId } });
				}
			}

			return {
				...recipe,
				...getRecipeRatingSummary(recipe),
				_id: recipe._id.toString(),
				videoId
			};
		})
	);
	const categories = [...new Set(recipes.map((recipe) => recipe.category))].sort();
	const randomRecipe = recipes.length
		? recipes[Math.floor(Math.random() * recipes.length)]
		: null;

	return { recipes, categories, randomRecipe, query, databaseError: null };
}

export const actions = {
	register: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') ?? '').trim().replace(/\s+/g, ' ');
		const validationError = validateUsername(username);
		if (validationError) {
			return fail(400, { authError: validationError, authMode: 'register', attemptedUsername: username });
		}

		const users = await getUsersCollection();
		const usernameKey = normalizeUsername(username);
		const existing = await users.findOne({ usernameKey });
		if (existing) {
			const suggestion = await getUsernameSuggestion(username);
			return fail(409, {
				authError: `Dieser Benutzername ist bereits vergeben. Freier Vorschlag: ${suggestion}`,
				authMode: 'register',
				attemptedUsername: username,
				usernameSuggestion: suggestion
			});
		}

		const now = new Date();
		try {
			const result = await users.insertOne({ username, usernameKey, createdAt: now, updatedAt: now });
			await createSession(cookies, result.insertedId);
			return { authSuccess: `Willkommen, ${username}!` };
		} catch (cause) {
			if (cause?.code === 11000) {
				const suggestion = await getUsernameSuggestion(username);
				return fail(409, {
					authError: `Dieser Benutzername ist bereits vergeben. Freier Vorschlag: ${suggestion}`,
					authMode: 'register',
					attemptedUsername: username,
					usernameSuggestion: suggestion
				});
			}
			throw cause;
		}
	},

	login: async ({ cookies, request }) => {
		const username = String((await request.formData()).get('username') ?? '').trim().replace(/\s+/g, ' ');
		const validationError = validateUsername(username);
		if (validationError) {
			return fail(400, { authError: validationError, authMode: 'login', attemptedUsername: username });
		}

		const users = await getUsersCollection();
		const user = await users.findOne({ usernameKey: normalizeUsername(username) });
		if (!user) {
			return fail(404, {
				authError: 'Dieser Benutzername wurde noch nicht registriert.',
				authMode: 'login',
				attemptedUsername: username
			});
		}

		await createSession(cookies, user._id);
		return { authSuccess: `Angemeldet als ${user.username}.` };
	},

	logout: async ({ cookies }) => {
		await deleteSession(cookies);
		return { authSuccess: 'Du wurdest abgemeldet.' };
	}
};
