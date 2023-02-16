<script lang="ts">
	import SingleSelect from './SingleSelect.svelte';
	export let value: string | undefined = '';
	export let field: Field;

	let isOpen = false;

	$: {
		if (!value) {
			if (isOpen) popper.toggle();
			isOpen = false;
		}
	}

	export const openPopper = () => {
		if (!isOpen) {
			popper.toggle();
			isOpen = true;
		}
	};

	export const closePopper = () => {
		isOpen = false;
	};

	let popper: SingleSelect;
</script>

<SingleSelect
	bind:this={popper}
	hidePopperButton
	bind:value
	searchValue={value}
	passedInOptions={[{ code: 'Chicago', description: 'Chicago' }]}
	{field}
	on:selectOption={closePopper} />
