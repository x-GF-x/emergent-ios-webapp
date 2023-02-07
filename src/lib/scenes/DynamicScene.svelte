<script lang="ts">
	import Card from '$lib/ui_components/Card.svelte';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let allCollapsed = false;

	let dynamicIds: DynamicIds | undefined = selectedTab?.dynamic_ids;

	const updateLastModified = (card: ActionItem | NoteItem) => {
		card.last_modified = new Date().toLocaleTimeString('en-US', {
			hour12: false
		});
	};
</script>

{#if dynamicIds}
	{#each dynamicIds as dynamicId}
		{#if dynamicId === 'actions'}
			{#each value[dynamicId] as card}
				{@const cardData = cards.find((item) => item.card_id === card.card_id)?.card_json}
				{#if cardData && value.actions}
					<Card
						{allCollapsed}
						collapsible
						data={JSON.parse(cardData)}
						bind:value={card.fields}
						on:modify={() => updateLastModified(card)}
					/>
				{/if}
			{/each}
		{:else if dynamicId === 'notes'}
			{#each value[dynamicId] as card}
				{@const cardData = cards.find((item) => item.card_id === card.card_id)?.card_json}
				{#if cardData && value.actions}
					<Card
						{allCollapsed}
						collapsible
						data={JSON.parse(cardData)}
						bind:value={card}
						on:modify={() => updateLastModified(card)}
						on:deleteNote
					/>
				{/if}
			{/each}
		{:else if value[dynamicId]}
			{#each Object.entries(value[dynamicId]) as card}
				{JSON.stringify(card)}
			{/each}
		{/if}
	{/each}
{/if}

<style>
	/*  */
</style>
