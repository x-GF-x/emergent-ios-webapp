<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let selected: boolean;
	export let option: { code: string; value?: string };
	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('select', { option: option })} class:selected class="option">
	{option.value}
</button>

<style>
	.option {
		width: 100%;
		min-height: 40px;
		padding: 5px 0;
		background: var(--light1);
		font-weight: 300;
		line-height: 1.6;
		text-align: left;
		padding-left: 16px;
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
