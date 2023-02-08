<script lang="ts">
	import { dynamicSceneTypes } from '$lib/data/patient_details';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let allCollapsed = false;

	let dynamicIds: DynamicId[] | undefined = selectedTab?.dynamic_ids;
</script>

{#if dynamicIds}
	{#each dynamicIds as dynamicId}
		{#if dynamicId !== 'static_fields' && value[dynamicId]}
			<svelte:component this={dynamicSceneTypes[dynamicId]} {value} {allCollapsed} />
		{/if}
	{/each}
{/if}
