<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	const dispatch = createEventDispatcher();
</script>

<button
	transition:fade={{ duration: 150 }}
	class="backdrop"
	on:click={() => dispatch('backdropClick')}
/>

<style>
	.backdrop {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #000000b5;
		z-index: 99;
	}
</style>
