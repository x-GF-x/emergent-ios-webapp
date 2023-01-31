<script lang="ts">
	import Numpad from './generics/Numpad.svelte';
	import Popper from './generics/Popper.svelte';

	export let value: string | undefined;

	export let field: Field = undefined;

	let popper: Popper;
	let numpad: Numpad;

	const update = () => {
		popper.toggle();
	};
</script>

<Popper bind:this={popper} value={value ? value : undefined} on:open={numpad.focusInput}>
	<Numpad bind:this={numpad} bind:value type="date" on:update={update} {field} />
</Popper>
