<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectList from './generics/select/SelectList.svelte';

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
	export let passedInOptions: PnOption[] | undefined = undefined;
	export let popper: Popper | undefined = undefined;
	export let hidePopperButton = false;
	export let searchValue = '';

	export const toggle = () => {
		popper?.toggle();
	};

	let fieldLookupId = field?.key;
	let options: Array<DropDownOption | ScoreOption | PnOption | QCMapping> = [];
	let nonStandardLookups = ['eMedications03', 'eSituation11'];
	let buildDataFromOptions = field && 'data' in field && field.data;

	const standardOptions =
		fieldLookupId &&
		!passedInOptions &&
		!nonStandardLookups.includes(fieldLookupId) &&
		!buildDataFromOptions;

	const buildOptions = () => {
		if (standardOptions) options = standard_options(field);
	};
	//Reactive for when drugs are changed
	$: field, buildOptions();

	if (!passedInOptions) {
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

		if (passedInOptions) dispatch('setPn', { value: value });
		if (fieldLookupId === 'eMedications03') dispatch('changeDrug', { value: value });
	};

	$: {
		if (passedInOptions) value = undefined;
	}
</script>

{#if Array.isArray(options) || Array.isArray(passedInOptions)}
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
		<SelectList {passedInOptions} {options} {field} {props} {selectOption} {value} {searchValue} />
	</Popper>
{/if}
