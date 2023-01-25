<script lang="ts">
	// import type { LayoutData } from './$types';
	// export let data: LayoutData;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600" rel="stylesheet" />
	<link href="src/app.css" rel="stylesheet" />
</svelte:head>
<main>
	<slot />
</main>

<style>
	main {
		font-family: 'Inter';
	}
</style>
