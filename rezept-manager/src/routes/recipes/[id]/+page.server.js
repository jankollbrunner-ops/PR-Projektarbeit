import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { ADMIN_DELETE_PASSWORD } from '$app/env/private';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { readRecipeForm } from '#lib/server/recipe-form.js';
import { appendRecipeRating, getRecipeRatingSummary } from '#lib/server/recipe-rating.js';
import { parseTikTokVideoId, resolveTikTokVideoId } from '#lib/server/tiktok.js';

function getObjectId(id) {
	if (!ObjectId.isValid(id)) {
		error(404, 'Dieses Rezept wurde nicht gefunden.');
	}

	return new ObjectId(id);
}

export async function load({ params }) {
	const collection = await getRecipesCollection();
	const recipe = await collection.findOne({ _id: getObjectId(params.id) });

	if (!recipe) {
		error(404, 'Dieses Rezept wurde nicht gefunden.');
	}

	let videoId = recipe.videoId ?? parseTikTokVideoId(recipe.tiktokUrl);
	if (!videoId) {
		videoId = await resolveTikTokVideoId(recipe.tiktokUrl);
		if (videoId) {
			await collection.updateOne({ _id: recipe._id }, { $set: { videoId } });
		}
	}

	return {
		recipe: {
			...recipe,
			...getRecipeRatingSummary(recipe),
			_id: recipe._id.toString(),
			videoId
		}
	};
}

export const actions = {
	update: async ({ params, request }) => {
		const { data, errors, values } = readRecipeForm(await request.formData(), {
			includeRating: false
		});
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		const collection = await getRecipesCollection();
		const recipeId = getObjectId(params.id);
		const currentRecipe = await collection.findOne(
			{ _id: recipeId },
			{ projection: { tiktokUrl: 1, videoId: 1 } }
		);
		if (!currentRecipe) {
			error(404, 'Dieses Rezept wurde nicht gefunden.');
		}

		const videoId =
			currentRecipe.tiktokUrl === data.tiktokUrl && currentRecipe.videoId
				? currentRecipe.videoId
				: await resolveTikTokVideoId(data.tiktokUrl);
		const result = await collection.updateOne(
			{ _id: recipeId },
			{ $set: { ...data, videoId, updatedAt: new Date() } }
		);

		if (result.matchedCount === 0) {
			error(404, 'Dieses Rezept wurde nicht gefunden.');
		}

		return { success: 'Deine Änderungen wurden gespeichert.' };
	},
	rate: async ({ params, request }) => {
		const rating = Number(String((await request.formData()).get('rating') ?? '').trim());
		if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
			return fail(400, { ratingError: 'Bitte wähle eine Bewertung von 1 bis 5 Sternen.' });
		}

		const collection = await getRecipesCollection();
		const result = await collection.updateOne(
			{ _id: getObjectId(params.id) },
			appendRecipeRating(rating, new Date())
		);

		if (result.matchedCount === 0) {
			error(404, 'Dieses Rezept wurde nicht gefunden.');
		}

		return { ratingSuccess: 'Danke! Deine Bewertung wurde gespeichert.' };
	},
	remove: async ({ params, request }) => {
		if (!ADMIN_DELETE_PASSWORD) {
			return fail(503, {
				deleteError: 'Das Admin-Passwort ist nicht konfiguriert. Bitte ergänze ADMIN_DELETE_PASSWORD in der .env-Datei.'
			});
		}

		const password = String((await request.formData()).get('adminPassword') ?? '');
		if (password !== ADMIN_DELETE_PASSWORD) {
			return fail(401, { deleteError: 'Das Admin-Passwort ist falsch. Das Rezept wurde nicht gelöscht.' });
		}

		const collection = await getRecipesCollection();
		const result = await collection.deleteOne({ _id: getObjectId(params.id) });

		if (result.deletedCount === 0) {
			error(404, 'Dieses Rezept wurde nicht gefunden.');
		}

		redirect(303, '/');
	}
};
