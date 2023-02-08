<script lang="ts">
	import Card from '$lib/ui_components/Card.svelte';

	import { last_modified } from '$lib/fn/timestamp';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let value: DataStorage;
	export let allCollapsed = false;
</script>

{#if value.actions}
	{#each value.actions as card}
		{@const cardData = cards.find((item) => item.card_id === card.card_id)?.card_json}
		{#if cardData && value.actions}
			<Card
				{allCollapsed}
				collapsible
				data={JSON.parse(cardData)}
				bind:value={card.fields}
				on:modify={() => last_modified(card)}
			/>
		{/if}
	{/each}
{/if}

<style>
</style>
