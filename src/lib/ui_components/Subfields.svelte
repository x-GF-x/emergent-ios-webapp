<script lang="ts">
	import InputBuilder from '$lib/inputs/generics/InputBuilder.svelte';

	export let subFields: SubField[];
	export let value: { [key: string]: FieldValues } = {};
</script>

{#if Array.isArray(subFields)}
	<div class="subFields">
		{#each subFields as subField}
			{#if value && subField.id}
				<div class="subField">
					<InputBuilder field={subField} bind:value={value[subField.id]} on:setDate on:changeDrug />
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.subFields {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.subField {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.subField:not(:last-child) {
		border-right: 1pt solid var(--border);
	}
</style>
