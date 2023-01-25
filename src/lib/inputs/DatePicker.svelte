<script lang="ts">
	export let value: Date | undefined;
</script>

<input type="date" bind:value />

<style>
	input {
		max-width: 150px;
	}
</style>
