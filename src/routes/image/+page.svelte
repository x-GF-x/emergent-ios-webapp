<script lang="ts">
	import { browser } from '$app/environment';
	import ModalBackdrop from '$lib/ui_components/modal/ModalBackdrop.svelte';
	import { onMount } from 'svelte';

	let src: string | null = '';
	let alt: string | null = '';

	onMount(() => {
		if (browser) {
			src = window.localStorage.getItem('photo_src');
			alt = window.localStorage.getItem('photo_alt');
		}
	});
</script>

<div class="container">
	{#if src}
		<img class="photo" {src} {alt} />
	{/if}
</div>
<ModalBackdrop />

<style>
	.container {
		display: flex;
		height: 100%;
	}

	img {
		z-index: 100;
		margin: auto;
		margin-top: 50px;
	}
</style>
