<script lang="ts">
	import Actions from './dynamic_scenes/Actions.svelte';
	import Gallery from './dynamic_scenes/Gallery.svelte';
	import Notes from './dynamic_scenes/Notes.svelte';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let allCollapsed = false;

	let dynamicIds: DynamicId[] | undefined = selectedTab?.dynamic_ids;
	const dynamicSceneTypes = { actions: Actions, photo: Gallery, notes: Notes };
</script>

{#if dynamicIds}
	{#each dynamicIds as dynamicId}
		{#if dynamicId !== 'static_fields' && value[dynamicId] && dynamicSceneTypes[dynamicId]}
			<svelte:component this={dynamicSceneTypes[dynamicId]} {value} {allCollapsed} />
		{/if}
	{/each}
{/if}
