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
		cardValue.last_modified = new Date().getTime().toString();
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
					{@const chartCardId = chart.card}
					{@const matchingCards = value?.actions?.filter((item) => item?.card_id === chartCardId)}
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
	}
</style>
