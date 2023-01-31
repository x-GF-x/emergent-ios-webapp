<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let value: any = undefined;
	export let props: InputProps = undefined;
	export let field: Field | SubField = undefined;

	let fieldLookupId = field?.key;
	let options: Array<DropDownOption | ScoreOption> = [];
	let popper: Popper;
	let searchValue = '';

	if (field && 'data' in field && field.data) {
		options = field.data;
		if (options)
			options.forEach((option) => {
				if ('description' in option) option.value = option.description;
			});
	} else {
		options = fieldOptions.filter((option) => option.type === fieldLookupId);
	}

	const selectOption = (option: { code: string; operator?: string }) => {
		const code = option?.code;
		if (value === code) {
			value = undefined;
		} else {
			if (option.operator) {
				value = option;
			} else {
				value = code;
			}
			popper.toggle();
		}
	};
</script>

{#if Array.isArray(options)}
	<Popper
		bind:this={popper}
		value={options?.find((item) => item.code === value)?.value
			? options.find((item) => item.code === value)?.value
			: value?.value
			? value.value
			: value}
		{props}
		type="singleSelect"
		toggleIcon={{ open: 'expand_less', closed: 'expand_more' }}
	>
		<SelectHeader bind:searchValue title={field?.title} {props}>
			<div class="options">
				{#each options.filter((option) => option.value
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
