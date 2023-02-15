<script lang="ts">
	import Numpad from '$lib/inputs/generics/Numpad.svelte';
	import Modal from '$lib/ui_components/modal/Modal.svelte';

	export let value: DataStorage;
	export let timestampLocation: { section: 'actions' | 'notes'; index: number } | undefined;

	let newTimestamp = '';

	const handleUpdate = () => {
		if (timestampLocation)
			value[timestampLocation.section][timestampLocation.index].last_modified = newTimestamp;
		timestampLocation = undefined;
	};
</script>

<div class="timestampContainer">
	<Modal hideContainer on:backdropClick={() => (timestampLocation = undefined)}>
		<Numpad
			bind:value={newTimestamp}
			type="date"
			field={{ id: 'time', style: 'time', title: 'Timestamp', type: 'date' }}
			on:update={handleUpdate} />
	</Modal>
</div>

<style>
	.timestampContainer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
</style>
