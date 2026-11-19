<script>
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
	let searchQuery = $derived(page.url.searchParams.get('q') ?? '');
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
	</nav>

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
	}
</style>
