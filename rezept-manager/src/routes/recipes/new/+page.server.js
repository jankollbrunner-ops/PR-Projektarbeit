import { fail, redirect } from '@sveltejs/kit';
import { getRecipesCollection } from '#lib/server/mongodb.js';
import { readRecipeForm } from '#lib/server/recipe-form.js';
import { resolveTikTokVideoId } from '#lib/server/tiktok.js';

export const actions = {
	create: async ({ request }) => {
		const { data, errors, values } = readRecipeForm(await request.formData());
		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		const collection = await getRecipesCollection();
		const now = new Date();
		const videoId = await resolveTikTokVideoId(data.tiktokUrl);
		const result = await collection.insertOne({ ...data, videoId, createdAt: now, updatedAt: now });
		redirect(303, `/recipes/${result.insertedId}`);
	}
};
