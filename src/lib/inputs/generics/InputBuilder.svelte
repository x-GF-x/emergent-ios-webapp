<script lang="ts">
	import { input_components } from '$lib/data/input_components';
	import { createEventDispatcher } from 'svelte';

	export let field: Field | SubField;
	export let value: FieldValues | any;

	let originalValue = JSON.stringify(value);

	const dispatch = createEventDispatcher();

	const updateLastModified = () => {
		if (value && JSON.stringify(value) !== originalValue) dispatch('modify');
	};

	$: value, updateLastModified();
</script>

{#if field?.type}
	{#if field.type !== 'multiSelect' && field.type !== 'score' && field.type !== 'action'}
		<div class="fieldTitle">
			{field?.title}
		</div>
	{/if}
	{#if field.type !== 'age' && field.type !== 'drug'}
		<svelte:component
			this={input_components[field.type]}
			{field}
			bind:value
			on:setDate
			on:changeDrug
			on:handlePn
			on:handleNa
		/>
	{/if}
{/if}

<style>
	.fieldTitle {
		padding: 10px;
		padding-bottom: 0;
		font-weight: 200;
		font-size: 10pt;
	}
</style>
