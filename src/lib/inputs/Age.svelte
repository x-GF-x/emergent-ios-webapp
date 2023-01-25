<script lang="ts">
	export let value: number | undefined;
</script>

<input type="number" bind:value />

<style>
	input {
		max-width: 150px;
	}
</style>
