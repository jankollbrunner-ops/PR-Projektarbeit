import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGODB_URI: {
		schema: (value) => value?.trim() || undefined,
		description: 'Private MongoDB Atlas connection string.'
	},
	MONGODB_DB: {
		schema: (value) => value?.trim() || 'tokrecipe',
		description: 'MongoDB database name.'
	},
	ADMIN_DELETE_PASSWORD: {
		schema: (value) => value || undefined,
		description: 'Private password required to delete a recipe.'
	}
});
