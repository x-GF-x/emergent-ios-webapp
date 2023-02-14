<script lang="ts">
	import Modal from '$lib/ui_components/modal/Modal.svelte';

	import { createEventDispatcher } from 'svelte';
	import { timeline_options } from '$lib/fn/build_select_options';
	import SelectList from '$lib/inputs/generics/select/SelectList.svelte';
	const dispatch = createEventDispatcher();

	let options: Array<undefined | DropDownOption> = timeline_options();

	const selectOption = (selection: ScoreObject) => {
		dispatch('select', { value: selection });
		dispatch('close');
	};
</script>

<Modal hideContainer on:backdropClick={() => dispatch('close')}>
	<SelectList {options} {selectOption} />
</Modal>
