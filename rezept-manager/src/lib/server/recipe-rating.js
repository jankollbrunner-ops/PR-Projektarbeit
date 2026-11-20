export function getRecipeRatingSummary(recipe) {
	const ratings = Array.isArray(recipe.ratings)
		? recipe.ratings.filter((rating) => Number.isInteger(rating) && rating >= 1 && rating <= 5)
		: Number.isInteger(recipe.rating) && recipe.rating >= 1 && recipe.rating <= 5
			? [recipe.rating]
			: [];
	const rating = ratings.length
		? ratings.reduce((sum, current) => sum + current, 0) / ratings.length
		: 0;

	return { ratings, rating, ratingCount: ratings.length };
}

export function appendRecipeRating(rating, updatedAt) {
	const storedRating = { $ifNull: ['$rating', 0] };
	const existingRatings = {
		$cond: [
			{ $isArray: '$ratings' },
			'$ratings',
			{ $cond: [{ $gt: [storedRating, 0] }, [storedRating], []] }
		]
	};

	return [
		{ $set: { ratings: { $concatArrays: [existingRatings, [rating]] } } },
		{ $set: { rating: { $avg: '$ratings' }, updatedAt } }
	];
}
