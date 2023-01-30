<script lang="ts">
	import { input_components } from '$lib/data/input_components';
	export let field: Field | SubField;
	export let value: any;
</script>

{#if field?.type}
	{#if field.type !== 'multiSelect' && field.type !== 'score'}
		<div class="fieldTitle">
			{field?.title}
		</div>
	{/if}
	<svelte:component this={input_components[field.type]} {field} bind:value />
{/if}

<style>
	.fieldTitle {
		font-weight: 200;
		font-size: 10pt;
	}
</style>
