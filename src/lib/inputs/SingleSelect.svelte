<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';
	import { ems_drugs } from '$lib/resource_file/lookups/ems_drugs';
	import { createEventDispatcher } from 'svelte';
	import { quickchartMapping } from '$lib/resource_file/ui/ui_quickchart_mapping';

	const dispatch = createEventDispatcher();

	export let value: SingleSelectValue | ScoreObject = undefined;
	export let props: InputProps = undefined;
	export let field: Field | SubField | undefined = undefined;
	export let pnOptions: PnOption[] | undefined = undefined;
	export let popper: Popper | undefined = undefined;
	export let hidePopperButton = false;

	let fieldLookupId = field?.key;
	let options: Array<DropDownOption | ScoreOption | PnOption | QCMapping> = [];
	let searchValue = '';

	export const toggle = () => {
		popper?.toggle();
	};

	let nonStandardLookups = ['eMedications03', 'eSituation11'];
	let buildDataFromOptions = field && 'data' in field && field.data;

	const buildOptions = () => {
		if (
			fieldLookupId &&
			!pnOptions &&
			!nonStandardLookups.includes(fieldLookupId) &&
			!buildDataFromOptions
		)
			options = fieldOptions.filter(
				(option) =>
					option.type === fieldLookupId &&
					(!field ||
						!('available_units' in field) ||
						(field && field.available_units?.includes(option.code))) &&
					(!field ||
						!('available_routes' in field) ||
						(field && field.available_routes?.includes(option.code)))
			);
	};

	//Reactive for when drugs are changed
	$: field, buildOptions();

	const drugOptions = () => {
		options = ems_drugs.map((item) => {
			return {
				code: item.drug_id,
				id: item.id,
				type: 'drug',
				value: item.name
			};
		});
	};

	const scoreCardOptions = () => {
		if (field && 'data' in field && field.data) {
			options = field.data;
			if (options)
				options.forEach((option) => {
					if ('description' in option) option.value = option.description;
				});
		}
	};

	const clinicalImpressionOptions = () => {
		options = quickchartMapping.map((item) => {
			item.value = item.code_description;
			item.code = item.qc_key;
			return item;
		});
	};

	if (!pnOptions) {
		if (fieldLookupId === 'eSituation11') {
			clinicalImpressionOptions();
		} else if (fieldLookupId === 'eMedications03') {
			drugOptions();
		} else {
			scoreCardOptions();
		}
	}

	const selectOption = (option: ScoreObject) => {
		const code = option?.code;
		if (value === code) {
			value = undefined;
		} else {
			if (option.operator) {
				value = option;
			} else {
				value = code;
			}
			popper?.toggle();
		}
		if (pnOptions) {
			dispatch('setPn', { value: value });
		}

		if (fieldLookupId === 'eMedications03') {
			dispatch('changeDrug', { value: value });
		}
	};

	$: {
		if (pnOptions) value = undefined;
	}
</script>

{#if Array.isArray(options) || Array.isArray(pnOptions)}
	<Popper
		bind:this={popper}
		value={options?.find((item) => item.code === value)?.value
			? options.find((item) => item.code === value)?.value
			: typeof value !== 'string' && value?.value
			? value.value
			: value}
		{props}
		{hidePopperButton}
		type="singleSelect"
		toggleIcon={{ open: 'expand_less', closed: 'expand_more' }}
	>
		<SelectHeader bind:searchValue title={pnOptions ? 'Pertinent Negatives' : field?.title} {props}>
			{@const relevantOptions = pnOptions
				? pnOptions.map((item) => {
						item.value = item.description;
						return item;
				  })
				: options}
			<div class="options">
				{#each relevantOptions.filter((option) => option.value && option.value
							.toLowerCase()
							.includes(searchValue.toLowerCase())) as option}
					<SelectOption
						{option}
						selected={value === option.code}
						on:select={(e) => selectOption(e.detail.option)}
					/>
				{/each}
			</div>
		</SelectHeader>
	</Popper>
{/if}

<style>
</style>
