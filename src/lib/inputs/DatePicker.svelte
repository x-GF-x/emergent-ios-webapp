<script lang="ts">
	import Numpad from './generics/Numpad.svelte';
	import Popper from './generics/Popper.svelte';

	export let value: number | undefined;
	export let props: InputProps = {
		suggest: '10/31/1995',
		label: 'Test Label'
	};
	export let field: Field = undefined;
	field = field;

	let popper: Popper;
	let numpad: Numpad;

	const update = () => {
		popper.toggle();
	};
</script>

<Popper bind:this={popper} value={value ? value : undefined} on:open={numpad.focusInput}>
	<Numpad bind:this={numpad} bind:value type="date" on:update={update} {props} />
</Popper>
