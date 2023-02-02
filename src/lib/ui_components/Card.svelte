<script lang="ts">
	import Age from '$lib/inputs/Age.svelte';
	import Drug from '$lib/inputs/Drug.svelte';
	import InputBuilder from '$lib/inputs/generics/InputBuilder.svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let data: CardJson;
	export let value: DataStorage['static_fields'] | ActionItem['fields'];
	export let collapsible = true;
	export let allCollapsed: boolean | undefined = false;

	let collapsed = false;

	let widthConversion = { oneThird: '33.33', full: '100', half: '50' };
	const dispatch = createEventDispatcher();

	const collapse = () => {
		collapsed = !collapsed;
		dispatch('collapsed');
	};

	$: {
		if (allCollapsed !== undefined) collapsed = allCollapsed;
	}
</script>

{#if value}
	{#if !collapsible}
		<div class="listHeader">
			<div class="title">{data.properties.title}</div>
		</div>
	{/if}
	<div class="list">
		{#if collapsible}
			<button class="listHeader collapsible" class:collapsed on:click={collapse}>
				<div class="material-symbols-outlined">{collapsed ? 'unfold_more' : 'unfold_less'}</div>
				<div class="title">{data.properties.title}</div>
			</button>
		{/if}
		{#if !collapsed}
			<div class="rows" transition:slide|local>
				{#each data.rows as row}
					<div class="row">
						{#each row.fields as field}
							<div
								style:width={widthConversion[field.width]
									? `${widthConversion[field.width]}%`
									: '33.33%'}
								class="field"
								aria-label={field?.type}
								class:multiSelect={field.type === 'multiSelect'}
							>
								{#if field.id !== 'created' && field.id !== 'uuid' && field.id !== 'actions' && field.id !== 'last_modified'}
									{#if !field.subFields}
										<InputBuilder {field} bind:value={value[field.id]} on:modify />
										<!-- Handling fields with subfields separately to avoid circular dependency when we build subFields -->
									{:else if field.type === 'age'}
										<Age {field} bind:value />
									{:else if field.type === 'drug'}
										<Drug />
									{/if}
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.list {
		display: flex;
		flex-direction: column;
		max-width: 1200px;
		margin: 0 10px 10px 10px;
		background: var(--light2);
		border: 1px solid var(--border);
		border-radius: 5px;
	}

	.list:last-child {
		margin-bottom: 50px;
	}

	.listHeader {
		display: flex;
		align-items: center;
		font-weight: 300;
		font-size: 14pt;
		margin: 0 10px 10px 10px;
	}

	.collapsible {
		margin: 0;
		color: var(--secondary);
		font-size: 12pt;
		margin-bottom: 0;
		padding: 10px;
		border-bottom: 1px solid var(--border);
	}

	.collapsed {
		border-bottom: 0;
	}

	.rows {
		margin: 15px;
	}

	.row {
		display: flex;
		flex-direction: row;
		border: 1px solid var(--border);
		min-height: 40px;
		justify-content: center;
	}

	.row:not(:last-child) {
		border-bottom: none;
	}

	.field {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.field:not(:last-child) {
		border-right: 1px solid var(--border);
	}

	.multiSelect {
		padding: 0 10px;
	}
</style>
