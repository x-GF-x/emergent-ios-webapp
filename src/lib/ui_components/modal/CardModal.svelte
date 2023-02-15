<script lang="ts">
	import Card from '../Card.svelte';
	import Modal from './Modal.svelte';

	export let value: {
		[key: string]: FieldValues;
	};
	export let data: CardJson;
	export let chart: QuickChartObject | undefined = undefined;
	export let pnNvStorage: ActionItem['fields'] | undefined = undefined;

	//We do not want the "remove note" button when adding a new note
	if (value.card_id === 'narrative') {
		data.rows = [data.rows[0]];
	}
</script>

<Modal on:backdropClick on:updateModal>
	<Card collapsible={false} bind:value bind:pnNvStorage {data} {chart} fromModal />
</Modal>
