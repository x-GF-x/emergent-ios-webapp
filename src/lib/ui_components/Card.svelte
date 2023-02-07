<script lang="ts">
	import Age from '$lib/inputs/Age.svelte';
	import Drug from '$lib/inputs/Drug.svelte';
	import InputBuilder from '$lib/inputs/generics/InputBuilder.svelte';
	import SplitNumeric from '$lib/inputs/SplitNumeric.svelte';
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';

	import { widthConversion } from './width_conversion';
	import { createEventDispatcher, tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import { dataStorageAccessor } from '$lib/stores/data';

	const dispatch = createEventDispatcher();

	export let data: CardJson;
	export let value: DataStorage['static_fields'] | ActionItem['fields'];
	export let collapsible = true;
	export let allCollapsed: boolean | undefined = false;
	export let chart: QuickChartObject | undefined = undefined;
	export let fromModal = false;

	let collapsed = false;
	let pnField: Field | undefined = undefined;
	let pnSelector: SingleSelect;

	const collapse = () => {
		collapsed = !collapsed;
		dispatch('collapsed');
	};

	const handlePn = async (e: { detail: { field: Field; value: boolean } }) => {
		value[e.detail.field.id + '_pn'] = undefined;
		$dataStorageAccessor = $dataStorageAccessor;
		if (e.detail.value) {
			pnField = e.detail.field;
			await tick().then(() => pnSelector?.toggle());
		}
	};

	const handleNa = (e: { detail: { field: Field; value: boolean } }) => {
		if (!value[e.detail.field.id + '_na']) value[e.detail.field.id + '_na'] = true;
		else value[e.detail.field.id + '_na'] = false;
		console.log(value);
	};

	const handleActionButton = (e: { detail: { action: string } }) => {
		const action = e.detail.action;
		console.log(value);
		if (action === 'DELETE_OBJECT') {
			dispatch('deleteNote', { uuid: value.uuid });
		}
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
			<button
				class="listHeader collapsible"
				class:timestamp={value.last_modified ? true : false}
				class:collapsed
				on:click={collapse}
			>
				<div class="titleAndIcon">
					<div class="material-symbols-outlined">{collapsed ? 'unfold_more' : 'unfold_less'}</div>
					<div class="title">{data.properties.title}</div>
				</div>
				<div class="timestamp">
					{#if typeof value?.last_modified === 'string'}
						{value.last_modified.substring(0, 5)}
					{/if}
				</div>
			</button>
		{/if}
		{#if !collapsed}
			<div class="rows" transition:slide|local>
				{#each data.rows as row}
					<div class="row">
						{#each row.fields as field}
							{@const width = widthConversion[field.width] ? widthConversion[field.width] : '33.33'}

							<div
								style:width={width + '%'}
								aria-label={field?.type}
								class:multiSelect={field.type === 'multiSelect'}
								class="field"
							>
								{#if !field.subFields && !field.splitFields}
									<InputBuilder
										{field}
										{fromModal}
										bind:value={value[field.id]}
										on:modify
										on:actionButton={(e) => handleActionButton(e)}
										on:handlePn={handlePn}
										on:handleNa={handleNa}
									/>
									<!-- Handling fields with subfields separately
										 to avoid circular dependency when we build subFields -->
								{:else if field.type === 'age'}
									<Age {field} bind:value />
								{:else if field.type === 'drug'}
									<Drug {chart} {field} bind:value />
								{:else if field.splitFields}
									<SplitNumeric bind:value {field} />
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

{#if pnField?.id}
	<SingleSelect
		bind:this={pnSelector}
		pnOptions={pnField.pn}
		hidePopperButton
		value={undefined}
		on:setPn={(e) => {
			if (pnField?.id) {
				value[pnField.id + '_pn'] = e.detail.value;
				$dataStorageAccessor = $dataStorageAccessor;
			}
		}}
	/>
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

	.titleAndIcon {
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.timestamp {
		justify-content: space-between;
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
