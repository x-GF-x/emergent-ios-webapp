<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let option: { code: string; value: string };
	export let value: string | undefined;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('select', { code: option.code })}
	class:selected={option.code === value}
	class="option"
>
	{option.value}
</button>

<style>
	.option {
		width: 100%;
		min-height: 40px;
		background: var(--light1);
		font-weight: 300;
	}

	.option:not(:last-child) {
		border-bottom: 1px solid var(--border);
	}

	.option:nth-child(even):not(.selected) {
		background: var(--light4);
	}

	.selected {
		background: var(--secondary);
		color: var(--light1);
	}
</style>
