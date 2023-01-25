<script lang="ts">
	export let value: string | undefined;
	export let field: Field = undefined;
	field = field;
</script>

<input type="text" bind:value />

<style>
	input {
		height: 35px;
		border: none;
		font-size: 12pt;
		margin-left: -2px;
		caret-color: var(--primary);
		background: var(--light2);
	}

	input:focus-visible {
		outline: none;
	}
</style>
