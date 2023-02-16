<script lang="ts">
	import Modal from '$lib/ui_components/modal/Modal.svelte';
	import MultiSelectList from '$lib/inputs/generics/select/MultiSelectList.svelte';

	import { created_and_last_modified } from '$lib/fn/timestamp';
	import { createEventDispatcher } from 'svelte';
	import { timeline_options } from '$lib/fn/build_select_options';
	const dispatch = createEventDispatcher();

	export let selectedTab: Tab = { label: '', id: '', type: 'static_scene' };
	selectedTab;
	export let value: DataStorage;

	let options: Array<undefined | DropDownOption> = timeline_options();

	let selectedItems: Option[] = [];

	const selectOption = (e: { detail: { option: { code: string; value: string } } }) => {
		const option = e.detail.option;
		if (!selectedItems.find((item) => item.value == option.code)) {
			selectedItems = [...selectedItems, { value: option.code, label: option.value }];
		} else selectedItems = selectedItems.filter((item) => item.value !== option.code);
	};

	const updateItems = () => {
		let cardsToAdd = selectedItems.map((item) => {
			let newItem = { card_id: item.value, fields: {}, title: item.label };
			created_and_last_modified(newItem);
			return newItem;
		});
		value.actions = [...value.actions, ...cardsToAdd];
		dispatch('close');
	};
</script>

<Modal hideContainer on:backdropClick={() => dispatch('close')}>
	<MultiSelectList
		{selectedItems}
		{updateItems}
		{options}
		field={{ title: 'Add Action' }}
		on:close
		on:selectOption={selectOption} />
</Modal>
