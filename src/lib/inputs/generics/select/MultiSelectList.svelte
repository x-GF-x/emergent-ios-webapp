<script lang="ts">
	import SelectHeader from '$lib/inputs/generics/select/SelectHeader.svelte';
	import SelectOption from '$lib/inputs/generics/select/SelectOption.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let options: Array<undefined | DropDownOption> = [];
	export let field: Field | SubField | undefined = undefined;
	export let value: MultiSelectValues | EmbeddedMultiSelectValues | undefined = undefined;
	export let embeddedOptions: DropDownOption[] = [];
	export let idOfActiveEmbeddedList: string | undefined = undefined;
	export let selectedItems: Option[] | undefined = undefined;
	export let updateItems: () => void;

	let searchValue = '';
</script>

<SelectHeader
	bind:searchValue
	type="multiSelect"
	title={idOfActiveEmbeddedList
		? options.find((item) => item?.code === idOfActiveEmbeddedList)?.value
		: field?.title}
	on:close={() => {
		idOfActiveEmbeddedList = undefined;
		dispatch('close');
	}}
>
	<div class="options">
		{#each (!idOfActiveEmbeddedList ? options : embeddedOptions).filter((option) => option?.value
				.toLowerCase()
				.includes(searchValue.toLowerCase())) as option}
			{@const selected = (idOfActiveEmbeddedList && value && !Array.isArray(value)
				? value[idOfActiveEmbeddedList]
				: selectedItems
			)?.find((item) => item.value === option?.code)
				? true
				: false}
			<SelectOption
				{option}
				{selected}
				on:select={(e) =>
					idOfActiveEmbeddedList && embeddedOptions
						? dispatch('selectEmbedded', { option: e.detail.option })
						: dispatch('selectOption', { option: e.detail.option })}
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
		border-top: var(--1pxBorder);
		position: sticky;
		bottom: 0;
	}

	.numberOfSelections {
		font-weight: var(--weightSemiBold);
	}

	.updateItems {
		color: var(--light1);
		background: var(--primary);
		padding: 12px 10px;
		border-radius: 4px;
	}
</style>
