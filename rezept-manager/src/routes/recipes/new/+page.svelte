<script>
	let { form } = $props();
</script>

<svelte:head>
	<title>Rezept hinzufügen – TokRecipe</title>
</svelte:head>

<main class="form-page">
	<a class="back-link" href="/">← Zurück zur Sammlung</a>
	<div class="form-heading">
		<p class="eyebrow">Deine Sammlung wächst</p>
		<h1>Rezept hinzufügen</h1>
		<p>Mach aus einem schnellen Video eine Anleitung, die du beim Kochen gut gebrauchen kannst.</p>
	</div>

	<form method="POST" action="?/create" class="recipe-form">
		{#if form?.errors}
			<div class="form-alert" role="alert">Bitte prüfe die markierten Angaben.</div>
		{/if}

		<label>
			<span>Name <strong>*</strong></span>
			<input name="name" required maxlength="120" value={form?.values?.name ?? ''} placeholder="z. B. Spicy Miso Ramen" />
			{#if form?.errors?.name}<small class="field-error">{form.errors.name}</small>{/if}
		</label>

		<div class="field-row three-columns">
			<label>
				<span>Kategorie <strong>*</strong></span>
				<select name="category" required>
					<option value="">Kategorie wählen</option>
					{#each ['Asia', 'Italian', 'Mexican', 'Frühstück', 'Vegetarisch', 'Dessert', 'Andere'] as category}
						<option value={category} selected={form?.values?.category === category}>{category}</option>
					{/each}
				</select>
				{#if form?.errors?.category}<small class="field-error">{form.errors.category}</small>{/if}
			</label>
			<label>
				<span>Zubereitungszeit <small>(Minuten, optional)</small></span>
				<input name="minutes" type="number" min="1" max="600" value={form?.values?.minutes ?? ''} placeholder="25" />
				{#if form?.errors?.minutes}<small class="field-error">{form.errors.minutes}</small>{/if}
			</label>
			<label>
				<span>Portionen <small>(optional)</small></span>
				<input name="servings" type="number" min="1" max="100" value={form?.values?.servings ?? ''} placeholder="2" />
				{#if form?.errors?.servings}<small class="field-error">{form.errors.servings}</small>{/if}
			</label>
		</div>

		<label>
			<span>Zutaten <strong>*</strong></span>
			<textarea name="ingredients" required rows="5" placeholder="Eine Zutat pro Zeile&#10;z. B. 200 g Nudeln">{form?.values?.ingredients ?? ''}</textarea>
			<span class="field-hint">Eine Zutat pro Zeile – Mengenangaben helfen beim Nachkochen.</span>
			{#if form?.errors?.ingredients}<small class="field-error">{form.errors.ingredients}</small>{/if}
		</label>

		<label>
			<span>Rezept / Zubereitung <small>(optional)</small></span>
			<textarea name="instructions" rows="6" placeholder="Ein Schritt pro Zeile; wenn du keine Anleitung hast, lass das Feld leer – das TikTok-Video wird auf der Detailseite als Kochhilfe angezeigt.">{form?.values?.instructions ?? ''}</textarea>
			<span class="field-hint">Das Video bleibt auf der Rezeptseite eingebettet und kann dort beim Kochen genutzt werden.</span>
			{#if form?.errors?.instructions}<small class="field-error">{form.errors.instructions}</small>{/if}
		</label>

		<label>
			<span>TikTok-Link <strong>*</strong></span>
			<input
				name="tiktokUrl"
				type="url"
				required
				value={form?.values?.tiktokUrl ?? ''}
				placeholder="https://www.tiktok.com/@..."
			/>
			{#if form?.errors?.tiktokUrl}<small class="field-error">{form.errors.tiktokUrl}</small>{/if}
		</label>

		<label>
			<span>Erste Bewertung <small>(optional)</small></span>
			<select name="rating">
				<option value="0">Noch nicht bewertet</option>
				{#each [1, 2, 3, 4, 5] as rating}
					<option value={rating} selected={Number(form?.values?.rating ?? 0) === rating}>
						{'★'.repeat(rating)} ({rating}/5)
					</option>
				{/each}
			</select>
			<span class="field-hint">Nach dem Kochen kannst du weitere Bewertungen abgeben; angezeigt wird der Durchschnitt.</span>
			{#if form?.errors?.rating}<small class="field-error">{form.errors.rating}</small>{/if}
		</label>

		<div class="form-actions">
			<a class="cancel-button" href="/">Abbrechen</a>
			<button class="submit-button" type="submit">Rezept speichern <span aria-hidden="true">→</span></button>
		</div>
	</form>
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

	.form-page {
		margin: 0 auto;
		max-width: 760px;
		padding: 38px 24px 80px;
	}

	.back-link {
		color: #66695f;
		font-size: 0.92rem;
		font-weight: 600;
	}

	.form-heading {
		margin: 35px 0 28px;
	}

	.eyebrow {
		color: #d94d3e;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		margin: 0 0 9px;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(2.4rem, 7vw, 3.5rem);
		letter-spacing: -0.07em;
		margin: 0;
	}

	.form-heading > p:last-child {
		color: #707268;
		line-height: 1.65;
		margin: 12px 0 0;
	}

	.recipe-form {
		background: white;
		border: 1px solid #eeece4;
		border-radius: 24px;
		box-shadow: 0 12px 35px #383a300d;
		display: grid;
		gap: 21px;
		padding: 30px;
	}

	label {
		display: grid;
		gap: 8px;
	}

	label > span:first-child {
		font-size: 0.91rem;
		font-weight: 650;
	}

	label strong {
		color: #d94d3e;
	}

	label small:not(.field-error) {
		color: #888a80;
		font-weight: 450;
	}

	input:not([type="checkbox"]),
	select,
	textarea {
		background: #fffefa;
		border: 1px solid #e4e2d9;
		border-radius: 11px;
		color: #252621;
		font: inherit;
		padding: 12px 13px;
		width: 100%;
	}

	textarea {
		line-height: 1.55;
		resize: vertical;
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: #ef604f;
		box-shadow: 0 0 0 3px #ef604f20;
		outline: none;
	}

	.field-row {
		align-items: end;
		display: grid;
		gap: 17px;
		grid-template-columns: 1fr 1fr;
	}

	.field-row.three-columns {
		grid-template-columns: 1.2fr 1fr 1fr;
	}

	.field-hint {
		color: #85877c;
		font-size: 0.81rem;
		line-height: 1.5;
	}

	.field-error {
		color: #c33f33;
		font-size: 0.82rem;
	}

	.form-alert {
		background: #fff1ee;
		border-radius: 10px;
		color: #a93c31;
		font-size: 0.9rem;
		padding: 12px 14px;
	}

	.form-actions {
		border-top: 1px solid #eeece4;
		display: flex;
		gap: 12px;
		justify-content: flex-end;
		margin-top: 2px;
		padding-top: 20px;
	}

	.cancel-button,
	.submit-button {
		border: 0;
		border-radius: 11px;
		cursor: pointer;
		font: inherit;
		font-size: 0.92rem;
		font-weight: 650;
		padding: 12px 16px;
	}

	.cancel-button {
		background: #f3f2ec;
		color: #55574e;
	}

	.submit-button {
		background: #ef604f;
		color: white;
	}

	.submit-button:hover {
		background: #d94d3e;
	}

	@media (max-width: 560px) {
		.form-page {
			padding: 25px 18px 55px;
		}

		.recipe-form {
			padding: 21px 17px;
		}

		.field-row,
		.field-row.three-columns {
			grid-template-columns: 1fr;
		}

	}
</style>
