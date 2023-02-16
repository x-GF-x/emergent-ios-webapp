<script lang="ts">
	import Modal from '$lib/ui_components/modal/Modal.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: PersonStorage;
	value;
	export let selectedTab;
	selectedTab;
</script>

<Modal
	on:backdropClick={() => dispatch('close')}
	confirmationText={'Delete'}
	on:updateModal={() => {
		dispatch('confirmDelete');
		dispatch('close');
	}}>
	<div class="deleteMessageContainer">
		<div class="title">Are you sure you want to delete this person?</div>
		<div class="subtitle">This cannot be undone.</div>
	</div>
</Modal>

<style>
	.deleteMessageContainer {
		margin: 40px auto;
		width: max-content;
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: var(--fontXL);
		margin-bottom: 20px;
	}

	.subtitle {
		font-size: var(--fontLarge);
	}
</style>
