<script>
	let { data, form } = $props();

	function confirmDelete(event) {
		if (!window.confirm('Möchtest du dieses Rezept wirklich löschen?')) {
			event.preventDefault();
		}
	}
</script>

<svelte:head>
	<title>{data.recipe.name} – TokRecipe</title>
</svelte:head>

<main class="detail-page">
	<a class="back-link" href="/">← Zurück zur Sammlung</a>

	<article>
		<header class="recipe-header">
			<div>
				<p class="eyebrow">{data.recipe.category}</p>
				<h1>{data.recipe.name}</h1>
				<div class="recipe-meta">
					{#if data.recipe.minutes}<span>{data.recipe.minutes} Minuten</span>{/if}
					{#if data.recipe.servings}<span>{data.recipe.servings} Portionen</span>{/if}
					<span aria-label={data.recipe.rating ? `${data.recipe.rating} von 5 Sternen` : 'Noch nicht bewertet'}>
						{#each [1, 2, 3, 4, 5] as star}
							<span class:filled={star <= data.recipe.rating} aria-hidden="true">★</span>
						{/each}
					</span>
				</div>
			</div>
			<div class="recipe-illustration" aria-hidden="true">🍲</div>
		</header>

		{#if form?.success}<p class="success-message" role="status">{form.success}</p>{/if}
		{#if form?.errors}<p class="error-message" role="alert">Bitte prüfe die markierten Angaben im Bearbeitungsformular.</p>{/if}

		<div class="recipe-content">
			<section class="content-card" aria-labelledby="ingredients-title">
				<p class="section-kicker">Alles bereit?</p>
				<h2 id="ingredients-title">Zutaten</h2>
				<ul class="ingredient-list">
					{#each data.recipe.ingredients as ingredient}
						<li><span aria-hidden="true">✓</span>{ingredient}</li>
					{/each}
				</ul>
			</section>

			<section class="content-card instructions-card" aria-labelledby="instructions-title">
				<p class="section-kicker">Schritt für Schritt</p>
				<h2 id="instructions-title">Zubereitung</h2>
				{#if data.recipe.instructions?.length}
					<ol class="instruction-list">
						{#each data.recipe.instructions as instruction, index}
							<li>
								<span class="step-number">{String(index + 1).padStart(2, '0')}</span>
								<p>{instruction}</p>
							</li>
						{/each}
					</ol>
				{:else}
					<p class="empty-instructions">Für dieses Rezept wurde keine schriftliche Anleitung gespeichert. Nutze das eingebettete Video als Kochhilfe.</p>
				{/if}
			</section>
		</div>

		<section class="video-section" aria-labelledby="video-title">
			<div class="video-heading">
				<div>
					<p class="section-kicker">Direkt nachkochen</p>
					<h2 id="video-title">Das Originalvideo</h2>
				</div>
				<a href={data.recipe.tiktokUrl} target="_blank" rel="noreferrer">Auf TikTok ansehen <span aria-hidden="true">↗</span></a>
			</div>
			{#if data.recipe.videoId}
				<iframe
					class="tiktok-player"
					src={`https://www.tiktok.com/player/v1/${data.recipe.videoId}?controls=1&description=0&music_info=0&autoplay=0`}
					title={`TikTok-Video: ${data.recipe.name}`}
					loading="lazy"
					allow="encrypted-media; fullscreen; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			{:else}
				<p class="video-fallback">Die eingebettete Vorschau ist nicht verfügbar. Du kannst das Video über den TikTok-Link öffnen.</p>
			{/if}
		</section>

		<details class="edit-panel">
			<summary>Rezept bearbeiten</summary>
			<form method="POST" action="?/update" class="recipe-form">
				<label>
					<span>Name <strong>*</strong></span>
					<input name="name" required maxlength="120" value={form?.values?.name ?? data.recipe.name} />
					{#if form?.errors?.name}<small class="field-error">{form.errors.name}</small>{/if}
				</label>

				<div class="field-row three-columns">
					<label>
						<span>Kategorie <strong>*</strong></span>
						<select name="category" required>
							{#each ['Asia', 'Italian', 'Mexican', 'Frühstück', 'Vegetarisch', 'Dessert', 'Andere'] as category}
								<option value={category} selected={(form?.values?.category ?? data.recipe.category) === category}>{category}</option>
							{/each}
						</select>
						{#if form?.errors?.category}<small class="field-error">{form.errors.category}</small>{/if}
					</label>
					<label>
						<span>Zubereitungszeit <small>(Minuten, optional)</small></span>
						<input name="minutes" type="number" min="1" max="600" value={form?.values?.minutes ?? data.recipe.minutes ?? ''} />
						{#if form?.errors?.minutes}<small class="field-error">{form.errors.minutes}</small>{/if}
					</label>
					<label>
						<span>Portionen <small>(optional)</small></span>
						<input name="servings" type="number" min="1" max="100" value={form?.values?.servings ?? data.recipe.servings ?? ''} />
						{#if form?.errors?.servings}<small class="field-error">{form.errors.servings}</small>{/if}
					</label>
				</div>

				<label>
					<span>Zutaten <strong>*</strong></span>
					<textarea name="ingredients" required rows="5">{form?.values?.ingredients ?? data.recipe.ingredients.join('\n')}</textarea>
					{#if form?.errors?.ingredients}<small class="field-error">{form.errors.ingredients}</small>{/if}
				</label>

				<label>
					<span>Rezept / Zubereitung <small>(optional)</small></span>
					<textarea name="instructions" rows="6">{form?.values?.instructions ?? (data.recipe.instructions ?? []).join('\n')}</textarea>
					<span class="field-hint">Ohne schriftliche Anleitung kannst du das TikTok-Video beim Kochen verwenden.</span>
				</label>

				<label>
					<span>TikTok-Link <strong>*</strong></span>
					<input name="tiktokUrl" type="url" required value={form?.values?.tiktokUrl ?? data.recipe.tiktokUrl} />
					{#if form?.errors?.tiktokUrl}<small class="field-error">{form.errors.tiktokUrl}</small>{/if}
				</label>

				<label>
					<span>Deine Bewertung</span>
					<select name="rating">
						<option value="0" selected={Number(form?.values?.rating ?? data.recipe.rating) === 0}>Noch nicht bewertet</option>
						{#each [1, 2, 3, 4, 5] as rating}
							<option value={rating} selected={Number(form?.values?.rating ?? data.recipe.rating) === rating}>{'★'.repeat(rating)} ({rating}/5)</option>
						{/each}
					</select>
					{#if form?.errors?.rating}<small class="field-error">{form.errors.rating}</small>{/if}
				</label>

				<div class="form-actions">
					<button class="submit-button" type="submit">Änderungen speichern</button>
				</div>
			</form>
		</details>

		<form method="POST" action="?/remove" class="delete-form" onsubmit={confirmDelete}>
			<button type="submit">Rezept löschen</button>
		</form>
	</article>
</main>

<style>
	:global(body) {
		background: #fffefa;
		color: #252621;
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		margin: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.detail-page {
		margin: 0 auto;
		max-width: 1000px;
		padding: 38px 24px 80px;
	}

	.back-link {
		color: #66695f;
		font-size: 0.92rem;
		font-weight: 600;
	}

	.recipe-header {
		align-items: center;
		background: #eef3e4;
		border-radius: 27px;
		display: flex;
		justify-content: space-between;
		margin: 28px 0 24px;
		min-height: 235px;
		overflow: hidden;
		padding: 38px 5%;
	}

	.eyebrow,
	.section-kicker {
		color: #74835f;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		margin: 0 0 7px;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		letter-spacing: -0.07em;
		line-height: 1;
		margin: 0;
	}

	.recipe-meta {
		align-items: center;
		color: #696c64;
		display: flex;
		flex-wrap: wrap;
		font-size: 0.88rem;
		gap: 15px;
		margin-top: 20px;
	}

	.recipe-meta > span + span {
		border-left: 1px solid #d5dccb;
		padding-left: 15px;
	}

	.recipe-meta [aria-hidden="true"] {
		color: #d8d7ce;
		font-size: 1.1rem;
	}

	.recipe-meta .filled {
		color: #efa03c;
	}

	.recipe-illustration {
		align-items: center;
		background: linear-gradient(145deg, #f8c56d, #e77e46 60%, #9a5636);
		border: 8px solid white;
		border-radius: 50%;
		box-shadow: 0 14px 30px #424b3228;
		display: flex;
		flex: 0 0 155px;
		font-size: 5rem;
		height: 155px;
		justify-content: center;
		margin-left: 20px;
	}

	.recipe-content {
		display: grid;
		gap: 20px;
		grid-template-columns: 0.8fr 1.2fr;
	}

	.content-card {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 20px;
		padding: 25px;
	}

	h2 {
		font-size: 1.45rem;
		letter-spacing: -0.04em;
		margin: 0;
	}

	.ingredient-list,
	.instruction-list {
		list-style: none;
		margin: 19px 0 0;
		padding: 0;
	}

	.ingredient-list {
		display: grid;
		gap: 12px;
	}

	.ingredient-list li {
		align-items: baseline;
		border-bottom: 1px solid #f0efe9;
		display: flex;
		gap: 10px;
		padding-bottom: 11px;
	}

	.ingredient-list li span {
		color: #84a061;
		font-weight: 750;
	}

	.instruction-list {
		display: grid;
		gap: 16px;
	}

	.instruction-list li {
		align-items: start;
		display: flex;
		gap: 13px;
	}

	.step-number {
		align-items: center;
		background: #f3f5ec;
		border-radius: 50%;
		color: #6f8058;
		display: inline-flex;
		flex: 0 0 35px;
		font-size: 0.73rem;
		font-weight: 750;
		height: 35px;
		justify-content: center;
	}

	.instruction-list p {
		line-height: 1.6;
		margin: 5px 0 0;
	}

	.empty-instructions,
	.video-fallback {
		color: #707268;
		line-height: 1.6;
		margin: 16px 0 0;
	}

	.video-section {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 20px;
		margin-top: 20px;
		padding: 24px;
	}

	.video-heading {
		align-items: end;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.video-heading a {
		background: #f3f2ec;
		border-radius: 10px;
		color: #55574e;
		font-size: 0.84rem;
		font-weight: 650;
		padding: 11px 13px;
		white-space: nowrap;
	}

	.tiktok-player {
		aspect-ratio: 9 / 16;
		background: #171717;
		border: 0;
		border-radius: 14px;
		display: block;
		margin: 0 auto;
		max-height: 680px;
		max-width: 100%;
		width: 382px;
	}

	.edit-panel {
		border-top: 1px solid #e8e6de;
		margin-top: 35px;
		padding-top: 22px;
	}

	.edit-panel summary {
		cursor: pointer;
		font-size: 1.05rem;
		font-weight: 700;
	}

	.recipe-form {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 20px;
		display: grid;
		gap: 19px;
		margin-top: 19px;
		padding: 24px;
	}

	.recipe-form label {
		display: grid;
		gap: 8px;
	}

	.recipe-form label > span:first-child {
		font-size: 0.9rem;
		font-weight: 650;
	}

	.recipe-form strong {
		color: #d94d3e;
	}

	.recipe-form label small:not(.field-error) {
		color: #888a80;
		font-weight: 450;
	}

	.recipe-form input:not([type="checkbox"]),
	.recipe-form select,
	.recipe-form textarea {
		background: #fffefa;
		border: 1px solid #e4e2d9;
		border-radius: 10px;
		color: #252621;
		font: inherit;
		padding: 11px 12px;
		width: 100%;
	}

	.recipe-form textarea {
		line-height: 1.55;
		resize: vertical;
	}

	.recipe-form input:focus,
	.recipe-form select:focus,
	.recipe-form textarea:focus {
		border-color: #ef604f;
		box-shadow: 0 0 0 3px #ef604f20;
		outline: none;
	}

	.field-row {
		align-items: end;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1fr;
	}

	.field-row.three-columns {
		grid-template-columns: 1.2fr 1fr 1fr;
	}

	.field-error {
		color: #c33f33;
		font-size: 0.82rem;
	}

	.recipe-form .field-hint {
		color: #85877c;
		font-size: 0.81rem;
		line-height: 1.5;
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
	}

	.submit-button {
		background: #ef604f;
		border: 0;
		border-radius: 10px;
		color: white;
		cursor: pointer;
		font: inherit;
		font-size: 0.9rem;
		font-weight: 650;
		padding: 11px 15px;
	}

	.delete-form {
		display: flex;
		justify-content: flex-end;
		margin-top: 18px;
	}

	.delete-form button {
		background: transparent;
		border: 0;
		color: #b3473e;
		cursor: pointer;
		font: inherit;
		font-size: 0.88rem;
		padding: 9px;
	}

	.success-message,
	.error-message {
		border-radius: 10px;
		font-size: 0.9rem;
		margin: 0 0 18px;
		padding: 12px 14px;
	}

	.success-message {
		background: #edf4e5;
		color: #4f693a;
	}

	.error-message {
		background: #fff1ee;
		color: #a93c31;
	}

	@media (max-width: 700px) {
		.detail-page {
			padding: 25px 18px 55px;
		}

		.recipe-header {
			min-height: 190px;
			padding: 28px 23px;
		}

		.recipe-illustration {
			flex-basis: 110px;
			font-size: 3.8rem;
			height: 110px;
			width: 110px;
		}

		.recipe-content {
			grid-template-columns: 1fr;
		}

		.video-section {
			padding: 20px;
		}
		.tiktok-player {
			width: min(100%, 340px);
		}
	}

	@media (max-width: 480px) {
		.recipe-header {
			align-items: flex-start;
			flex-direction: column-reverse;
			gap: 20px;
		}

		.recipe-illustration {
			flex-basis: 88px;
			font-size: 3rem;
			height: 88px;
			margin: 0;
			width: 88px;
		}

		.field-row,
		.field-row.three-columns {
			grid-template-columns: 1fr;
		}

		.recipe-form {
			padding: 20px 16px;
		}

		.video-heading {
			align-items: flex-start;
			flex-direction: column;
			gap: 14px;
		}
	}
</style>
