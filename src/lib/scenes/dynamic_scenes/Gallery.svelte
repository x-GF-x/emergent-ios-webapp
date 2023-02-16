<script lang="ts">
	import Photo from '$lib/inputs/Photo.svelte';

	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let value: PersonStorage;
	export let allCollapsed = false;
	allCollapsed;
</script>

{#if value.photo}
	<div class="galleryGrid">
		{#each value.photo as photo, photoIndex}
			{@const cardData = cards.find((item) => item.card_id === photo.card_id)?.card_json}
			{#if cardData}
				<Photo bind:value={value.photo[photoIndex]} data={JSON.parse(cardData)} />
			{/if}
		{/each}
	</div>
{/if}

<style>
	.galleryGrid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
