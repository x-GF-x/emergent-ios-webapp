<script lang="ts">
	import Card from '$lib/ui_components/Card.svelte';
	import Photo from '$lib/inputs/Photo.svelte';

	import { cards } from '$lib/resource_file/ui/ui_cards';
	import { last_modified } from '$lib/fn/timestamp';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let allCollapsed = false;

	let dynamicIds: DynamicId[] | undefined = selectedTab?.dynamic_ids;
</script>

{#if dynamicIds}
	{#each dynamicIds as dynamicId}
		{#if dynamicId === 'actions' && value[dynamicId]}
			{#each value[dynamicId] as card}
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
		{:else if dynamicId === 'photo'}
			<div class="galleryGrid">
				{#each value[dynamicId] as photo, photoIndex}
					{@const cardData = cards.find((item) => item.card_id === photo.card_id)?.card_json}
					{#if cardData}
						<Photo bind:value={value.photo[photoIndex]} data={JSON.parse(cardData)} />
					{/if}
				{/each}
			</div>
		{:else if dynamicId === 'notes'}
			{#each value[dynamicId] as card}
				{@const cardData = cards.find((item) => item.card_id === card.card_id)?.card_json}
				{#if cardData && value.actions}
					<Card
						{allCollapsed}
						collapsible
						data={JSON.parse(cardData)}
						bind:value={card}
						on:modify={() => last_modified(card)}
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
	.galleryGrid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
