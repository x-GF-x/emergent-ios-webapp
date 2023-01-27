<script lang="ts">
	import Popper from './generics/Popper.svelte';
	import SelectHeader from './generics/SelectHeader.svelte';
	import SelectOption from './generics/SelectOption.svelte';
	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let value: string | undefined = undefined;
	export let props: InputProps = undefined;
	export let field: Field = undefined;

	let fieldLookupId = field?.key;
	let options = fieldOptions.filter((option) => option.type === fieldLookupId);
	let popper: Popper;
	let searchValue = '';

	const selectOption = (option: { code: string }) => {
		const code = option?.code;
		if (value === code) {
			value = undefined;
		} else {
			value = code;
			popper.toggle();
		}
	};
</script>

<Popper
	bind:this={popper}
	value={options?.find((item) => item.code === value)?.value
		? options.find((item) => item.code === value)?.value
		: value}
	{props}
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

<style>
</style>
