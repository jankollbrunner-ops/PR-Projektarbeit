export function parseTikTokVideoId(tiktokUrl) {
	try {
		const url = new URL(tiktokUrl);
		return url.pathname.match(/\/video\/(\d+)(?:\/|$)/)?.[1] ?? null;
	} catch {
		return null;
	}
}

export async function resolveTikTokVideoId(tiktokUrl) {
	const directId = parseTikTokVideoId(tiktokUrl);
	if (directId) return directId;

	const endpoint = new URL('https://www.tiktok.com/oembed');
	endpoint.searchParams.set('url', tiktokUrl);

	try {
		const response = await fetch(endpoint, { signal: AbortSignal.timeout(5000) });
		if (!response.ok) {
			console.warn(`TikTok oEmbed konnte den Link nicht auflösen (HTTP ${response.status}).`);
			return null;
		}

		const metadata = await response.json();
		if (metadata.provider_name !== 'TikTok' || metadata.embed_type !== 'video') {
			console.warn('TikTok oEmbed hat keine Video-Metadaten zurückgegeben.');
			return null;
		}

		const videoId =
			metadata.embed_product_id ?? metadata.html?.match(/\/player\/v1\/(\d+)/)?.[1];
		return typeof videoId === 'string' && /^\d{10,25}$/.test(videoId) ? videoId : null;
	} catch (cause) {
		console.warn('TikTok oEmbed ist momentan nicht erreichbar:', cause);
		return null;
	}
}
