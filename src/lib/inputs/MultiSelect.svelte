<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let value: (MultiSelectValue & EmbeddedMultiSelectValues) | undefined = undefined;
	export let props: InputProps = undefined;
	export let field: Field = undefined;

	let fieldLookupId = field?.key;
	let options: DropDownOption[] = fieldOptions.filter((option) => option.type === fieldLookupId);
	let idOfActiveEmbeddedList: string | undefined = undefined;
	let popper: Popper;
	let searchValue = '';

	let hasEmbeddedOptions = field?.embedded ? true : false;
	let embeddedLookupId: string | undefined = undefined;
	let embeddedOptions: DropDownOption[] = [];

	if (hasEmbeddedOptions) {
		embeddedLookupId = field?.embedded?.key;
		embeddedOptions = fieldOptions.filter((option) => option.type === embeddedLookupId);
	} else {
	}

	if (!value) value = [];

	const editArray = (value: any, code: string, label: string) => {
		if (typeof value === 'object' && idOfActiveEmbeddedList) {
			value = value[idOfActiveEmbeddedList];
		}
		if (Array.isArray(value)) {
			if (value?.find((item: { value: string }) => item.value === code)) {
				value.splice(
					value.findIndex((item: { value: string }) => item.value === code),
					1
				);
			} else {
				value?.push({ value: code, label: label });
			}
		} else console.log('err', value);
	};

	const selectOption = (option: DropDownOption) => {
		if (hasEmbeddedOptions) selectParentOfEmbedded(option);
		else {
			let code = option?.code;
			let label = option?.value;
			editArray(value, code, label);
			value = value;
		}
	};

	const selectParentOfEmbedded = (option: DropDownOption) => {
		let code = option?.code;
		idOfActiveEmbeddedList = code;
		if (value?.find((item) => idOfActiveEmbeddedList && idOfActiveEmbeddedList in item)) {
			value.filter((item) => idOfActiveEmbeddedList && !(idOfActiveEmbeddedList in item));
		} else {
			let newObject: { [key: string]: { value: string }[] } = {};
			newObject[code] = [];
			value?.push(newObject);
		}
		value = value;
	};

	const selectEmbeddedOption = (option: DropDownOption) => {
		if (idOfActiveEmbeddedList) {
			let code = option?.code;
			let label = option?.value;
			let parentObject = value?.filter(
				(item) => idOfActiveEmbeddedList && idOfActiveEmbeddedList in item
			)?.[0];
			if (parentObject) {
				editArray(parentObject, code, label);
				value = value;
			}
		}
	};

	const findEmbeddedField = (embeddedArray: { value: string }[], code: string) => {
		if (embeddedArray?.find((subItem: { value?: string }) => subItem.value === code)) {
			return true;
		} else {
			return false;
		}
	};

	const checkSelected = (code: string) => {
		if (!hasEmbeddedOptions) return value?.find((item) => item.value === code) ? true : false;
		else {
			if (idOfActiveEmbeddedList) {
				let parentObject = value?.filter(
					(item) => idOfActiveEmbeddedList && idOfActiveEmbeddedList in item && !('value' in item)
				)?.[0];
				if (parentObject && !('value' in parentObject)) {
					return findEmbeddedField(parentObject[idOfActiveEmbeddedList], code) ? true : false;
				} else return false;
			} else
				return value?.find((item) => code in item && !('value' in item) && item?.[code]?.[0])
					? true
					: false;
		}
	};
</script>

<Popper
	bind:this={popper}
	value={value
		?.map((item) => item.label)
		.toString()
		.replaceAll(',', ', ')}
	{props}
	toggleIcon={{ open: 'expand_less', closed: 'expand_more' }}
>
	<button on:click={() => (idOfActiveEmbeddedList = undefined)}>Dev</button>
	<SelectHeader bind:searchValue {field} {props}>
		<div class="options">
			{#key value}
				{#each !idOfActiveEmbeddedList ? options : embeddedOptions.filter((option) => option.value
								.toLowerCase()
								.includes(searchValue.toLowerCase())) as option}
					{@const selected = checkSelected(option.code)}
					<SelectOption
						{option}
						{selected}
						on:select={(e) =>
							idOfActiveEmbeddedList && embeddedOptions
								? selectEmbeddedOption(e.detail.option)
								: selectOption(e.detail.option)}
					/>
				{/each}
			{/key}
		</div>
	</SelectHeader>
</Popper>

<style>
</style>
