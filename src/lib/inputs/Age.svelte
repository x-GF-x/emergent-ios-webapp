<script lang="ts">
	export let value: number | undefined;
	export let field: Field = undefined;
	field = field;
</script>

<input type="number" bind:value />

<style>
	input {
		max-width: 150px;
	}
</style>
