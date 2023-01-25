<script lang="ts">
	import MultiSelect from 'svelte-multiselect';
	export let selected: string[] = [];
	export let options = ['test', 'test2'];
	export let value: any;
	export let field: Field = undefined;
	field = field;

	value = value;
</script>

<MultiSelect bind:selected {options} />

<!-- <style>
</style> -->
