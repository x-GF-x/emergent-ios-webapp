<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import MultiSelectList from './generics/select/MultiSelectList.svelte';

	import { dataStorageAccessor } from '$lib/stores/data';
	import { fieldOptions } from '$lib/resource_file/lookups/lookups';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let field: Field;
	export let value: MultiSelectValues | EmbeddedMultiSelectValues | undefined = field?.embedded
		? {}
		: [];

	let fieldLookupId = field?.key;
	let options: DropDownOption[] = fieldOptions.filter((option) => option.type === fieldLookupId);
	let idOfActiveEmbeddedList: string | undefined = undefined;
	let popper: Popper;
	let noneSelected = false;
	let storedValues: string = JSON.stringify(value);
	let hasEmbeddedOptions = field?.embedded ? true : false;
	let embeddedLookupId: string | undefined = undefined;
	let embeddedOptions: DropDownOption[] = [];
	let pnLabel: string | undefined = undefined;

	//Build the pnLabel
	$: field.pn && $dataStorageAccessor?.static_fields?.[field.id + '_pn']
		? (pnLabel = field.pn.find(
				(item) => item.code === $dataStorageAccessor?.static_fields?.[field.id + '_pn']
		  )?.description)
		: '';

	if (hasEmbeddedOptions) {
		embeddedLookupId = field?.embedded?.key;
		embeddedOptions = fieldOptions.filter((option) => option.type === embeddedLookupId);
	}

	if (!value) hasEmbeddedOptions ? (value = {}) : (value = []);

	const editArray = (passedInValue: MultiSelectValues, code: string, label: string) => {
		if (passedInValue?.find((item: { value: string }) => item.value === code)) {
			passedInValue.splice(
				passedInValue.findIndex((item: { value: string }) => item.value === code),
				1
			);
		} else passedInValue?.push({ value: code, label: label });
		value = value;
	};

	const selectOption = (option: DropDownOption) => {
		if (hasEmbeddedOptions) selectParentOfEmbedded(option);
		else {
			let code = option?.code;
			let label = option?.value;
			if (Array.isArray(value)) editArray(value, code, label);
		}
	};

	const selectParentOfEmbedded = (option: DropDownOption) => {
		let code = option?.code;
		if (!Array.isArray(value) && value && !value[code]) value[code] = [];
		idOfActiveEmbeddedList = code;
	};

	const selectEmbeddedOption = (option: DropDownOption) => {
		if (idOfActiveEmbeddedList) {
			let code = option?.code;
			let label = option?.value;
			if (value && !Array.isArray(value)) {
				let arrayOfOptions = value[idOfActiveEmbeddedList];
				editArray(arrayOfOptions, code, label);
			}
		}
	};

	let selectedItems: Option[] | undefined;

	const getSelectedItems = () => {
		if (Array.isArray(value)) {
			selectedItems = value.filter((item) => item.value);
		} else if (typeof value === 'object') {
			let parentKeys = Object.keys(value);
			selectedItems = parentKeys
				.filter((key) => !Array.isArray(value) && value?.[key]?.length)
				.map((key) => {
					return { value: key, label: options.find((option) => option.code === key)?.value };
				});
		}
	};

	getSelectedItems();

	$: value, getSelectedItems();
	$: idOfActiveEmbeddedList, getSelectedItems();

	const updateItems = () => {
		idOfActiveEmbeddedList ? (idOfActiveEmbeddedList = undefined) : popper.toggle();
	};

	const closeParent = (parentItem: Option) => {
		if (Array.isArray(value)) {
			value = value.filter((item) => item.value !== parentItem.value);
		} else if (value) {
			delete value[parentItem.value];
			value = value;
		}
	};
	const closeEmbedded = (parentItem: Option, embeddedItem: Option) => {
		if (!Array.isArray(value) && value) {
			value[parentItem.value] = value[parentItem.value].filter(
				(item: Option) => item.value !== embeddedItem.value
			);
		}
	};

	const handleNoneSelected = async (e: { detail: { value: boolean } }) => {
		noneSelected = e.detail.value;
		pnLabel = undefined;

		if (field.pn) {
			dispatch('handlePn', {
				field: field,
				value: noneSelected
			});
		} else {
			dispatch('handleNa', {
				field: field,
				value: noneSelected
			});
		}

		if (noneSelected) {
			storedValues = JSON.stringify(value);
			value = [];
		} else {
			if (storedValues) {
				value = JSON.parse(storedValues);
			}
		}
	};
</script>

<Popper
	value={field.title ? field?.title + (pnLabel ? ': ' + pnLabel : '') : ''}
	type={field?.type}
	bind:this={popper}
	modal
	toggleIcon={{
		open: 'add',
		closed: 'add',
		color: 'var(--primary)',
		style: 'border-left:var(--1pxBorder);'
	}}
	on:noneSelected={(e) => handleNoneSelected(e)}
>
	<MultiSelectList
		bind:idOfActiveEmbeddedList
		{options}
		{field}
		{selectedItems}
		{updateItems}
		{embeddedOptions}
		{value}
		on:close={() => popper.toggle()}
		on:selectEmbedded={(e) => selectEmbeddedOption(e.detail.option)}
		on:selectOption={(e) => selectOption(e.detail.option)}
	/>
</Popper>

{#if selectedItems?.length}
	<div class="selectedItemsList">
		{#each selectedItems as selected}
			{@const embeddedSelections = !Array.isArray(value) ? value?.[selected?.value] : undefined}
			<div class="selectedItem parent">
				<div class="label">
					{selected.label}
				</div>
				<button class="material-symbols-outlined close" on:click={() => closeParent(selected)}>
					close
				</button>
			</div>
			{#if embeddedSelections}
				<div class="embeddedSelections embedded">
					{#each embeddedSelections as embeddedSelection}
						<div class="selectedItem">
							<div class="label">
								{embeddedSelection.label}
							</div>
							<button
								class="material-symbols-outlined close"
								on:click={() => closeEmbedded(selected, embeddedSelection)}
							>
								close
							</button>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.selectedItemsList {
		border-top: var(--1pxBorder);
	}

	.selectedItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 5px 5px 16px;
	}

	.selectedItem:nth-child(even) {
		background: var(--light4);
	}

	.close {
		color: var(--dark3);
		padding: 0;
	}

	.embeddedSelections {
		padding: 0 0 0 20px;
		border-top: var(--1pxBorder);
	}
</style>
