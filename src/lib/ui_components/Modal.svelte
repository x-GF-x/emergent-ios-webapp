<script lang="ts">
	import ModalBackdrop from '$lib/ui_components/ModalBackdrop.svelte';

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

<ModalBackdrop on:backdropClick />
<div class="modalContainer" transition:fade={{ duration: 150 }}>
	<slot />
	<div class="footer">
		<button class="cancel" on:click={() => dispatch('backdropClick')}>Cancel</button>
		<button class="update" on:click={() => dispatch('updateModal')}>Update</button>
	</div>
</div>

<style>
	.modalContainer {
		position: fixed;
		width: 100%;
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
		font-weight: 600;
	}

	.update {
		background: var(--primary);
		border-radius: 5px;
		padding: 12px;
		color: var(--light1);
	}
</style>
