<script lang="ts">
	import CardModal from '$lib/ui_components/modal/CardModal.svelte';

	import { cards } from '$lib/resource_file/ui/ui_cards';
	import { created_and_last_modified } from '$lib/fn/timestamp';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: DataStorage;
	export let selectedTab;
	selectedTab;

	let activeCard: string | undefined = cards.find(
		(item) => item.card_id === 'narrative'
	)?.card_json;
	let cardValue: NoteItem = { card_id: 'narrative', last_modified: '', created: '', uuid: '' };

	const saveModal = () => {
		created_and_last_modified(cardValue);
		cardValue.uuid = crypto.randomUUID();
		value.notes = [...value.notes, Object.assign({}, cardValue)];
		cardValue = {};
		activeCard = undefined;
		dispatch('close');
	};
</script>

{#if activeCard}
	<CardModal
		bind:value={cardValue}
		data={JSON.parse(activeCard)}
		on:backdropClick={() => {
			activeCard = undefined;
			dispatch('close');
		}}
		on:updateModal={saveModal} />
{/if}
