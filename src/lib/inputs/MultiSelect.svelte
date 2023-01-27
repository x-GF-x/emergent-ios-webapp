<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let field: Field = undefined;
	export let value: MultiSelectValue | EmbeddedMultiSelectValues | undefined = field?.embedded
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

	const editArray = (passedInValue: MultiSelectValue, code: string, label: string) => {
		if (passedInValue?.find((item: { value: string }) => item.value === code)) {
			passedInValue.splice(
				passedInValue.findIndex((item: { value: string }) => item.value === code),
				1
			);
		} else {
			passedInValue?.push({ value: code, label: label });
		}
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

	const updateItems = () => {
		idOfActiveEmbeddedList ? (idOfActiveEmbeddedList = undefined) : popper.toggle();
	};
</script>

<Popper
	value={field?.title}
	bind:this={popper}
	toggleIcon={{ open: 'expand_less', closed: 'expand_more' }}
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
				{@const selected = Array.isArray(value)
					? value.find((item) => item.value === option.code)
						? true
						: false
					: idOfActiveEmbeddedList
					? value?.[idOfActiveEmbeddedList]?.find((item) => item.value === option.code)
						? true
						: false
					: value && value[option.code]?.length
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
			<div class="numberOfSelections"># Selections</div>
			<button on:click={updateItems} class="updateItems">Update Items</button>
		</div>
	</SelectHeader>
</Popper>

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
</style>
