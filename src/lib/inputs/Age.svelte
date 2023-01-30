<script lang="ts">
	import InputBuilder from './generics/InputBuilder.svelte';

	export let value: { [key: string]: any };
	export let field: Field = undefined;
	let subFields: SubField[];
	if (field?.subFields) {
		subFields = field.subFields;
	}

	if (!value) {
		value = {};
		field?.subFields?.forEach((subField) => {
			if (subField?.id) value[subField.id] = undefined;
		});
	}

	console.log(field, value);
</script>

{#if Array.isArray(field?.subFields)}
	<div class="subFields">
		{#each subFields as subField}
			{#if value}
				<div class="subField">
					<InputBuilder field={subField} bind:value={value[subField.id]} />
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
		border-right: 1px solid var(--border);
	}
</style>
