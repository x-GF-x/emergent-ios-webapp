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
	confirmationText={'Add Person'}
	width={'max-content'}
	on:backdropClick={() => dispatch('close')}
	on:updateModal={() => {
		dispatch('confirmAdd');
		dispatch('close');
	}}>
	<div class="deleteMessageContainer">
		<div class="title">Are you sure you want to add a person?</div>
		<div class="subtitle">
			<!--  -->
		</div>
	</div>
</Modal>

<style>
	.deleteMessageContainer {
		margin: 40px;
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
