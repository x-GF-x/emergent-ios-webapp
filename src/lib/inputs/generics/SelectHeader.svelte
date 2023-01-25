<script lang="ts">
	import Search from '../Search.svelte';
	export let field: Field;
	export let props: InputProps;
	export let searchValue: string;
</script>

<div class="dropdown">
	<div class="dropdownLabel">
		{field?.title ? field.title : props?.dropdownLabel}
	</div>
	<Search bind:searchValue />
	<slot />
</div>

<style>
	.dropdown {
		border: 1px solid var(--border);
	}

	.dropdownLabel {
		display: flex;
		justify-content: center;
		padding: 10px;
		background: var(--dark2);
		font-weight: 500;
		border-bottom: 1px solid var(--border);
	}
</style>
