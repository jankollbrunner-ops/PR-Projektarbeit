import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { readRecipeForm } from '#lib/server/recipe-form.js';
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

	return { recipe: { ...recipe, _id: recipe._id.toString(), videoId } };
}

export const actions = {
	update: async ({ params, request }) => {
		const { data, errors, values } = readRecipeForm(await request.formData());
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
	remove: async ({ params }) => {
		const collection = await getRecipesCollection();
		const result = await collection.deleteOne({ _id: getObjectId(params.id) });

		if (result.deletedCount === 0) {
			error(404, 'Dieses Rezept wurde nicht gefunden.');
		}

		redirect(303, '/');
	}
};
