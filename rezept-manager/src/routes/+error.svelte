<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>TokRecipe – Hinweis</title>
</svelte:head>

<main class="error-page">
	<a class="brand" href="/"><span aria-hidden="true">♪</span> TokRecipe</a>
	<div class="error-card">
		<p class="eyebrow">Da ist etwas schiefgelaufen</p>
		<h1>{page.status === 404 ? 'Rezept nicht gefunden' : 'TokRecipe ist gerade nicht bereit'}</h1>
		<p>{page.error?.message ?? 'Bitte versuche es noch einmal.'}</p>
		{#if page.status === 503}
			<div class="help">
				<strong>MongoDB-Verbindung prüfen</strong>
				<p>Lege im Projekt eine lokale <code>.env</code>-Datei an und trage dort deine Atlas-Verbindungsdaten ein. Teile diese Daten niemals öffentlich.</p>
			</div>
		{/if}
		<a class="home-button" href="/">Zur Startseite</a>
	</div>
</main>

<style>
	:global(body) {
		background: #fffefa;
		color: #252621;
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		margin: 0;
	}

	.error-page {
		margin: 0 auto;
		max-width: 760px;
		padding: 35px 22px;
	}

	.brand {
		align-items: center;
		display: inline-flex;
		font-size: 1.4rem;
		font-weight: 750;
		gap: 10px;
		letter-spacing: -0.06em;
		text-decoration: none;
	}

	.brand span {
		align-items: center;
		background: #ef604f;
		border-radius: 12px;
		color: white;
		display: inline-flex;
		font-size: 1.3rem;
		height: 42px;
		justify-content: center;
		width: 42px;
	}

	.error-card {
		background: #f8f7f1;
		border-radius: 24px;
		margin-top: 85px;
		padding: 38px;
	}

	.eyebrow {
		color: #d94d3e;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(2rem, 6vw, 3.2rem);
		letter-spacing: -0.06em;
		margin: 10px 0;
	}

	.error-card > p:not(.eyebrow) {
		color: #696c64;
		line-height: 1.6;
	}

	.help {
		background: white;
		border: 1px solid #e8e6de;
		border-radius: 14px;
		margin: 24px 0;
		padding: 17px;
	}

	.help p {
		color: #696c64;
		font-size: 0.9rem;
		line-height: 1.6;
		margin: 8px 0 0;
	}

	code {
		background: #f3f2ec;
		border-radius: 4px;
		padding: 2px 4px;
	}

	.home-button {
		background: #ef604f;
		border-radius: 10px;
		color: white;
		display: inline-block;
		font-weight: 650;
		margin-top: 10px;
		padding: 12px 16px;
		text-decoration: none;
	}
</style>
