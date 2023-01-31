<script lang="ts">
	import Numpad from './generics/Numpad.svelte';
	import Popper from './generics/Popper.svelte';

	export let value: number | undefined;
	export let field: Field = undefined;
	field = field;

	let popper: Popper;
	let numpad: Numpad;

	const update = () => {
		popper.toggle();
	};
</script>

<Popper
	bind:this={popper}
	value={value ? value : undefined}
	on:open={numpad.focusInput}
	toggleIcon={{ open: 'unfold_less', closed: 'unfold_more' }}
>
	<Numpad bind:this={numpad} bind:value type="numeric" on:update={update} {field} />
</Popper>
