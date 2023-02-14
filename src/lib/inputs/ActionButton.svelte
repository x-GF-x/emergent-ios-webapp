<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let field: Field;
	export let disabled = false;

	const dispatch = createEventDispatcher();
</script>

<button
	{disabled}
	class="actionButton"
	on:click={() => dispatch('actionButton', { action: field.action })}
>
	{field.title}
</button>

<style>
	.actionButton {
		color: var(--primary);
		height: 100%;
		width: 100%;
		border: none;
		text-align: end;
		font-weight: var(--weightBold);
	}
</style>
