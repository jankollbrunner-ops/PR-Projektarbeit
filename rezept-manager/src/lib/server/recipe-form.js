const allowedCategories = new Set([
	'Asia',
	'Italian',
	'Mexican',
	'Frühstück',
	'Vegetarisch',
	'Dessert',
	'Andere'
]);

function splitLines(value) {
	return value
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
}

export function readRecipeForm(formData, { includeRating = true } = {}) {
	const name = String(formData.get('name') ?? '').trim();
	const category = String(formData.get('category') ?? '').trim();
	const ingredientsInput = String(formData.get('ingredients') ?? '');
	const instructionsInput = String(formData.get('instructions') ?? '');
	const ingredients = splitLines(ingredientsInput);
	const instructions = splitLines(instructionsInput);
	const tiktokUrl = String(formData.get('tiktokUrl') ?? '').trim();
	const minutesValue = String(formData.get('minutes') ?? '').trim();
	const servingsValue = String(formData.get('servings') ?? '').trim();
	const ratingValue =
		includeRating && formData.has('rating') ? String(formData.get('rating') ?? '').trim() : null;
	const errors = {};

	if (!name) errors.name = 'Bitte gib einen Rezeptnamen ein.';
	if (name.length > 120) errors.name = 'Der Rezeptname darf höchstens 120 Zeichen lang sein.';
	if (!allowedCategories.has(category)) errors.category = 'Bitte wähle eine Kategorie.';
	if (ingredients.length === 0) errors.ingredients = 'Füge mindestens eine Zutat hinzu.';

	try {
		const url = new URL(tiktokUrl);
		const isTikTokHost = url.hostname === 'tiktok.com' || url.hostname.endsWith('.tiktok.com');
		const isVideoLink =
			/\/video\/\d+/.test(url.pathname) ||
			/\/t\/[^/]+/.test(url.pathname) ||
			(['vm.tiktok.com', 'vt.tiktok.com'].includes(url.hostname) && url.pathname.length > 1);
		if (
			url.protocol !== 'https:' ||
			!isTikTokHost ||
			!isVideoLink
		) {
			errors.tiktokUrl = 'Bitte gib einen gültigen HTTPS-Link zu einem TikTok-Video ein.';
		}
		if (tiktokUrl.length > 2048) {
			errors.tiktokUrl = 'Der TikTok-Link ist zu lang.';
		}
	} catch {
		errors.tiktokUrl = 'Bitte gib einen gültigen HTTPS-Link zu einem TikTok-Video ein.';
	}

	let minutes = null;
	if (minutesValue) {
		minutes = Number(minutesValue);
		if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) {
			errors.minutes = 'Die Zubereitungszeit muss zwischen 1 und 600 Minuten liegen.';
		}
	}

	let servings = null;
	if (servingsValue) {
		servings = Number(servingsValue);
		if (!Number.isInteger(servings) || servings < 1 || servings > 100) {
			errors.servings = 'Die Portionenzahl muss zwischen 1 und 100 liegen.';
		}
	}

	let rating;
	if (ratingValue !== null) {
		rating = Number(ratingValue);
		if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
			errors.rating = 'Die Bewertung muss zwischen 0 und 5 Sternen liegen.';
		}
	}

	return {
		data: {
			name,
			category,
			ingredients,
			instructions,
			tiktokUrl,
			minutes,
			servings,
			...(ratingValue !== null ? { rating } : {})
		},
		values: {
			name,
			category,
			ingredients: ingredientsInput,
			instructions: instructionsInput,
			tiktokUrl,
			minutes: minutesValue,
			servings: servingsValue,
			...(ratingValue !== null ? { rating: ratingValue } : {})
		},
		errors
	};
}
