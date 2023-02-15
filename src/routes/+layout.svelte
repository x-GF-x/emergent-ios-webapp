<script lang="ts">
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		if (browser && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			$theme = 'dark';
		}
		mounted = true;
	});
</script>

<svelte:head>
	<title>Emergent</title>

	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100;200;300;400"
		rel="stylesheet" />

	<link
		href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600"
		rel="stylesheet" />

	{#if $theme === 'dark'}
		<style lang="css">
			@import '../dark.css';
		</style>
	{:else}
		<style lang="css">
			@import '../light.css';
		</style>
	{/if}
</svelte:head>
<main>
	{#if mounted}
		<slot />
	{/if}
</main>

<style>
	main {
		font-family: 'Inter';
	}
</style>
