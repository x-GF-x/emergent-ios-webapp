<script lang="ts">
	import CardModal from '$lib/ui_components/modal/CardModal.svelte';

	import { cards } from '$lib/resource_file/ui/ui_cards';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selectedTab: Tab;
	export let value;
	value;

	let activeCard: string | undefined = cards.find(
		(item) => item.card_id === 'clinical_impression'
	)?.card_json;
	let cardValue: { [key: string]: string } = { card_id: 'impression', eSituation11: '' };

	const saveModal = () => {
		if (cardValue.eSituation11) selectedTab.id = cardValue.eSituation11;
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
