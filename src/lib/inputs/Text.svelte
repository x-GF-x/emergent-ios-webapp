<script lang="ts">
	export let value: string | undefined;
</script>

<input type="text" bind:value />

<style>
	input {
		height: 35px;
		border: none;
		font-size: 12pt;
		margin-left: -2px;
		caret-color: var(--primary);
	}

	input:focus-visible {
		outline: none;
	}
</style>
