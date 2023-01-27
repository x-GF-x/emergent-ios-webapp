<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let field: Field = undefined;
	export let value: MultiSelectValues | EmbeddedMultiSelectValues | undefined = field?.embedded
		? {}
		: [];

	let fieldLookupId = field?.key;
	let options: DropDownOption[] = fieldOptions.filter((option) => option.type === fieldLookupId);
	let idOfActiveEmbeddedList: string | undefined = undefined;
	let searchValue = '';
	let popper: Popper;

	let hasEmbeddedOptions = field?.embedded ? true : false;
	let embeddedLookupId: string | undefined = undefined;
	let embeddedOptions: DropDownOption[] = [];

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
		console.log(parentItem);
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
</script>

<Popper
	value={field?.title}
	type={field?.type}
	bind:this={popper}
	modal
	toggleIcon={{
		open: 'add',
		closed: 'add',
		color: 'var(--primary)',
		style: 'border-left:1px solid var(--border);'
	}}
>
	<SelectHeader
		bind:searchValue
		type="multiSelect"
		title={idOfActiveEmbeddedList
			? options.find((item) => item.code === idOfActiveEmbeddedList)?.value
			: field?.title}
		on:close={() => {
			idOfActiveEmbeddedList = undefined;
			popper.toggle();
		}}
	>
		<div class="options">
			{#each (!idOfActiveEmbeddedList ? options : embeddedOptions).filter((option) => option.value
					.toLowerCase()
					.includes(searchValue.toLowerCase())) as option}
				{@const selected = (idOfActiveEmbeddedList && value && !Array.isArray(value)
					? value[idOfActiveEmbeddedList]
					: selectedItems
				)?.find((item) => item.value === option.code)
					? true
					: false}
				<SelectOption
					{option}
					{selected}
					on:select={(e) =>
						idOfActiveEmbeddedList && embeddedOptions
							? selectEmbeddedOption(e.detail.option)
							: selectOption(e.detail.option)}
				/>
			{/each}
		</div>
		<div class="footer">
			<div class="numberOfSelections">
				{(idOfActiveEmbeddedList && !Array.isArray(value)
					? value?.[idOfActiveEmbeddedList]
					: selectedItems
				)?.length} Selections
			</div>
			<button on:click={updateItems} class="updateItems">Update Items</button>
		</div>
	</SelectHeader>
</Popper>

{#if selectedItems?.length}
	<div class="selectedItemsList">
		{#each selectedItems as selected}
			{@const embeddedSelections = !Array.isArray(value) ? value?.[selected?.value] : undefined}
			<div class="selectedItem parent">
				<div class="label">
					{selected.label}
				</div>
				<button class="material-icons close" on:click={() => closeParent(selected)}> close </button>
			</div>
			{#if embeddedSelections}
				<div class="embeddedSelections embedded">
					{#each embeddedSelections as embeddedSelection}
						<div class="selectedItem">
							<div class="label">
								{embeddedSelection.label}
							</div>
							<button
								class="material-icons close"
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
	.footer {
		display: flex;
		justify-content: space-between;
		min-height: 60px;
		background: var(--light1);
		align-items: center;
		padding: 0 10px;
		border-top: 1px solid var(--border);
		position: sticky;
		bottom: 0;
	}

	.numberOfSelections {
		font-weight: 400;
	}

	.updateItems {
		color: var(--light1);
		background: var(--primary);
		padding: 12px 10px;
		border-radius: 4px;
	}

	.selectedItemsList {
		border-top: 1px solid var(--border);
		margin-left: -10px;
		margin-right: -10px;
		padding: 0 10px;
	}

	.selectedItem {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 0;
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
		border-top: 1px solid var(--border);
	}
</style>
