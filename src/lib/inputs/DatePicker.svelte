<script lang="ts">
	import Numpad from './generics/Numpad.svelte';
	import Popper from './generics/Popper.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: string | undefined;
	export let field: Field;
	export let disabled = false;
	export let fromModal = false;
	fromModal;
	export let disabledValue: string | undefined = undefined;

	let popper: Popper;
	let numpad: Numpad;

	const update = (e: { detail: { value: string | undefined } }) => {
		value = e.detail.value;
		dispatch('setDate', { id: field?.id, value: value });
		popper.toggle();
	};
</script>

<Popper
	bind:this={popper}
	toggleIcon={{ open: 'unfold_less', closed: 'unfold_more' }}
	value={value ? value : undefined}
	on:open={numpad.focusInput}
	{disabled}
	{field}>
	<Numpad
		bind:this={numpad}
		value={disabledValue ? disabledValue : undefined}
		type="date"
		on:update={update}
		{field} />
</Popper>
