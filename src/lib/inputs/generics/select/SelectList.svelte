<script lang="ts">
	import SelectHeader from '$lib/inputs/generics/select/SelectHeader.svelte';
	import SelectOption from '$lib/inputs/generics/select/SelectOption.svelte';

	let searchValue = '';
	export let pnOptions: PnOption[] | undefined = undefined;
	export let options: Array<DropDownOption | ScoreOption | PnOption | QCMapping> = [];
	export let field: Field | SubField | undefined = undefined;
	export let props: InputProps = undefined;
	export let value: SingleSelectValue | ScoreObject = undefined;

	export let selectOption: (option: ScoreObject) => void;
</script>

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

<style>
</style>
