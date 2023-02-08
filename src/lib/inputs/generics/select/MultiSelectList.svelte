<script lang="ts">
	import SelectHeader from '$lib/inputs/generics/select/SelectHeader.svelte';
	import SelectOption from '$lib/inputs/generics/select/SelectOption.svelte';
	import type Popper from '../Popper.svelte';

	let searchValue = '';
	export let options: DropDownOption[] = [];
	export let field: Field | SubField | undefined = undefined;
	export let value: MultiSelectValues | EmbeddedMultiSelectValues | undefined;

	export let idOfActiveEmbeddedList: string | undefined = undefined;
	export let popper: Popper;
	export let embeddedOptions: DropDownOption[] = [];
	export let selectedItems: Option[] | undefined;
	export let selectEmbeddedOption: (option: DropDownOption) => void;
	export let updateItems: () => void;

	export let selectOption: (option: DropDownOption) => void;
</script>

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
