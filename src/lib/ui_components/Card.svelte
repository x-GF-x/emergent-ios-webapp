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
	export let timestamp = value.last_modified ? value.last_modified : '';

	let collapsed = false;
	let pnField: Field | undefined = undefined;
	let pnSelector: SingleSelect;

	const collapse = () => {
		collapsed = !collapsed;
		dispatch('collapsed');
	};

	const setPnSelection = (e: { detail: { value: string } }) => {
		if (pnField?.id) {
			const selectedCode = e.detail.value;
			if (selectedCode === 'nv') {
				value[pnField.id + '_nv'] = true;
				value[pnField.id + '_pn'] = undefined;
			} else {
				value[pnField.id + '_pn'] = selectedCode;
				value[pnField.id + '_nv'] = undefined;
			}
			$dataStorageAccessor = $dataStorageAccessor;
		}
	};

	const openPnSelector = async (field: Field) => {
		pnField = field;
		if (Array.isArray(pnField.pn) && pnField.nv && !pnField.pn.find((item) => item.code === 'nv')) {
			pnField.pn = [...pnField.pn, { code: 'nv', description: 'None' }];
		}
		await tick().then(() => pnSelector?.toggle());
	};

	const handlePn = (e: { detail: { field: Field; value: boolean } }) => {
		const { field } = e.detail;
		value[field.id + '_pn'] = undefined;
		value[field.id + '_nv'] = undefined;
		if (pnField) pnField = undefined; //Close popover if open
		else if (e.detail.value) {
			if (field.pn?.length === 1 && !field?.nv) {
				value[field.id + '_pn'] = field.pn[0].code;
			} else openPnSelector(field);
		}
		$dataStorageAccessor = $dataStorageAccessor;
	};

	const handleNv = (e: { detail: { field: Field; value: boolean } }) => {
		if (!value[e.detail.field.id + '_nv']) value[e.detail.field.id + '_nv'] = true;
		else value[e.detail.field.id + '_nv'] = false;
		console.log(value);
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
	<div class="list" class:hiddenList={title === 'Notes' && data.rows.length === 1}>
		{#if collapsible}
			<button class="listHeader collapsible" class:timestamp class:collapsed on:click={collapse}>
				<div class="titleAndIcon">
					<div class="material-symbols-outlined">{collapsed ? 'unfold_more' : 'unfold_less'}</div>
					<div class="cardTitle">{data.properties.title}</div>
				</div>
				{#if typeof timestamp === 'string'}
					<button
						class="timestampButton"
						on:click|stopPropagation={() => dispatch('editTimestamp')}
					>
						{timestamp.substring(0, 5)}
					</button>
				{/if}
			</button>
		{/if}
		{#if !collapsed}
			<div class="rows" transition:slide|local>
				{#each data.rows as row}
					<div
						class="row"
						class:actionButtonRow={row.fields?.length === 1 && row.fields[0].type === 'action'}
					>
						{#each row.fields as field}
							{@const width = widthConversion[field.width] ? widthConversion[field.width] : '33.33'}
							<div
								style:width={width + '%'}
								aria-label={field?.type}
								class:multiSelect={field.type === 'multiSelect'}
								class="fieldContainer"
								class:disabled={(value[field.id + '_nv'] || value[field.id + '_pn']) &&
									field.type !== 'multiSelect'}
							>
								<div class="fieldAndNv">
									<div class="field">
										{#if !field.subFields && !field.splitFields}
											<InputBuilder
												{field}
												{fromModal}
												bind:value={value[field.id]}
												on:modify
												on:actionButton={(e) => handleActionButton(e)}
												on:handlePn={handlePn}
												on:handleNv={handleNv}
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
									{#if (field.nv || field.pn) && field.type !== 'multiSelect'}
										<button
											class="material-symbols-outlined notValue"
											on:click={() => {
												let matchingValue = field.pn
													? value[field.id + '_pn']
														? false
														: true
													: value[field.id + '_nv']
													? true
													: false;
												field.pn
													? handlePn({ detail: { field: field, value: matchingValue } })
													: handleNv({ detail: { field: field, value: matchingValue } });
											}}
										>
											block
										</button>
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

{#if pnField?.id}
	<SingleSelect
		bind:this={pnSelector}
		pnOptions={pnField.pn}
		hidePopperButton
		value={undefined}
		on:setPn={(e) => setPnSelection(e)}
	/>
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
		background: var(--light1);
	}

	.row {
		display: flex;
		flex-direction: row;
		border: var(--1pxBorder);
		min-height: 40px;
		justify-content: flex-start;
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
		border-right: 1pt solid var(--border);
	}

	.fieldAndNv {
		display: grid;
		grid-template-columns: 1fr max-content;
		align-items: center;
	}

	.field {
		width: 100%;
	}

	.notValue {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 60px;
		font-weight: 300;
		color: var(--dark3);
		font-size: var(--fontXL);
		border-left: var(--1pxBorder);
	}

	.multiSelect {
		justify-content: center;
	}

	.actionButtonRow {
		border: none;
		border-top: 1pt solid var(--border);
		background: var(--light2);
		align-items: flex-end;
		height: max-content;
		min-height: 30px;
	}

	.disabled {
		background: var(--border);
	}
</style>
