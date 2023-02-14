<script lang="ts">
	import CardModal from '$lib/ui_components/modal/CardModal.svelte';
	import Timer from '$lib/ui_components/Timer.svelte';
	import OtherActions from '$lib/scene_actions/OtherActions.svelte';

	import { quickchartSections } from '$lib/resource_file/ui/ui_quickchart_sections';
	import { quickcharts } from '$lib/resource_file/ui/ui_quickcharts_with_drugs';
	import { cards } from '$lib/resource_file/ui/ui_cards';
	import { created_and_last_modified } from '$lib/fn/timestamp';

	export let selectedTab: Tab;
	export let value: DataStorage;
	export let timers: Timers = {};

	let filteredCharts = quickcharts.filter(
		(chart) => chart.key === selectedTab.id && chart.card !== 'violation'
	);
	let sections = [...new Set(filteredCharts.map((item) => item.section))];
	let activeChart: QuickChartObject | undefined = undefined;
	let cardValue: ActionItem = { card_id: '', fields: {} };
	let activeCard: string | undefined = undefined;
	let showTimelineCards = false;

	filteredCharts.forEach((chart) => {
		if (chart.type === 'timed' && !timers[chart.card]) {
			timers[chart.card] = { value: 0, overdue: false, deadline: 0 };
		}
	});

	const handleChartButton = (chart: QuickChartObject | undefined) => {
		activeChart = chart;
		if (chart?.card === 'timeline_cards') {
			showTimelineCards = true;
		} else {
			activeCard = cards.find((item) => item.card_id === chart?.card)?.card_json;
			if (chart?.card) cardValue = { card_id: chart.card, fields: {}, title: chart?.title };
		}
	};

	const setTimers = () => {
		if (cardValue.card_id in timers) {
			timers[cardValue.card_id].overdue = false;
			if (activeChart?.interval) {
				timers[cardValue.card_id].deadline = Math.floor(Date.now() + activeChart.interval * 1000);
				timers[cardValue.card_id].value = activeChart.interval;
			}
		}
	};

	const saveModal = () => {
		setTimers();
		created_and_last_modified(cardValue);
		value.actions = [...value.actions, cardValue];
		clearActiveCard();
	};

	const clearActiveCard = () => {
		activeCard = '';
	};
</script>

{#if showTimelineCards}
	<div class="fixed">
		<OtherActions
			on:close={() => (showTimelineCards = false)}
			on:select={(e) => {
				cardValue = { card_id: e.detail.value.code, fields: {}, title: e.detail.value?.value };
				activeCard = cards.find((item) => item.id === e.detail.value.id)?.card_json;
			}}
		/>
	</div>
{/if}

<div class="quickchart">
	{#each sections as section}
		{@const title = quickchartSections.find((item) => item.id === section)?.title}
		{@const chartsInSection = filteredCharts.filter((chart) => chart.section === section)}
		<div class="section">
			{#if title}
				<div class="sectionHeader">
					<div class="sectionTitle">
						{title}
					</div>
					<div class="dottedLine" />
				</div>
			{/if}
			<div class="sectionBody">
				{#each chartsInSection as chart}
					<!-- Other Actions: chart.card === 'timeline_cards'-->
					{@const chartCardId = chart.card}
					{@const matchingCards = value?.actions?.filter(
						(item) => item?.card_id === chartCardId && item.title === chart.title
					)}
					{@const disabled = chart.type === 'unrepeatable' && matchingCards?.length ? true : false}
					<button
						class="cardButton"
						class:active={matchingCards?.length && chart.type === 'untimed'}
						class:yellowTimer={chartCardId in timers &&
							!timers[chartCardId].overdue &&
							timers[chartCardId].value > 0}
						class:greenTimer={chartCardId in timers &&
							!timers[chartCardId].overdue &&
							timers[chartCardId].value >= 60}
						class:redTimer={chartCardId in timers && timers[chartCardId].overdue}
						on:click={() => handleChartButton(chart)}
						class:disabled
						{disabled}
					>
						{#if matchingCards?.length && !disabled}
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
							{#if (matchingCards?.length && chart.type === 'untimed') || chart.type === 'timed'}
								{@const lastInstance = matchingCards?.at(-1)?.last_modified}
								<div class="timestamp">
									{#if chart.type === 'timed'}
										{#if !lastInstance && chart.interval}
											Perform every
											{new Date(chart.interval * 1000).toISOString().slice(11, 19)}
										{:else if lastInstance && chart.interval}
											<Timer
												deadline={timers[chartCardId].deadline}
												bind:count={timers[chartCardId].value}
												bind:overdue={timers[chartCardId].overdue}
											/>
										{/if}
									{:else}
										Last Performed at {lastInstance}
									{/if}
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
	<CardModal
		bind:value={cardValue.fields}
		data={JSON.parse(activeCard)}
		chart={activeChart}
		on:backdropClick={clearActiveCard}
		on:updateModal={saveModal}
	/>
{/if}

<style>
	.quickchart {
		display: grid;
	}
	.sectionHeader {
		margin: 10px 16px;
		display: flex;
	}

	.sectionTitle {
		margin-top: -5px;
		margin-right: 5px;
	}

	.dottedLine {
		background-image: url('/quick_chart_section_header_dots@3x.png');
		background-repeat: repeat-x;
		background-size: 4px;
		width: 100%;
		filter: var(--contrastFilter);
	}

	.sectionBody {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8pt;
		padding: 16px;
	}

	.cardButton {
		color: var(--primary);
		border: var(--1pxBorder);
		background: var(--light1);
		padding: 15px 10px;
		min-height: 68px;
		text-align: start;
		display: flex;
		align-items: center;
		/* max-width: 234pt; */
	}

	.disabled {
		background: var(--dark3);
		color: var(--light1);
		filter: var(--contrastFilter);
	}

	.active {
		background: var(--active4);
	}

	.buttonTitle {
		font-weight: var(--weightBold);
	}

	.replayNumber {
		height: 30px;
		position: relative;
		text-align: center;
		display: flex;
		margin-top: 5px;
		margin-left: -10px;
	}

	.matchingCardsLength {
		width: 54px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.replay {
		font-size: 40pt;
		font-weight: 100;
		top: -15px;
		position: absolute;
		transform: scaleX(-1);
	}

	.timestamp {
		color: var(--dark1);
		font-size: var(--fontXS);
		font-weight: var(--weightBold);
	}

	.redTimer {
		background: var(--primary);
		color: var(--light1);
	}
	.yellowTimer {
		background: var(--yellow);
		color: white;
	}

	.greenTimer {
		background: var(--green);
		color: white;
	}

	.fixed {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}
</style>
