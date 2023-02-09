<script lang="ts">
	import Numpad from '$lib/inputs/generics/Numpad.svelte';
	import Modal from '$lib/ui_components/modal/Modal.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: FieldValues;
	export let selectedTab;
	value = value;
	selectedTab = selectedTab;

	let newTimestamp = '';

	const handleUpdate = () => {
		dispatch('saveTimestamp', { newTimestamp: newTimestamp });
		dispatch('close');
	};
</script>

<Modal hideContainer on:backdropClick={() => dispatch('close')}>
	<Numpad
		bind:value={newTimestamp}
		type="date"
		field={{ id: 'time', style: 'time', title: 'Timestamp', type: 'date' }}
		on:update={handleUpdate}
	/>
</Modal>

<style>
</style>
