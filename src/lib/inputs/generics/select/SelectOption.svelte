<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let selected: boolean;
	export let option: { code?: string; value?: string } | undefined;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click|stopPropagation={() => dispatch('select', { option: option })}
	class:selected
	class="option"
>
	{option?.value}
</button>

<style>
	.option {
		width: 100%;
		min-height: 40px;
		padding: 10px;
		background: var(--light1);
		font-weight: var(--weightRegular);
		line-height: 1.6;
		text-align: left;
		padding-left: 16px;
	}

	.option:not(:last-child) {
		border-bottom: var(--1pxBorder);
	}

	.option:nth-child(even):not(.selected) {
		background: var(--light4);
	}

	.selected {
		background: var(--secondary);
		color: var(--light1);
		font-weight: 500;
	}
</style>
