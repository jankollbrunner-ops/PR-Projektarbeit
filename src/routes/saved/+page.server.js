import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getSessionUser, getSavedRecipesCollection } from '#lib/server/auth.js';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { getRecipeRatingSummary } from '#lib/server/recipe-rating.js';
import { parseTikTokVideoId, resolveTikTokVideoId } from '#lib/server/tiktok.js';

export async function load({ cookies }) {
	const user = await getSessionUser(cookies);
	if (!user) {
		redirect(303, '/?auth=1');
	}

	const savedRecipes = await getSavedRecipesCollection();
	const entries = await savedRecipes
		.find({ userId: new ObjectId(user._id) })
		.sort({ savedAt: -1 })
		.toArray();
	const validRecipeIds = entries
		.map((entry) => entry.recipeId)
		.filter((id) => ObjectId.isValid(id))
		.map((id) => new ObjectId(id));
	const recipesCollection = await getRecipesCollection();
	const recipes = validRecipeIds.length
		? await recipesCollection.find({ _id: { $in: validRecipeIds } }).toArray()
		: [];
	const entryByRecipeId = new Map(entries.map((entry) => [entry.recipeId, entry]));

	const enriched = await Promise.all(
		recipes.map(async (recipe) => {
			let videoId = recipe.videoId ?? parseTikTokVideoId(recipe.tiktokUrl);
			if (!videoId) {
				videoId = await resolveTikTokVideoId(recipe.tiktokUrl);
				if (videoId) {
					await recipesCollection.updateOne({ _id: recipe._id }, { $set: { videoId } });
				}
			}
			const entry = entryByRecipeId.get(recipe._id.toString());
			return {
				...recipe,
				...getRecipeRatingSummary(recipe),
				_id: recipe._id.toString(),
				videoId,
				isCooked: entry?.isCooked ?? false
			};
		})
	);

	const cooked = enriched.filter((recipe) => recipe.isCooked);
	const notCooked = enriched.filter((recipe) => !recipe.isCooked);
	return { user, notCooked, cooked };
}

export const actions = {
	toggleCooked: async ({ cookies, request }) => {
		const user = await getSessionUser(cookies);
		if (!user) redirect(303, '/?auth=1');
		const formData = await request.formData();
		const recipeId = String(formData.get('recipeId') ?? '');
		const isCooked = formData.get('isCooked') === 'true';
		if (!ObjectId.isValid(recipeId)) return { cookedError: 'Ungültiges Rezept.' };
		const savedRecipes = await getSavedRecipesCollection();
		await savedRecipes.updateOne(
			{ userId: new ObjectId(user._id), recipeId },
			{ $set: { isCooked: !isCooked, updatedAt: new Date() } }
		);
		return { cookedSuccess: 'Der Kochstatus wurde aktualisiert.' };
	},
	remove: async ({ cookies, request }) => {
		const user = await getSessionUser(cookies);
		if (!user) redirect(303, '/?auth=1');
		const recipeId = String((await request.formData()).get('recipeId') ?? '');
		if (!ObjectId.isValid(recipeId)) return { cookedError: 'Ungültiges Rezept.' };
		const savedRecipes = await getSavedRecipesCollection();
		await savedRecipes.deleteOne({ userId: new ObjectId(user._id), recipeId });
		return { cookedSuccess: 'Das Rezept wurde aus deiner Liste entfernt.' };
	}
};
