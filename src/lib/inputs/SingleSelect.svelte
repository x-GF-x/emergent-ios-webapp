<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import {
		clinical_impression_options,
		drug_options,
		score_card_options,
		standard_options
	} from '$lib/fn/build_select_options';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: SingleSelectValue | ScoreObject = undefined;
	export let props: InputProps = undefined;
	export let field: Field | SubField | undefined = undefined;
	export let pnOptions: PnOption[] | undefined = undefined;
	export let popper: Popper | undefined = undefined;
	export let hidePopperButton = false;

	export const toggle = () => {
		popper?.toggle();
	};

	let fieldLookupId = field?.key;
	let options: Array<DropDownOption | ScoreOption | PnOption | QCMapping> = [];
	let searchValue = '';
	let nonStandardLookups = ['eMedications03', 'eSituation11'];
	let buildDataFromOptions = field && 'data' in field && field.data;
	const standardOptions =
		fieldLookupId &&
		!pnOptions &&
		!nonStandardLookups.includes(fieldLookupId) &&
		!buildDataFromOptions;

	const buildOptions = () => {
		if (standardOptions) options = standard_options(field);
	};
	//Reactive for when drugs are changed
	$: field, buildOptions();

	if (!pnOptions) {
		if (fieldLookupId === 'eSituation11') options = clinical_impression_options();
		else if (fieldLookupId === 'eMedications03') options = drug_options();
		else options = score_card_options(field);
	}

	const selectOption = (option: ScoreObject) => {
		const code = option?.code;

		if (value === code) value = undefined;
		else {
			if (option.operator) value = option;
			else value = code;
			popper?.toggle();
		}

		if (pnOptions) dispatch('setPn', { value: value });
		if (fieldLookupId === 'eMedications03') dispatch('changeDrug', { value: value });
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
