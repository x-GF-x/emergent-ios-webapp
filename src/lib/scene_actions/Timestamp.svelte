<script lang="ts">
	import CardModal from '$lib/ui_components/modal/CardModal.svelte';

	export let value: DataStorage;
	export let timestampLocation: { section: 'actions' | 'notes'; index: number } | undefined;

	let newTimestamp = { date: '', time: '' };

	const handleUpdate = () => {
		let convertedDate = new Date(
			newTimestamp.date.substring(6, 10) +
				'-' +
				newTimestamp.date.substring(0, 5).replaceAll('/', '-') +
				'T' +
				newTimestamp.time
		).toLocaleString();
		console.log(convertedDate);
		if (timestampLocation)
			value[timestampLocation.section][timestampLocation.index].last_modified = convertedDate;
		timestampLocation = undefined;
	};

	let timestampData: CardJson = {
		properties: { title: 'Timestamp' },
		rows: [
			{
				fields: [
					{
						id: 'date',
						type: 'date',
						style: 'date',
						title: 'Date',
						width: 'half'
					},
					{
						id: 'time',
						style: 'time',
						title: 'Time',
						type: 'date',
						width: 'half'
					}
				]
			}
		]
	};
</script>

<div class="timestampContainer">
	<CardModal
		bind:value={newTimestamp}
		data={timestampData}
		on:updateModal={handleUpdate}
		on:backdropClick={() => (timestampLocation = undefined)} />
</div>

<style>
	.timestampContainer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
</style>
