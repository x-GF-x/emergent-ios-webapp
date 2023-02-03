<script lang="ts">
	import Modal from '$lib/ui_components/Modal.svelte';
	import Card from '$lib/ui_components/Card.svelte';

	import { quickchartSections } from '$lib/resource_file/ui/ui_quickchart_sections';
	import { quickcharts } from '$lib/resource_file/ui/ui_quickcharts_with_drugs';
	import { cards } from '$lib/resource_file/ui/ui_cards';

	export let selectedTab: Tab;
	export let value: DataStorage;

	let cardValue: ActionItem = { card_id: '', fields: {} };
	let filteredCharts = quickcharts.filter(
		(chart) => chart.key === selectedTab.id && chart.card !== 'violation'
	);

	let activeCard: string | undefined = undefined;
	let activeChart: QuickChartObject | undefined = undefined;
	let sections = [...new Set(filteredCharts.map((item) => item.section))];

	const handleChartButton = (chart: QuickChartObject) => {
		activeChart = chart;
		activeCard = cards.find((item) => item.card_id === chart.card)?.card_json;
		cardValue = { card_id: chart.card, fields: {}, title: chart.title };
	};

	const saveModal = () => {
		cardValue.last_modified = new Date().getTime().toString();
		cardValue.created = new Date().toString();
		value.actions = [...value.actions, cardValue];
		clearActiveCard();
	};

	const clearActiveCard = () => {
		activeCard = '';
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
					{@const chartCardId = chart.card}
					{@const matchingCards = value?.actions?.filter(
						(item) => item?.card_id === chartCardId && item.title === chart.title
					)}
					<button
						class="cardButton"
						class:active={matchingCards?.length}
						on:click={() => handleChartButton(chart)}
					>
						{#if matchingCards.length}
							<div class="replayNumber">
								<div class="matchingCardsLength">
									{matchingCards.length}
								</div>
								<div class="material-symbols-outlined replay">replay</div>
							</div>
						{:else}
							<div class="material-symbols-outlined">add</div>
						{/if}
						<div class="buttonText">
							<div class="buttonTitle">
								{chart.title}
							</div>
							{#if matchingCards.length}
								{@const lastInstance = matchingCards.at(-1)?.last_modified}
								<div class="timestamp">
									Last Performed at: {lastInstance}
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

{#if activeCard}
	<Modal on:backdropClick={clearActiveCard} on:updateModal={saveModal}>
		<Card
			collapsible={false}
			data={JSON.parse(activeCard)}
			bind:value={cardValue.fields}
			chart={activeChart}
		/>
	</Modal>
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

	.active {
		background: var(--active4);
	}

	.buttonTitle {
		font-weight: 500;
	}

	.replayNumber {
		height: 60px;
		position: relative;
		text-align: center;
		width: 60px;
		display: flex;
		margin-top: 5px;
		margin-left: -10px;
	}

	.matchingCardsLength {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.replay {
		font-size: 40pt;
		font-weight: 100;
		top: 0;
		width: 100%;
		position: absolute;
	}

	.timestamp {
		color: var(--dark1);
		font-size: 10pt;
	}
</style>
