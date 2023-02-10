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
		if (action === 'DELETE_OBJECT') {
			console.log(value, action);
			dispatch('deleteNote', { uuid: value.uuid });
		}
	};

	$: {
		if (allCollapsed !== undefined) collapsed = allCollapsed;
	}

	console.log(data);
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
									{#if field.nv && field.type !== 'multiSelect'}
										<button class="material-symbols-outlined notValue">block</button>
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
		border: 1pt solid var(--border);
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
		border-left: var(--1pxBorder);
		color: var(--dark2);
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		font-size: var(--fontXL);
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
</style>
