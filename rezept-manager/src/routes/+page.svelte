<script>
	let { data } = $props();

	const categoryIcons = {
		Asia: '🥢',
		Italian: '🍝',
		Mexican: '🌮',
		Frühstück: '🍳',
		Vegetarisch: '🥑',
		Dessert: '🍰',
		Andere: '🍴'
	};

	function iconFor(category) {
		return categoryIcons[category] ?? '🍴';
	}
</script>

<svelte:head>
	<title>TokRecipe – deine Rezeptsammlung</title>
	<meta
		name="description"
		content="Speichere TikTok-Rezepte und finde schnell heraus, was du heute kochen möchtest."
	/>
</svelte:head>

<div class="page-shell">
	<main>
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow"><span aria-hidden="true"></span> Deine persönliche Rezeptsammlung</p>
				<h1 id="hero-title">Was kochen wir <span>heute?</span></h1>
				<p class="hero-description">
					Keine Idee? Lass dich von einem deiner gespeicherten TikTok-Rezepte überraschen.
				</p>
				{#if data.randomRecipe}
					<a class="random-button" href="/recipes/{data.randomRecipe._id}">
						<span aria-hidden="true">✦</span> Random Rezept
					</a>
				{:else}
					<a class="random-button" href="/recipes/new">
						<span aria-hidden="true">+</span> Erstes Rezept speichern
					</a>
				{/if}
			</div>

			<div class="hero-art" aria-hidden="true">
				<div class="hero-art-card hero-art-main">
					<span class="art-label">Dein nächstes Lieblingsgericht</span>
					<span class="art-food">🍜</span>
				</div>
				<div class="hero-art-card hero-art-small">
					<span class="art-food">🍝</span>
					<span class="art-sticker">Yum!</span>
				</div>
				<span class="sparkle sparkle-one">✳</span>
				<span class="sparkle sparkle-two">✦</span>
			</div>
		</section>

		{#if data.databaseError}
			<p class="database-warning" role="status">{data.databaseError}</p>
		{/if}

		<section class="discover" id="recipe-search" aria-labelledby="discover-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Deine Sammlung</p>
					<h2 id="discover-title">{data.query ? 'Suchergebnisse' : 'Entdecken'}</h2>
				</div>
			</div>

			{#if data.recipes.length === 0}
				<div class="empty-state">
					<span class="empty-icon" aria-hidden="true">{data.query ? '⌕' : '🍳'}</span>
					<h3>{data.query ? 'Keine Rezepte gefunden' : 'Hier ist noch Platz für dein erstes Rezept'}</h3>
					<p>
						{data.query
							? 'Versuche einen anderen Suchbegriff oder suche nach einer Zutat.'
							: 'Speichere ein Rezept aus TikTok und mach aus dem schnellen Video eine Anleitung zum Nachkochen.'}
					</p>
					{#if !data.query}
						<a class="text-link" href="/recipes/new">Rezept hinzufügen <span aria-hidden="true">→</span></a>
					{/if}
				</div>
			{:else}
				{#each data.categories as category (category)}
					<section class="category-section" aria-labelledby={`category-${category}`}>
						<div class="category-heading">
							<div>
								<p class="section-kicker">Entdecken</p>
								<h3 id={`category-${category}`}>{category}</h3>
							</div>
							<p>{category === 'Asia' ? 'Würzig, frisch und voller Aromen' : category === 'Italian' ? 'La dolce vita auf deinem Teller' : 'Ideen für deine nächste Mahlzeit'}</p>
						</div>
						<div class="recipe-grid">
							{#each data.recipes.filter((recipe) => recipe.category === category) as recipe (recipe._id)}
								<article class="recipe-card">
									<div class="recipe-art-card recipe-cover">
										{#if recipe.videoId}
											<iframe
												class="tiktok-preview"
												src={`https://www.tiktok.com/player/v1/${recipe.videoId}?controls=1&description=0&music_info=0&autoplay=0`}
												title={`TikTok-Vorschau: ${recipe.name}`}
												loading="lazy"
												allow="encrypted-media; fullscreen; picture-in-picture; web-share"
												referrerpolicy="strict-origin-when-cross-origin"
												allowfullscreen
											></iframe>
										{:else}
											<div class="preview-fallback" title="TikTok-Vorschau nicht verfügbar">
												<span class="dish-icon" aria-hidden="true">{iconFor(recipe.category)}</span>
												<span>Video-Vorschau nicht verfügbar</span>
											</div>
										{/if}
										{#if recipe.minutes}
											<span class="time-pill">{recipe.minutes} Min.</span>
										{/if}
									</div>
									<div class="recipe-card-body">
										<h4><a href="/recipes/{recipe._id}">{recipe.name}</a></h4>
										<div class="card-meta">
											<span
												class="rating"
												aria-label={recipe.rating ? `${recipe.rating} von 5 Sternen` : 'Noch nicht bewertet'}
											>
												{#each [1, 2, 3, 4, 5] as star}
													<span class:filled={star <= recipe.rating} aria-hidden="true">★</span>
												{/each}
											</span>
										</div>
										<a class="details-link" href="/recipes/{recipe._id}">Rezept ansehen <span aria-hidden="true">→</span></a>
									</div>
								</article>
							{/each}
						</div>
					</section>
				{/each}
			{/if}
		</section>
	</main>

	<footer class="site-footer">
		<a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true">♪</span> TokRecipe</a>
		<p>Cook it. Save it. Love it.</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		background: #fffefa;
		color: #252621;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.page-shell {
		margin: 0 auto;
		max-width: 1440px;
		padding: 0 5.2%;
	}

	.random-button:hover {
		background: #d94d3e;
		transform: translateY(-2px);
	}

	main {
		padding: 42px 0 84px;
	}

	.hero {
		align-items: center;
		background: #eef3e4;
		border-radius: 34px;
		display: grid;
		gap: 30px;
		grid-template-columns: 1.1fr 0.9fr;
		min-height: 390px;
		overflow: hidden;
		padding: 54px 6.4%;
		position: relative;
	}

	.hero-copy {
		max-width: 580px;
		position: relative;
		z-index: 1;
	}

	.eyebrow {
		align-items: center;
		background: #fffefa;
		border: 1px solid #dfe5d5;
		border-radius: 999px;
		color: #687655;
		display: inline-flex;
		font-size: 0.88rem;
		font-weight: 650;
		gap: 9px;
		margin: 0 0 27px;
		padding: 11px 17px;
	}

	.eyebrow span {
		background: #83a45d;
		border-radius: 50%;
		height: 9px;
		width: 9px;
	}

	h1 {
		font-size: clamp(3rem, 6vw, 5.6rem);
		letter-spacing: -0.075em;
		line-height: 0.99;
		margin: 0;
		max-width: 650px;
	}

	h1 span {
		color: #ef604f;
		display: block;
	}

	.hero-description {
		color: #696c64;
		font-size: 1.12rem;
		line-height: 1.7;
		margin: 22px 0 26px;
		max-width: 470px;
	}

	.random-button {
		align-items: center;
		background: #252621;
		border-radius: 14px;
		color: #fffefa;
		display: inline-flex;
		font-size: 0.97rem;
		font-weight: 650;
		gap: 11px;
		padding: 15px 20px;
		transition:
			background 150ms ease,
			transform 150ms ease;
	}

	.random-button:hover {
		background: #3a3b33;
	}

	.hero-art {
		align-items: center;
		display: flex;
		height: 300px;
		justify-content: center;
		position: relative;
	}

	.hero-art-card {
		align-items: center;
		border: 9px solid #fffefa;
		border-radius: 28px;
		box-shadow: 0 18px 40px #424b3230;
		display: flex;
		justify-content: center;
		position: absolute;
	}

	.hero-art-main {
		background: linear-gradient(145deg, #f8c56d, #e77e46 60%, #9a5636);
		height: 245px;
		transform: rotate(5deg);
		width: 265px;
	}

	.art-label {
		background: #fffefaee;
		border-radius: 999px;
		color: #383a30;
		font-size: 0.75rem;
		font-weight: 650;
		left: 13px;
		padding: 9px 12px;
		position: absolute;
		top: 13px;
	}

	.art-food {
		filter: drop-shadow(0 10px 12px #36231535);
		font-size: 7rem;
	}

	.hero-art-small {
		background: linear-gradient(145deg, #c8d6a5, #76905d);
		bottom: 2px;
		height: 125px;
		right: -3px;
		transform: rotate(-8deg);
		width: 145px;
	}

	.hero-art-small .art-food {
		font-size: 4.3rem;
	}

	.art-sticker {
		background: #ef604f;
		border: 3px solid #fffefa;
		border-radius: 50%;
		color: white;
		font-size: 0.72rem;
		font-weight: 700;
		padding: 14px 10px;
		position: absolute;
		right: -23px;
		top: -20px;
		transform: rotate(10deg);
	}

	.sparkle {
		color: #ef604f;
		position: absolute;
	}

	.sparkle-one {
		font-size: 2rem;
		right: 11%;
		top: 10px;
	}

	.sparkle-two {
		bottom: 22px;
		font-size: 1.5rem;
		left: 2%;
	}

	.discover {
		padding-top: 68px;
		scroll-margin-top: 28px;
	}

	.section-heading,
	.category-heading {
		align-items: end;
		display: flex;
		justify-content: space-between;
	}

	.section-kicker {
		color: #8a8c81;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		margin: 0 0 5px;
		text-transform: uppercase;
	}

	.section-heading h2,
	.category-heading h3 {
		font-size: 2rem;
		letter-spacing: -0.055em;
		margin: 0;
	}

	.category-section {
		padding-top: 38px;
	}

	.category-heading {
		margin-bottom: 19px;
	}

	.category-heading h3 {
		font-size: 1.7rem;
	}

	.category-heading > p {
		color: #77796f;
		margin: 0 0 4px;
	}

	.recipe-grid {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.recipe-card {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 22px;
		box-shadow: 0 8px 24px #383a3010;
		min-width: 0;
		overflow: hidden;
		transition:
			box-shadow 180ms ease,
			transform 180ms ease;
	}

	.recipe-card:hover {
		box-shadow: 0 16px 34px #383a301d;
		transform: translateY(-4px);
	}

	.recipe-cover {
		align-items: center;
		background: linear-gradient(135deg, #f2c87b, #dd8652 55%, #a96545);
		border: 0;
		border-radius: 0;
		box-shadow: none;
		display: flex;
		height: 175px;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.tiktok-preview {
		background: #171717;
		border: 0;
		height: 100%;
		width: 100%;
	}

	.preview-fallback {
		align-items: center;
		color: #fffefa;
		display: flex;
		flex-direction: column;
		font-size: 0.8rem;
		gap: 6px;
		text-align: center;
	}

	.recipe-card:nth-child(3n + 2) .recipe-cover {
		background: linear-gradient(135deg, #d6dfb4, #91a873 58%, #657c55);
	}

	.recipe-card:nth-child(3n) .recipe-cover {
		background: linear-gradient(135deg, #f0c7a6, #dd8c75 58%, #a75e57);
	}

	.dish-icon {
		filter: drop-shadow(0 8px 10px #36231530);
		font-size: 5.2rem;
		transition: transform 180ms ease;
	}

	.recipe-card:hover .dish-icon {
		transform: scale(1.08) rotate(-5deg);
	}

	.time-pill {
		background: #fffefaed;
		border-radius: 999px;
		font-size: 0.77rem;
		font-weight: 650;
		left: 12px;
		padding: 7px 11px;
		position: absolute;
		top: 12px;
	}

	.recipe-card-body {
		padding: 17px 17px 15px;
	}

	.recipe-card h4 {
		font-size: 1.07rem;
		letter-spacing: -0.025em;
		margin: 0 0 13px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.recipe-card h4 a:hover,
	.details-link:hover {
		color: #d94d3e;
	}

	.details-link {
		color: #55574e;
		display: inline-flex;
		font-size: 0.82rem;
		font-weight: 650;
		gap: 6px;
		margin-top: 13px;
	}

	.card-meta {
		align-items: center;
		display: flex;
		justify-content: flex-start;
	}

	.rating {
		color: #d8d7ce;
		display: inline-flex;
		font-size: 1.05rem;
		gap: 1px;
		white-space: nowrap;
	}

	.rating .filled {
		color: #efa03c;
	}

	.empty-state {
		align-items: center;
		background: #f8f7f1;
		border: 1px dashed #deddd3;
		border-radius: 24px;
		display: flex;
		flex-direction: column;
		margin-top: 22px;
		padding: 48px 20px;
		text-align: center;
	}

	.database-warning {
		background: #fff3e1;
		border: 1px solid #f1d8ae;
		border-radius: 12px;
		color: #765322;
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 24px 0 -35px;
		padding: 13px 16px;
	}

	.empty-icon {
		align-items: center;
		background: #fffefa;
		border-radius: 50%;
		color: #ef604f;
		display: inline-flex;
		font-size: 1.8rem;
		height: 64px;
		justify-content: center;
		width: 64px;
	}

	.empty-state h3 {
		font-size: 1.24rem;
		margin: 18px 0 7px;
	}

	.empty-state p {
		color: #77796f;
		line-height: 1.6;
		margin: 0;
		max-width: 500px;
	}

	.text-link {
		color: #d94d3e;
		font-weight: 650;
		margin-top: 20px;
	}

	.site-footer {
		align-items: center;
		border-top: 1px solid #e9e7df;
		color: #818278;
		display: flex;
		justify-content: space-between;
		padding: 24px 0 30px;
	}

	.footer-brand {
		color: #252621;
		font-size: 1.05rem;
		gap: 8px;
	}

	.footer-brand .brand-mark {
		border-radius: 9px;
		font-size: 1rem;
		height: 30px;
		width: 30px;
	}

	.site-footer p {
		font-size: 0.88rem;
		margin: 0;
	}

	@media (max-width: 900px) {
		.page-shell {
			padding: 0 4%;
		}

		.hero {
			grid-template-columns: 1.1fr 0.8fr;
			padding: 42px 5%;
		}

		.recipe-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 620px) {
		.page-shell {
			padding: 0 18px;
		}

		main {
			padding-top: 22px;
		}

		.hero {
			border-radius: 25px;
			grid-template-columns: 1fr;
			padding: 31px 25px 20px;
		}

		.eyebrow {
			font-size: 0.76rem;
			margin-bottom: 21px;
			padding: 9px 12px;
		}

		h1 {
			font-size: clamp(2.6rem, 8vw, 3.25rem);
		}

		.hero-description {
			font-size: 1rem;
			margin: 17px 0 20px;
		}

		.hero-art {
			height: 205px;
			margin-top: -1px;
		}

		.hero-art-main {
			height: 172px;
			width: 205px;
		}

		.hero-art-main .art-food {
			font-size: 5rem;
		}

		.hero-art-small {
			height: 90px;
			right: 3px;
			width: 105px;
		}

		.hero-art-small .art-food {
			font-size: 3rem;
		}

		.discover {
			padding-top: 43px;
		}

		.section-heading,
		.category-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 15px;
		}

		.section-heading h2 {
			font-size: 1.8rem;
		}

		.category-section {
			padding-top: 31px;
		}

		.category-heading h3 {
			font-size: 1.55rem;
		}

		.category-heading > p {
			font-size: 0.9rem;
		}

		.recipe-grid {
			gap: 12px;
		}

		.recipe-cover {
			height: 140px;
		}

		.dish-icon {
			font-size: 4rem;
		}

		.recipe-card-body {
			padding: 13px 12px;
		}

		.recipe-card h4 {
			font-size: 0.94rem;
		}

		.rating {
			font-size: 0.88rem;
		}

	}
</style>
