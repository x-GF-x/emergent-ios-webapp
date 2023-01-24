<script lang="ts">
	export let options = [{ value: '0', label: 'One' }];
</script>

<select>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>

<style>
	select {
		font-size: 12pt;
		padding: 4px;
		margin: 4px;
		border: none;
	}
</style>
