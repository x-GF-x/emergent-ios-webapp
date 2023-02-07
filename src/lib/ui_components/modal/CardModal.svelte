<script lang="ts">
	import Card from '../Card.svelte';
	import Modal from './Modal.svelte';

	export let value: {
		[key: string]: FieldValues;
	};
	export let data: CardJson;
	export let chart: QuickChartObject | undefined = undefined;
</script>

<Modal on:backdropClick on:updateModal>
	<Card collapsible={false} bind:value {data} {chart} fromModal on:deleteNote />
</Modal>
