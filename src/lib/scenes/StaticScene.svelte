<script lang="ts">
	import Card from '$lib/card/Card.svelte';

	import { scenes } from '$lib/resource_file/ui/ui_scenes';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let selectedTab: Tab;
	let filteredScenes = scenes.filter((scene) => scene.scene_id === selectedTab.id);
</script>

{#each filteredScenes as scene}
	{@const cardData = cards.find((item) => item.card_id === scene.card_id)?.card_json}
	{#if cardData}
		<Card data={JSON.parse(cardData)} />
	{/if}
{/each}

<style>
	/*  */
</style>
