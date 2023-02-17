<script lang="ts">
	import Confirmation from '$lib/ui_components/modal/Confirmation.svelte';
	import Modal from '$lib/ui_components/modal/Modal.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: PersonStorage;
	value;
	export let selectedTab;
	selectedTab;
</script>

<Modal
	width={'max-content'}
	confirmationText={'Delete'}
	on:backdropClick={() => dispatch('close')}
	on:updateModal={() => {
		dispatch('confirmDelete');
		dispatch('close');
	}}>
	<Confirmation
		title="Are you sure you want to delete this person?"
		subtitle="This cannot be undone." />
</Modal>
