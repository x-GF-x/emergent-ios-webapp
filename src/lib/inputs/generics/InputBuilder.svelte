<script lang="ts">
	import { input_components } from '$lib/data/input_components';
	import { createEventDispatcher } from 'svelte';

	export let field: Field | SubField;
	export let value: FieldValues | any;
	export let fromModal = false;

	let originalValue = JSON.stringify(value);

	const dispatch = createEventDispatcher();

	const updateLastModified = () => {
		if (value && JSON.stringify(value) !== originalValue) dispatch('modify');
	};

	$: value, updateLastModified();
</script>

{#if field?.type}
	{#if !['multiSelect', 'score', 'action'].includes(field.type) && !field?.multiline}
		<div class="fieldTitle">
			{field?.title}
		</div>
	{/if}
	{#if field.type !== 'age' && field.type !== 'drug'}
		<svelte:component
			this={input_components[field.type]}
			{field}
			{fromModal}
			bind:value
			on:setDate
			on:changeDrug
			on:handlePn
			on:handleNa
			on:actionButton
		/>
	{/if}
{/if}

<style>
	.fieldTitle {
		padding: 8px 8px 0 16px;
		font-weight: 300;
		font-size: 10pt;
		color: var(--dark2);
	}
</style>
