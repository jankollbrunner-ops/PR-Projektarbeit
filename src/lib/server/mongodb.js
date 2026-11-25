import { MONGODB_DB, MONGODB_URI } from '$app/env/private';
import { error } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const cache = globalThis;

export async function getDatabase() {
	const uri = MONGODB_URI;
	if (!uri) {
		error(
			503,
			'MongoDB ist noch nicht konfiguriert. Lege eine lokale .env-Datei mit MONGODB_URI und MONGODB_DB an.'
		);
	}

	const dbName = MONGODB_DB;
	if (!cache.__tokrecipeMongoClientPromise || cache.__tokrecipeMongoUri !== uri) {
		const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
		cache.__tokrecipeMongoUri = uri;
		cache.__tokrecipeMongoClientPromise = client.connect().catch((cause) => {
			console.error('MongoDB-Verbindung fehlgeschlagen:', cause);
			cache.__tokrecipeMongoClientPromise = undefined;
			cache.__tokrecipeMongoUri = undefined;
			error(
				503,
				'MongoDB ist nicht erreichbar. Prüfe deine Atlas-URI, die Netzwerkfreigabe und den Datenbankbenutzer.'
			);
		});
	}

	const client = await cache.__tokrecipeMongoClientPromise;
	return client.db(dbName);
}

export async function getRecipesCollection() {
	const database = await getDatabase();
	return database.collection('recipes');
}
