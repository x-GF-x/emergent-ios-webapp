<script lang="ts">
	import Modal from '$lib/ui_components/modal/Modal.svelte';
	import MultiSelectList from '$lib/inputs/generics/select/MultiSelectList.svelte';

	import { cards } from '$lib/resource_file/ui/ui_cards';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { created_and_last_modified } from '$lib/fn/timestamp';
	const dispatch = createEventDispatcher();

	export let selectedTab: Tab;
	selectedTab = selectedTab;
	export let value: DataStorage;
	value = value;

	let options: DropDownOption[] = cards.map((item) => {
		return { code: item.card_id, value: item.title, id: 0, type: '' };
	});

	let selectedItems: Option[] = [];

	const selectOption = (e: { detail: { option: { code: string; value: string } } }) => {
		const option = e.detail.option;
		if (!selectedItems.find((item) => item.value == option.code)) {
			selectedItems = [...selectedItems, { value: option.code, label: option.value }];
		} else selectedItems = selectedItems.filter((item) => item.value !== option.code);
		console.log(selectedItems);
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
	<div class="container" transition:fly={{ duration: 500, y: 1000 }}>
		<MultiSelectList
			{selectedItems}
			{updateItems}
			{options}
			field={{ title: 'Add Action' }}
			on:close
			on:selectOption={selectOption}
		/>
	</div>
</Modal>

<style>
	.container {
		position: relative;
		top: 20vh;
		width: 350px;
		max-height: 440px;
		overflow: auto;
		margin: auto;
		z-index: 100;
	}
</style>
