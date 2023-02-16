<script lang="ts">
	import Age from '$lib/inputs/Age.svelte';
	import Drug from '$lib/inputs/Drug.svelte';
	import InputBuilder from '$lib/inputs/generics/InputBuilder.svelte';
	import SplitNumeric from '$lib/inputs/SplitNumeric.svelte';
	import PnNv from './PnNv.svelte';

	import { widthConversion } from './width_conversion';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { dataStorageAccessor } from '$lib/stores/data';

	const dispatch = createEventDispatcher();

	export let data: CardJson;
	export let value: DataStorage['static_fields'] | ActionItem['fields'];
	export let collapsible = true;
	export let allCollapsed: boolean | undefined = false;
	export let chart: QuickChartObject | undefined = undefined;
	export let fromModal = false;
	export let timestamp = value.last_modified ? value.last_modified : undefined;
	export let pnNvStorage: PnNvStorage = undefined;

	let collapsed = false;

	const collapse = () => {
		collapsed = !collapsed;
		dispatch('collapsed');
	};

	const handleActionButton = (e: { detail: { action: string } }) => {
		const action = e.detail.action;
		if (action === 'DELETE_OBJECT') {
			console.log(value, action);
			dispatch('deleteNote', { uuid: value.uuid });
		}
	};

	$: {
		if (allCollapsed !== undefined) collapsed = allCollapsed;
	}
</script>

{#if value}
	{@const title = data.properties.title}
	{#if !collapsible}
		<div class="listHeader">
			<div class="title">{title}</div>
		</div>
	{/if}
	<div
		class="list"
		class:hiddenList={title === 'Notes' && data.rows.length === 1}
		class:inactive={$dataStorageAccessor.readonly}>
		{#if collapsible}
			<button class="listHeader collapsible" class:timestamp class:collapsed on:click={collapse}>
				<div class="titleAndIcon">
					<div class="material-symbols-outlined">{collapsed ? 'unfold_more' : 'unfold_less'}</div>
					<div class="cardTitle">{data.properties.title}</div>
				</div>
				{#if typeof timestamp === 'string'}
					{@const legibleTimestamp = new Date(timestamp).toLocaleTimeString('en-US', {
						hour12: false
					})}
					<button
						class="timestampButton"
						on:click|stopPropagation={() => dispatch('editTimestamp')}>
						{legibleTimestamp.substring(0, legibleTimestamp.length - 3)}
					</button>
				{/if}
			</button>
		{/if}
		{#if !collapsed}
			<div class="rows" transition:slide|local>
				{#each data.rows as row}
					<div
						style:background={$dataStorageAccessor.readonly ? 'transparent' : ''}
						class="row"
						class:actionButtonRow={row.fields?.length === 1 && row.fields[0].type === 'action'}>
						{#each row.fields as field}
							{@const width = widthConversion[field.width] ? widthConversion[field.width] : '33.33'}
							{@const disabled =
								value[field.id + '_nv'] || value[field.id + '_pn'] || $dataStorageAccessor.readonly
									? true
									: false}
							<div
								style:width={width + '%'}
								aria-label={field?.type}
								class:multiSelect={field.type === 'multiSelect'}
								class="fieldContainer"
								style:background={$dataStorageAccessor.readonly
									? 'transparent'
									: field.type !== 'action'
									? 'var(--light1)'
									: ''}
								class:disabled={disabled &&
									field.type !== 'multiSelect' &&
									field.type !== 'action' &&
									!$dataStorageAccessor.readonly}>
								<div class="fieldAndNv">
									<div class="field">
										{#if !field.subFields && !field.splitFields}
											<InputBuilder
												{field}
												{fromModal}
												{disabled}
												bind:value={value[field.id]}
												bind:pnNvStorage
												on:modify
												on:actionButton={(e) => handleActionButton(e)} />
											<!-- Handling fields with subfields separately
										 to avoid circular dependency when we build subFields -->
										{:else if field.type === 'age'}
											<Age bind:value {disabled} {field} />
										{:else if field.type === 'drug'}
											<Drug bind:value {disabled} {chart} {field} />
										{:else if field.splitFields}
											<SplitNumeric bind:value {disabled} {field} />
										{/if}
									</div>
									{#if (field.nv || field.pn) && field.type !== 'multiSelect' && !$dataStorageAccessor.readonly}
										<PnNv bind:value {field} />
									{/if}
								</div>
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
		margin: 16px 16px 0px 16px;
		background: var(--light2);
		border: var(--1pxBorder);
		border-radius: 5px;
	}

	.hiddenList {
		margin: 0;
		background: none;
		border: none;
	}

	.list:last-child {
		margin-bottom: 50px;
	}

	.listHeader {
		display: flex;
		align-items: center;
		font-weight: var(--weightRegular);
		font-size: var(--fontLarge);
		margin: 0 16px 16px 16px;
	}

	.titleAndIcon {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-weight: var(--weightBold);
	}

	.cardTitle {
		padding: 6px;
	}

	.collapsible {
		margin: 0;
		color: var(--secondary);
		font-size: var(--fontSmall);
		margin-bottom: 0;
		padding: 10px;
		border-bottom: var(--1pxBorder);
	}

	.collapsed {
		border-bottom: 0;
	}

	.timestamp {
		justify-content: space-between;
	}

	.timestampButton {
		color: var(--secondary);
	}

	.rows {
		margin: 15px;
	}

	.row {
		display: flex;
		flex-direction: row;
		border: var(--1pxBorder);
		min-height: 40px;
		justify-content: flex-start;
		width: 100%;
	}

	.row:not(:last-child) {
		border-bottom: none;
	}

	.fieldContainer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
	}

	.fieldContainer:not(:last-child) {
		border-right: 1px solid var(--border);
	}

	.fieldAndNv {
		display: grid;
		grid-template-columns: minmax(0, 1fr) max-content;
		align-items: center;
		height: 100%;
	}

	.field {
		width: 100%;
	}

	.multiSelect {
		justify-content: center;
	}

	.actionButtonRow {
		border: none;
		border-top: 1px solid var(--border);
		background: var(--light2);
		align-items: flex-end;
		height: max-content;
		min-height: 30px;
		width: calc(100% + 2px);
	}

	.inactive {
		background: var(--disabled);
	}

	.disabled {
		background: var(--disabled) !important;
	}
</style>
