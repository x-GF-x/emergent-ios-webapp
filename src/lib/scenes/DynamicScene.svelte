<script lang="ts">
	import Timeline from './dynamic_scenes/Timeline.svelte';
	import Gallery from './dynamic_scenes/Gallery.svelte';
	import Notes from './dynamic_scenes/Notes.svelte';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let allCollapsed = false;
	export let timers;
	timers = timers;

	let dynamicIds: DynamicId[] | undefined = selectedTab?.dynamic_ids;
	const dynamicSceneTypes = { actions: Timeline, photo: Gallery, notes: Notes };
</script>

{#if dynamicIds}
	{#each dynamicIds as dynamicId}
		{#if dynamicId !== 'static_fields' && value[dynamicId] && dynamicSceneTypes[dynamicId]}
			<svelte:component
				this={dynamicSceneTypes[dynamicId]}
				{value}
				{allCollapsed}
				on:editTimestamp />
		{/if}
	{/each}
{/if}
