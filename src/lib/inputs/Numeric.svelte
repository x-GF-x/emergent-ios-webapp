<script lang="ts">
	import Numpad from './generics/Numpad.svelte';
	import Popper from './generics/Popper.svelte';

	export let value: FieldValues;
	export let field: Field;
	export let disabled = false;
	export let fromModal = false;
	fromModal;
	export let disabledValue: string | undefined = undefined;

	let popper: Popper;
	let numpad: Numpad;

	const update = (e: { detail: { value: number | undefined } }) => {
		value = e.detail.value;
		popper.toggle();
	};
</script>

<Popper
	bind:this={popper}
	value={disabledValue ? disabledValue : value ? value : undefined}
	on:open={numpad.focusInput}
	toggleIcon={{ open: 'unfold_less', closed: 'unfold_more' }}
	{disabled}
	{field}>
	<Numpad bind:this={numpad} {value} type="numeric" on:update={update} {field} />
</Popper>
