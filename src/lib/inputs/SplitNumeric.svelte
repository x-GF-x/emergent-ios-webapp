<script lang="ts">
	import InputBuilder from './generics/InputBuilder.svelte';

	export let value: DataStorage['static_fields'];
	export let field: Field | undefined = undefined;

	let splitFields = field?.splitFields;

	splitFields?.map((item) => {
		if (item) item.type = 'numeric';
	});
</script>

{#if Array.isArray(splitFields)}
	<div class="splitFields">
		{#each splitFields as split}
			{#if split?.id}
				<div class="split">
					<InputBuilder bind:value={value[split.id]} field={split} />
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.splitFields {
		display: flex;
		justify-content: space-evenly;
	}

	.split {
		width: 100%;
	}
</style>
