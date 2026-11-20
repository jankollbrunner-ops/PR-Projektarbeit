import { randomUUID } from 'node:crypto';
import { getDatabase } from '#lib/server/mongodb.js';

export const SESSION_COOKIE = 'tokrecipe_session';

export async function getUsersCollection() {
	const database = await getDatabase();
	const users = database.collection('users');
	await users.createIndex({ usernameKey: 1 }, { unique: true });
	return users;
}

export async function getSessionsCollection() {
	const database = await getDatabase();
	return database.collection('sessions');
}

export async function getSavedRecipesCollection() {
	const database = await getDatabase();
	return database.collection('savedRecipes');
}

export function normalizeUsername(username) {
	return String(username ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
}

export function validateUsername(username) {
	const value = String(username ?? '').trim().replace(/\s+/g, ' ');
	if (!value) return 'Bitte gib einen Benutzernamen ein.';
	if (value.length < 2) return 'Der Benutzername muss mindestens 2 Zeichen lang sein.';
	if (value.length > 30) return 'Der Benutzername darf höchstens 30 Zeichen lang sein.';
	if (!/^[\p{L}\p{N}._-]+(?: [\p{L}\p{N}._-]+)*$/u.test(value)) {
		return 'Verwende Buchstaben, Zahlen, Leerzeichen, Punkte, Unterstriche oder Bindestriche.';
	}
	return null;
}

export async function getUsernameSuggestion(username) {
	const users = await getUsersCollection();
	const base = String(username ?? '').trim().replace(/\s+/g, ' ').slice(0, 25);
	for (let number = 1; number <= 999; number += 1) {
		const suggestion = `${base}${number}`;
		const exists = await users.findOne({ usernameKey: normalizeUsername(suggestion) });
		if (!exists) return suggestion;
	}
	return `${base}-${randomUUID().slice(0, 6)}`;
}

export async function createSession(cookies, userId) {
	const sessions = await getSessionsCollection();
	const token = randomUUID();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
	await sessions.insertOne({ token, userId, createdAt: new Date(), expiresAt });
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: expiresAt
	});
	return token;
}

export async function getSessionUser(cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token) return null;

	const sessions = await getSessionsCollection();
	const session = await sessions.findOne({ token, expiresAt: { $gt: new Date() } });
	if (!session) {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		return null;
	}

	const users = await getUsersCollection();
	const user = await users.findOne({ _id: session.userId });
	if (!user) return null;
	return { _id: user._id.toString(), username: user.username };
}

export async function deleteSession(cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (token) {
		const sessions = await getSessionsCollection();
		await sessions.deleteOne({ token });
		cookies.delete(SESSION_COOKIE, { path: '/' });
	}
}
