<script>
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children, data, form } = $props();
	let searchQuery = $derived(page.url.searchParams.get('q') ?? '');
	let authModalOpen = $state(false);
	let authMode = $state('login');

	$effect(() => {
		if (form?.authError) {
			authModalOpen = true;
			authMode = form.authMode ?? 'login';
		}
	});

	$effect(() => {
		if (form?.authSuccess) {
			authModalOpen = false;
		}
	});

	$effect(() => {
		if (page.url.searchParams.get('auth') === '1') {
			authModalOpen = true;
			authMode = 'login';
		}
	});

	$effect(() => {
		function handleAuthOpen() {
			openAuth('login');
		}
		window.addEventListener('tokrecipe-auth-open', handleAuthOpen);
		return () => window.removeEventListener('tokrecipe-auth-open', handleAuthOpen);
	});

	function openAuth(mode = 'login') {
		authMode = mode;
		authModalOpen = true;
	}

	function openSavedRecipes(event) {
		if (!data.user) {
			event.preventDefault();
			openAuth('login');
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="site-header">
	<a class="brand" href="/" aria-label="TokRecipe – Startseite">
		<span class="brand-mark" aria-hidden="true">♪</span>
		<span>TokRecipe</span>
	</a>

	<nav aria-label="Hauptnavigation">
		<a
			class:active={page.url.pathname === '/'}
			aria-current={page.url.pathname === '/' ? 'page' : undefined}
			href="/"
		>
			Home
		</a>
		<a
			class:active={page.url.pathname === '/recipes/new'}
			aria-current={page.url.pathname === '/recipes/new' ? 'page' : undefined}
			href="/recipes/new"
		>
			Rezept hinzufügen
		</a>
		<a
			class:active={page.url.pathname === '/saved'}
			aria-current={page.url.pathname === '/saved' ? 'page' : undefined}
			href="/saved"
			onclick={openSavedRecipes}
		>
			Meine gespeicherten Rezepte
		</a>
	</nav>

	<button
		class="account-button"
		type="button"
		aria-label={data.user ? `${data.user.username} – Benutzeraktionen` : 'Anmelden oder registrieren'}
		title={data.user ? data.user.username : 'Anmelden oder registrieren'}
		onclick={() => openAuth('login')}
	>
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<circle cx="12" cy="8" r="3.5"></circle>
			<path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"></path>
		</svg>
	</button>

	<form class="nav-search" method="GET" action="/">
		<label class="sr-only" for="nav-recipe-query">Rezept suchen</label>
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<circle cx="10.8" cy="10.8" r="6.8"></circle>
			<path d="m16 16 4.5 4.5"></path>
		</svg>
		<input
			id="nav-recipe-query"
			name="q"
			type="search"
			placeholder="Rezept suchen"
			value={searchQuery}
		/>
	</form>
</header>

{#if authModalOpen}
	<div
		class="auth-backdrop"
		role="presentation"
		onclick={() => (authModalOpen = false)}
		onkeydown={(event) => {
			if (event.key === 'Escape') authModalOpen = false;
		}}
	>
		<div
			class="auth-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="auth-title"
			tabindex="-1"
			onclick={(event) => event.stopPropagation()}
			onkeydown={(event) => event.stopPropagation()}
		>
			<button class="auth-close" type="button" aria-label="Fenster schließen" onclick={() => (authModalOpen = false)}>×</button>
			<p class="auth-kicker">TokRecipe Benutzerkonto</p>

			{#if data.user}
				<div class="logged-in-panel">
					<h2 id="auth-title">Angemeldet als <strong>{data.user.username}</strong></h2>
					<form method="POST" action="/?/logout">
						<button type="submit">Abmelden</button>
					</form>
				</div>
			{:else}
				<h2 id="auth-title">{authMode === 'register' ? 'Registrieren' : 'Anmelden'}</h2>
				<p class="auth-description">
					{authMode === 'register'
						? 'Wähle einen eindeutigen Benutzernamen.'
						: 'Gib deinen bestehenden Benutzernamen ein.'}
				</p>

				<div class="auth-tabs" aria-label="Anmeldeart">
					<button class:active={authMode === 'login'} type="button" onclick={() => (authMode = 'login')}>Anmelden</button>
					<button class:active={authMode === 'register'} type="button" onclick={() => (authMode = 'register')}>Registrieren</button>
				</div>

				{#if form?.authError}
					<p class="auth-error" role="alert">{form.authError}</p>
				{/if}

				{#if authMode === 'login'}
					<form method="POST" action="/?/login" class="auth-form">
						<label for="login-username">Benutzername</label>
						<input
							id="login-username"
							name="username"
							required
							minlength="2"
							maxlength="30"
							value={form?.attemptedUsername ?? ''}
							placeholder="z. B. Kochlust"
						/>
						<button type="submit">Anmelden</button>
						<p>Für diese Prototyp-Funktion ist kein Passwort nötig.</p>
					</form>
				{:else}
					<form method="POST" action="/?/register" class="auth-form">
						<label for="register-username">Benutzername</label>
						<input
							id="register-username"
							name="username"
							required
							minlength="2"
							maxlength="30"
							value={form?.usernameSuggestion ?? form?.attemptedUsername ?? ''}
							placeholder="z. B. Kochlust"
						/>
						<button type="submit">Registrieren</button>
						<p>Für diese Prototyp-Funktion ist kein Passwort nötig.</p>
					</form>
				{/if}
			{/if}
		</div>
	</div>
{/if}

{@render children()}

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.site-header {
		align-items: center;
		border-bottom: 1px solid #e9e7df;
		display: flex;
		gap: 42px;
		min-height: 92px;
		padding: 12px clamp(22px, 4vw, 48px);
	}

	.brand {
		align-items: center;
		display: inline-flex;
		flex: 0 0 auto;
		font-size: 1.65rem;
		font-weight: 750;
		gap: 13px;
		letter-spacing: -0.07em;
		white-space: nowrap;
	}

	.brand-mark {
		align-items: center;
		background: #ef604f;
		border-radius: 17px;
		box-shadow: 0 9px 22px #ef604f30;
		color: white;
		display: inline-flex;
		font-size: 1.65rem;
		height: 54px;
		justify-content: center;
		letter-spacing: 0;
		width: 54px;
	}

	nav {
		align-items: stretch;
		align-self: stretch;
		display: flex;
		flex: 1;
		gap: 32px;
	}

	nav a {
		align-items: center;
		border-bottom: 2px solid transparent;
		color: #77796f;
		display: inline-flex;
		font-size: 0.96rem;
		font-weight: 600;
		margin-bottom: -1px;
		padding: 0 2px;
		transition: color 150ms ease;
		white-space: nowrap;
	}

	nav a:hover,
	nav a.active {
		color: #252621;
	}

	nav a.active {
		border-bottom-color: #ef604f;
	}

	.nav-search {
		align-items: center;
		background: white;
		border: 1px solid #e7e5dc;
		border-radius: 16px;
		box-shadow: 0 3px 8px #383a3014;
		display: flex;
		flex: 0 1 326px;
		gap: 12px;
		height: 54px;
		padding: 0 17px;
	}

	.account-button {
		align-items: center;
		background: #fffefa;
		border: 1px solid #e7e5dc;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		flex: 0 0 54px;
		height: 54px;
		justify-content: center;
		width: 54px;
	}

	.account-button:hover {
		border-color: #ef604f;
	}

	.account-button svg {
		fill: none;
		height: 23px;
		stroke: #55574e;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.8;
		width: 23px;
	}

	.nav-search:focus-within {
		border-color: #ef604f;
		box-shadow: 0 0 0 3px #ef604f20;
	}

	.nav-search svg {
		fill: none;
		flex: 0 0 20px;
		height: 20px;
		stroke: #77796f;
		stroke-linecap: round;
		stroke-width: 1.8;
		width: 20px;
	}

	.nav-search input {
		background: transparent;
		border: 0;
		color: #252621;
		font: inherit;
		min-width: 0;
		outline: 0;
		width: 100%;
	}

	.nav-search input::placeholder {
		color: #96978e;
	}

	.sr-only {
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.auth-backdrop {
		align-items: center;
		background: #25262180;
		display: flex;
		inset: 0;
		justify-content: center;
		padding: 20px;
		position: fixed;
		z-index: 1000;
	}

	.auth-modal {
		background: #fffefa;
		border-radius: 22px;
		box-shadow: 0 24px 70px #25262138;
		max-width: 430px;
		padding: 28px;
		position: relative;
		width: 100%;
	}

	.auth-close {
		align-items: center;
		background: #f3f2ec;
		border: 0;
		border-radius: 50%;
		color: #55574e;
		cursor: pointer;
		display: flex;
		font-size: 1.35rem;
		height: 34px;
		justify-content: center;
		position: absolute;
		right: 16px;
		top: 16px;
		width: 34px;
	}

	.auth-kicker {
		color: #d94d3e;
		font-size: 0.75rem;
		font-weight: 750;
		letter-spacing: 0.08em;
		margin: 0 0 7px;
		text-transform: uppercase;
	}

	.auth-modal h2 {
		font-size: 2rem;
		letter-spacing: -0.05em;
		margin: 0;
	}

	.auth-description {
		color: #707268;
		font-size: 0.92rem;
		margin: 8px 0 18px;
	}

	.auth-tabs {
		background: #f3f2ec;
		border-radius: 10px;
		display: grid;
		gap: 4px;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 16px;
		padding: 4px;
	}

	.auth-tabs button {
		background: transparent;
		border: 0;
		border-radius: 8px;
		cursor: pointer;
		font: inherit;
		padding: 9px 12px;
	}

	.auth-tabs button.active {
		background: white;
		box-shadow: 0 2px 8px #383a3014;
		font-weight: 700;
	}

	.auth-error {
		background: #fff1ee;
		border-radius: 9px;
		color: #a93c31;
		font-size: 0.86rem;
		margin: 0 0 14px;
		padding: 10px 12px;
	}

	.auth-form {
		display: grid;
		gap: 9px;
	}

	.auth-form label {
		font-size: 0.88rem;
		font-weight: 650;
	}

	.auth-form input {
		border: 1px solid #e1dfd6;
		border-radius: 10px;
		font: inherit;
		padding: 11px 12px;
	}

	.auth-form input:focus {
		border-color: #ef604f;
		box-shadow: 0 0 0 3px #ef604f20;
		outline: none;
	}

	.auth-form button,
	.logged-in-panel form button {
		background: #ef604f;
		border: 0;
		border-radius: 10px;
		color: white;
		cursor: pointer;
		font: inherit;
		font-weight: 650;
		padding: 11px 14px;
	}

	.auth-form p {
		color: #85877c;
		font-size: 0.78rem;
		margin: 2px 0 0;
	}

	.logged-in-panel {
		align-items: center;
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}

	.logged-in-panel h2 {
		font-size: 1.35rem;
		line-height: 1.25;
		margin: 0;
	}

	.logged-in-panel form button {
		background: #f3f2ec;
		color: #55574e;
		font-size: 0.82rem;
		padding: 8px 10px;
	}

	@media (max-width: 820px) {
		.site-header {
			gap: 24px;
			min-height: 80px;
		}

		.brand {
			font-size: 1.45rem;
		}

		.brand-mark {
			border-radius: 14px;
			height: 46px;
			width: 46px;
		}

		nav {
			gap: 22px;
		}

		.nav-search {
			flex-basis: 250px;
		}

		.account-button {
			flex-basis: 46px;
			height: 46px;
			width: 46px;
		}
	}

	@media (max-width: 640px) {
		.site-header {
			flex-wrap: wrap;
			gap: 0 18px;
			padding: 12px 18px;
		}

		.brand {
			font-size: 1.3rem;
		}

		.brand-mark {
			height: 42px;
			width: 42px;
		}

		nav {
			gap: 15px;
			margin-left: auto;
		}

		nav a {
			font-size: 0.78rem;
		}

		.nav-search {
			flex: 0 0 100%;
			height: 46px;
			margin-top: 12px;
		}

		.account-button {
			flex-basis: 42px;
			height: 42px;
			margin-left: auto;
			width: 42px;
		}
	}
</style>
