<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	export let selected: string[] = [];
	export let options = ['test', 'test2'];
</script>

<MultiSelect bind:selected {options} />

<!-- <style>
</style> -->
