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
	confirmationText={'Add Person'}
	width={'max-content'}
	on:backdropClick={() => dispatch('close')}
	on:updateModal={() => {
		dispatch('confirmAdd');
		dispatch('close');
	}}>
	<Confirmation title="Are you sure you want to add a person?" />
</Modal>
