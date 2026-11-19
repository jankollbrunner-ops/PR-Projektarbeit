import { MONGODB_URI } from '$app/env/private';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { parseTikTokVideoId, resolveTikTokVideoId } from '#lib/server/tiktok.js';

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

			return { ...recipe, _id: recipe._id.toString(), videoId };
		})
	);
	const categories = [...new Set(recipes.map((recipe) => recipe.category))].sort();
	const randomRecipe = recipes.length
		? recipes[Math.floor(Math.random() * recipes.length)]
		: null;

	return { recipes, categories, randomRecipe, query, databaseError: null };
}
