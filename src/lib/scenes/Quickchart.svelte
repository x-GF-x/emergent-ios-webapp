<script lang="ts">
	import Modal from '$lib/ui_components/Modal.svelte';
	import Card from '$lib/ui_components/Card.svelte';

	import { quickchartSections } from '$lib/resource_file/ui/ui_quickchart_sections';
	import { quickcharts } from '$lib/resource_file/ui/ui_quickcharts';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let selectedTab: Tab;
	export let value: DataStorage;

	let cardValue: ActionItem = { card_id: '', fields: {} };

	let filteredCharts = quickcharts.filter(
		(chart) => chart.key === selectedTab.id && chart.card !== 'violation'
	);

	let activeCardId = '';

	let sections = [...new Set(filteredCharts.map((item) => item.section))];

	const handleChartButton = (chart: QuickChartObject) => {
		console.log(chart);
		activeCardId = chart.card;
		cardValue = { card_id: activeCardId, fields: {} };
	};

	const saveModal = () => {
		cardValue.last_modified = new Date().toString();
		cardValue.created = new Date().toString();
		value.actions = [...value.actions, cardValue];
		clearActiveCard();
		console.log(value);
	};

	const clearActiveCard = () => {
		activeCardId = '';
	};
</script>

<div class="quickchart">
	{#each sections as section}
		{@const title = quickchartSections.find((item) => item.id === section)?.title}
		{@const chartsInSection = filteredCharts.filter((chart) => chart.section === section)}
		<div class="section">
			{#if title}
				<div class="sectionHeader">
					{title}
				</div>
			{/if}
			<div class="sectionBody">
				{#each chartsInSection as chart}
					<button class="cardButton" on:click={() => handleChartButton(chart)}>
						<div class="material-icons">add</div>
						{chart.title}
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

{#if activeCardId}
	{@const cardData = cards.find((item) => item.card_id === activeCardId)?.card_json}
	{#if cardData}
		<Modal on:backdropClick={clearActiveCard} on:updateModal={saveModal}>
			<Card collapsible={false} data={JSON.parse(cardData)} bind:value={cardValue.fields} />
		</Modal>
	{/if}
{/if}

<style>
	.quickchart {
		display: grid;
	}
	.sectionHeader {
		border-bottom: 1px solid var(--border);
		margin: 10px;
	}

	.sectionBody {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 20px;
		padding: 20px;
	}

	.cardButton {
		color: var(--primary);
		border: 1px solid var(--border);
		background: var(--light1);
		padding: 10px;
		height: 60px;
		text-align: start;
		display: flex;
		align-items: center;
	}
</style>
