<script lang="ts">
	import Card from '$lib/ui_components/Card.svelte';
	import Timestamp from '$lib/scene_actions/Timestamp.svelte';

	import { last_modified } from '$lib/fn/timestamp';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let value: DataStorage;
	export let allCollapsed = false;

	let timestampLocation: { section: 'actions' | 'notes'; index: number } | undefined = undefined;
</script>

{#if value.actions}
	{#each value.actions as card, cardIndex (card.fields)}
		{@const cardData = cards.find((item) => item.card_id === card.card_id)?.card_json}
		{#if cardData && value.actions}
			<!-- this value is where we need to store nv's -->
			<Card
				bind:value={card.fields}
				bind:pnNvStorage={card.fields}
				data={JSON.parse(cardData)}
				timestamp={card?.last_modified}
				collapsible
				{allCollapsed}
				on:modify={() => last_modified(card)}
				on:editTimestamp={() => (timestampLocation = { section: 'actions', index: cardIndex })} />
		{/if}
	{/each}
{/if}
{#if timestampLocation}
	<Timestamp bind:value bind:timestampLocation />
{/if}
