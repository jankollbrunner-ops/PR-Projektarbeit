<script>
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Meine gespeicherten Rezepte – TokRecipe</title>
</svelte:head>

<main class="saved-page">
	<header class="saved-heading">
		<div>
			<p class="eyebrow">Persönliche Sammlung</p>
			<h1>Meine gespeicherten Rezepte</h1>
			<p>Gespeichert als <strong>{data.user.username}</strong></p>
		</div>
	</header>

	{#if form?.cookedSuccess}<p class="status-success" role="status">{form.cookedSuccess}</p>{/if}
	{#if form?.cookedError}<p class="status-error" role="alert">{form.cookedError}</p>{/if}

	<section class="saved-section" aria-labelledby="saved-open-title">
		<div class="section-heading">
			<p class="section-kicker">Noch ausprobieren</p>
			<h2 id="saved-open-title">Gespeicherte Rezepte</h2>
		</div>
		{#if data.notCooked.length === 0}
			<div class="empty-state">
				<span aria-hidden="true">♡</span>
				<h3>Noch keine offenen Rezepte</h3>
				<p>Speichere auf einer Detailseite ein Rezept für deine persönliche Liste.</p>
				<a href="/">Rezepte entdecken</a>
			</div>
		{:else}
			<div class="saved-grid">
				{#each data.notCooked as recipe (recipe._id)}
					<article class="saved-card">
						<a class="saved-cover" href="/recipes/{recipe._id}">
							{#if recipe.videoId}
								<iframe
									src={`https://www.tiktok.com/player/v1/${recipe.videoId}?controls=1&description=0&music_info=0&autoplay=0`}
									title={`TikTok-Vorschau: ${recipe.name}`}
									loading="lazy"
									allowfullscreen
								></iframe>
							{:else}
								<span aria-hidden="true">🍴</span>
							{/if}
						</a>
						<div class="saved-card-body">
							<p class="card-category">{recipe.category}</p>
							<h3><a href="/recipes/{recipe._id}">{recipe.name}</a></h3>
							<p class="card-rating">{recipe.ratingCount ? `${recipe.rating.toFixed(1)} / 5` : 'Noch nicht bewertet'}</p>
							<div class="card-actions">
								<form method="POST" action="?/toggleCooked">
									<input type="hidden" name="recipeId" value={recipe._id} />
									<input type="hidden" name="isCooked" value="false" />
									<button type="submit">Bereits gekocht</button>
								</form>
								<form method="POST" action="?/remove">
									<input type="hidden" name="recipeId" value={recipe._id} />
									<button class="remove-button" type="submit">Entfernen</button>
								</form>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</section>

	<section class="saved-section" aria-labelledby="saved-cooked-title">
		<div class="section-heading">
			<p class="section-kicker">Bereits ausprobiert</p>
			<h2 id="saved-cooked-title">Schon gekocht</h2>
		</div>
		{#if data.cooked.length === 0}
			<div class="empty-state small">
				<p>Rezepte, die du als gekocht markierst, erscheinen hier.</p>
			</div>
		{:else}
			<div class="saved-grid">
				{#each data.cooked as recipe (recipe._id)}
					<article class="saved-card cooked">
						<a class="saved-cover" href="/recipes/{recipe._id}">
							{#if recipe.videoId}
								<iframe
									src={`https://www.tiktok.com/player/v1/${recipe.videoId}?controls=1&description=0&music_info=0&autoplay=0`}
									title={`TikTok-Vorschau: ${recipe.name}`}
									loading="lazy"
									allowfullscreen
								></iframe>
							{:else}
								<span aria-hidden="true">🍴</span>
							{/if}
						</a>
						<div class="saved-card-body">
							<p class="card-category">{recipe.category}</p>
							<h3><a href="/recipes/{recipe._id}">{recipe.name}</a></h3>
							<p class="card-rating">{recipe.ratingCount ? `${recipe.rating.toFixed(1)} / 5` : 'Noch nicht bewertet'}</p>
							<div class="card-actions">
								<form method="POST" action="?/toggleCooked">
									<input type="hidden" name="recipeId" value={recipe._id} />
									<input type="hidden" name="isCooked" value="true" />
									<button type="submit">Zurück zu offen</button>
								</form>
								<form method="POST" action="?/remove">
									<input type="hidden" name="recipeId" value={recipe._id} />
									<button class="remove-button" type="submit">Entfernen</button>
								</form>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</section>
</main>

<style>
	:global(body) {
		background: #fffefa;
		color: #252621;
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		margin: 0;
	}

	:global(*) { box-sizing: border-box; }

	.saved-page {
		margin: 0 auto;
		max-width: 1180px;
		padding: 42px 24px 80px;
	}

	.saved-heading {
		background: #eef3e4;
		border-radius: 24px;
		padding: 34px 38px;
	}

	.eyebrow,
	.section-kicker,
	.card-category {
		color: #74835f;
		font-size: 0.76rem;
		font-weight: 750;
		letter-spacing: 0.08em;
		margin: 0 0 7px;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(2.3rem, 6vw, 4rem);
		letter-spacing: -0.07em;
		margin: 0;
	}

	.saved-heading p:last-child {
		color: #707268;
		margin: 10px 0 0;
	}

	.saved-section {
		margin-top: 42px;
	}

	.section-heading {
		margin-bottom: 18px;
	}

	.section-heading h2 {
		font-size: 1.75rem;
		letter-spacing: -0.05em;
		margin: 0;
	}

	.saved-grid {
		display: grid;
		gap: 18px;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.saved-card {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 18px;
		overflow: hidden;
	}

	.saved-card.cooked {
		opacity: 0.82;
	}

	.saved-cover {
		align-items: center;
		background: linear-gradient(135deg, #f2c87b, #dd8652);
		display: flex;
		height: 175px;
		justify-content: center;
		overflow: hidden;
	}

	.saved-cover iframe {
		background: #171717;
		border: 0;
		height: 100%;
		width: 100%;
	}

	.saved-cover > span {
		font-size: 4.5rem;
	}

	.saved-card-body {
		padding: 16px;
	}

	.saved-card h3 {
		font-size: 1.05rem;
		margin: 0 0 8px;
	}

	.card-rating {
		color: #77796f;
		font-size: 0.82rem;
		margin: 0 0 14px;
	}

	.card-actions {
		display: flex;
		gap: 8px;
		justify-content: space-between;
	}

	.card-actions form {
		margin: 0;
	}

	.card-actions button {
		background: #edf4e5;
		border: 0;
		border-radius: 9px;
		color: #4f693a;
		cursor: pointer;
		font: inherit;
		font-size: 0.78rem;
		font-weight: 700;
		padding: 9px 10px;
	}

	.card-actions .remove-button {
		background: transparent;
		color: #a93c31;
	}

	.empty-state {
		align-items: center;
		background: #f8f7f1;
		border: 1px dashed #deddd3;
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		padding: 38px 20px;
		text-align: center;
	}

	.empty-state > span {
		color: #ef604f;
		font-size: 2rem;
	}

	.empty-state h3 {
		margin: 12px 0 6px;
	}

	.empty-state p {
		color: #77796f;
		margin: 0 0 12px;
	}

	.empty-state a {
		color: #d94d3e;
		font-weight: 700;
	}

	.empty-state.small {
		padding: 22px;
	}

	.status-success,
	.status-error {
		border-radius: 10px;
		margin: 18px 0 0;
		padding: 11px 13px;
	}

	.status-success {
		background: #edf4e5;
		color: #4f693a;
	}

	.status-error {
		background: #fff1ee;
		color: #a93c31;
	}

	@media (max-width: 820px) {
		.saved-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.saved-page {
			padding: 24px 18px 55px;
		}

		.saved-heading {
			padding: 28px 22px;
		}

		.saved-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
