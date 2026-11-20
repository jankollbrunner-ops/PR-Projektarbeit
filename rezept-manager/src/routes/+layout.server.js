import { getSessionUser } from '#lib/server/auth.js';

export async function load({ cookies }) {
	return { user: await getSessionUser(cookies) };
}
