<script lang="ts">
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';
	import { tabs, bodyHeaderCells, calls } from '$lib/data/dashboard';

	let selectedTab = 0;

	let selectedCall = calls?.[0].incident_number;
	const editBodyHeader = () => {
		console.log('Edit');
	};
</script>

<section class="dashboard">
	<header>
		<a href="/auth/login" class="logOut"> Log Out </a>
		<div class="pageLabel">Dashboard</div>
	</header>
	<section class="tabs">
		{#each tabs as tab}
			<button
				class:selectedTab={selectedTab === tab.value}
				class="tab"
				on:click={() => (selectedTab = tab.value)}>
				{tab.label}
			</button>
		{/each}
	</section>
	<section class="body">
		<div class="bodyHeader">
			{#each bodyHeaderCells as cell}
				<div class="cell">
					<div class="bodyHeaderLabel">
						{cell.label}
					</div>
					<div class="bodyHeaderValue">
						{cell.value}
					</div>
				</div>
			{/each}
			<div class="cell" style="display: flex;align-items: center;">
				<button class="editBodyHeader material-symbols-outlined" on:click={editBodyHeader}
					>edit_square</button>
			</div>
		</div>
		<div class="bodyGrid">
			<div class="list">
				<div class="listSelect">
					<SingleSelect field={{}} />
				</div>
				<div class="calls">
					{#each calls as call}
						<button
							class:selectedCall={call.incident_number === selectedCall}
							class:activeCall={call.active}
							class="callButton"
							on:click={() => (selectedCall = call.incident_number)}>
							<div class="call">
								<div class="callLarge">
									<div class="cellLargeItem">
										{call.unit}
									</div>
									<div class="callLargeItem">
										{call.address}
									</div>
									<div class="callLargeItem">
										{call.incident_type}
									</div>
								</div>

								<div class="callSmall">
									<div>
										{call.time}
									</div>
									<div>
										{call.incident_number}
									</div>
								</div>
							</div>
							<div class="material-symbols-outlined callArrow">arrow_forward_ios</div>
						</button>
					{/each}
				</div>
			</div>
			<div class="selectedView">
				<div class="map">
					<img src="/map.png" alt="example_map" />
				</div>
				<div class="incident">
					{#if selectedCall}
						{@const selected = calls.find((item) => selectedCall === item.incident_number)}
						<div class="incidentData">
							<div class="callLarge">
								<div class="selectedUnits">
									{selected?.unit}
								</div>
								<div class="callLargeItem">
									{selected?.address}
								</div>
								<div class="callLargeItem">
									{selected?.incident_type}
								</div>
							</div>

							<div class="callSmall">
								<div>
									{selected?.time}
								</div>
								<div>
									{selected?.incident_number}
								</div>
							</div>
						</div>
						<a href="./patient_details" class="incidentAction">
							{selected?.active ? 'Resume Call' : 'Begin Call'}
						</a>
					{/if}
				</div>
			</div>
		</div>
	</section>
</section>

<style>
	.dashboard {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 80px 60px 1fr;
		max-width: 1200px;
		margin: auto;
		min-height: 90vh;
	}
	header {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}

	.logOut {
		color: var(--primary);
		width: max-content;
		text-decoration: none;
	}

	.tabs {
		display: flex;
		align-items: flex-end;
	}
	.tab {
		height: 60px;
		width: 100%;
		cursor: pointer;
		color: var(--dark3);
		border: var(--1pxBorder);
		background-color: var(--light0);
	}
	.selectedTab {
		color: var(--dark0);
		background-color: var(--light4);
		border-bottom: 2px solid var(--secondary);
	}
	.body {
		display: flex;
		flex-direction: column;
		background: var(--light2);
	}

	.bodyHeader {
		display: grid;
		grid-template-columns: 120px 75px 75px 1fr 50px;
		background: var(--light1);
		border: var(--1pxBorder);
		border-top: none;
	}

	.bodyHeaderLabel {
		color: var(--dark3);
	}

	.bodyHeaderValue {
		font-weight: var(--weightSemiBold);
	}

	.cell {
		padding: 6px;
	}

	.cell:not(:last-of-type) {
		border-right: var(--1pxBorder);
	}

	.editBodyHeader {
		color: var(--primary);
	}

	.bodyGrid {
		display: grid;
		grid-template-columns: 33.3% 1fr;
		border: var(--1pxBorder);
		border-top: none;
	}

	.list {
		display: flex;
		flex-direction: column;
		border-right: var(--1pxBorder);
	}
	.calls {
		display: flex;
		flex-direction: column;
	}
	.call {
		display: flex;
		flex-direction: column;
		padding: 20px 0 10px 5px;
		align-items: flex-start;
		width: 100%;
	}

	.callButton {
		display: flex;
		flex-direction: row;
		border-bottom: var(--1pxBorder);
		background: var(--light1);
		text-align: initial;
	}

	.activeCall {
		border-left: 6px solid var(--secondary);
	}

	.selectedCall {
		background: var(--light2);
		border-left: 6px solid var(--primary);
	}

	.callLarge {
		padding: 4px 0;
		margin-bottom: 20px;
	}

	.callLargeItem {
		margin-bottom: 5px;
	}

	.callSmall {
		display: flex;
		flex-direction: column;
		font-size: var(--fontSmall);
	}

	.callArrow {
		color: var(--dark3);
		right: 10px;
		margin-top: 20px;
	}

	.selectedView {
		display: grid;
		grid-template-rows: 70% 30%;
		margin: 10px;
		padding: 10px;
		border: var(--1pxBorder);
		background: var(--light2);
	}

	.incident {
		display: grid;
		grid-template-columns: 60% 40%;
		align-items: flex-end;
	}

	.map {
		overflow: hidden;
		margin-left: auto;
		margin-right: auto;
		height: auto;
		max-width: 100%;
		max-height: 45vh;
	}

	.incidentAction {
		padding: 20px;
		background: var(--primary);
		color: var(--light4);
		font-weight: var(--weightSemiBold);
		border-radius: 5px;
		text-align: center;
		text-decoration: none;
	}
	.selectedUnits {
		font-size: var(--fontLarge);
	}
</style>
