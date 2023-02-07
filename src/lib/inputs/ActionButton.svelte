<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let field: Field;

	const dispatch = createEventDispatcher();
</script>

<button class="actionButton" on:click={() => dispatch('button', { action: field.action })}>
	{field.title}
</button>

<style>
	.actionButton {
		color: var(--primary);
		height: 100%;
		border: none;
		text-align: end;
		font-weight: 600;
		font-size: 14px;
	}
</style>
