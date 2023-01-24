<script lang="ts">
	import { quickchartSections } from '$lib/resource_file/ui/ui_quickchart_sections';
	import { quickcharts } from '$lib/resource_file/ui/ui_quickcharts';
	export let selectedTab: Tab;

	let filteredCharts = quickcharts.filter(
		(chart) => chart.key === selectedTab.id && chart.card !== 'violation'
	);

	let sections = [...new Set(filteredCharts.map((item) => item.section))];
	console.log(sections, filteredCharts);
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
					<button class="cardButton">
						<div class="material-icons">add</div>
						{chart.title}
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

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
