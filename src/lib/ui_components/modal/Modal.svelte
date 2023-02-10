<script lang="ts">
	import ModalBackdrop from '$lib/ui_components/modal/ModalBackdrop.svelte';

	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let hideContainer: boolean = false;
	const dispatch = createEventDispatcher();
</script>

{#if hideContainer}
	<div class="minimalContainer" transition:fly={{ duration: 500, y: 1000 }}>
		<slot />
	</div>
{:else}
	<div class="modalContainer" transition:fade={{ duration: 150 }}>
		<slot />
		<div class="footer">
			<button class="cancel" on:click={() => dispatch('backdropClick')}>Cancel</button>
			<button class="update" on:click={() => dispatch('updateModal')}>Update</button>
		</div>
	</div>
{/if}
<ModalBackdrop on:backdropClick />

<style>
	.modalContainer {
		position: fixed;
		top: 12vh;
		left: 0;
		right: 0;
		margin: auto;
		max-width: 1200px;
		display: block;
		z-index: 100;
		background: var(--light3);
		padding: 20px;
		border-radius: 10px;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}

	.cancel {
		color: var(--primary);
		font-weight: var(--weightBold);
	}

	.update {
		background: var(--primary);
		border-radius: 5px;
		padding: 12px;
		color: var(--light1);
	}

	.minimalContainer {
		position: relative;
		top: 20vh;
		width: 350px;
		max-height: 440px;
		overflow: auto;
		margin: auto;
		z-index: 100;
	}
</style>
