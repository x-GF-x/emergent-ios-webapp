<script lang="ts">
	// import type { PageData } from './$types';
	// export let data: PageData;

	import SingleSelect from '$lib/inputs/SingleSelect.svelte';

	let tabs = [
		{ label: 'Quick Chart', id: '0', type: 'quickchart' },
		{ label: 'Person Info', id: 'ems_patient_information', type: 'scene' },
		{ label: 'Timeline', id: '2', type: 'dynamic_scene' },
		{ label: 'Photos & Forms', id: '3', type: 'scene' },
		{ label: 'Narrative', id: '4', type: 'scene' },
		{ label: 'Summary', id: '5', type: 'dynamic_scene' }
	];
	let footerItems = [
		{ label: 'Pulse', id: 'pulse' },
		{ label: 'Respirations', id: 'respirations' },
		{ label: 'Blood Pressure', id: 'blood_pressure' },
		{ label: 'SpO2', id: 'sp02' },
		{ label: 'ETC02', id: 'etc02' }
	];
	let selectedTab: string = '0';
	let beginningTime = new Date().getTime();
	let time: number;
	setInterval(() => {
		const current = new Date();
		const currentTime = current.getTime();
		time = currentTime - beginningTime;
	}, 100);
</script>

<div class="grid">
	<section class="navigation">
		<a href="/" class="return material-icons">arrow_back_ios</a>
		<div class="timer">
			0009100 -
			{time?.toString()?.slice(0, 1)}:{time?.toString()?.slice(1, 3)}
		</div>
	</section>
	<section class="controls">
		<SingleSelect />
		<div class="material-icons swap">swap_horiz</div>
		<button class="addPerson">Add Person</button>
		<button class="endCall">End Call</button>
	</section>
	<section class="tabs">
		{#each tabs as tab}
			<button
				class:selectedTab={tab.id === selectedTab}
				class="tab"
				on:click={() => (selectedTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</section>
	<section class="body">body</section>
	<section class="footer">
		<button class="protocols">Protocols</button>
		{#each footerItems as footerItem}
			<div class="footerItem">
				<div class="footerItemHeader">
					{footerItem.label}
				</div>
				<div class="footerItemValue">-</div>
			</div>
		{/each}
	</section>
</div>

<style>
	.grid {
		display: grid;
		grid-template-rows: 5% 10% 5% 70% 10%;
		height: 100%;
		align-items: end;
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		max-width: 1200px;
		margin: auto;
	}

	.navigation {
		display: grid;
		grid-template-columns: 50% 50%;
		align-items: center;
	}
	.return {
		color: var(--primary);
		text-decoration: none;
		padding-left: 10px;
	}

	.controls {
		display: grid;
		grid-template-columns: 20% 40% 20% 20%;
		align-items: center;
	}

	.swap {
		background: var(--primary);
		width: max-content;
		color: white;
		padding: 10px;
		border-radius: 5px;
	}

	.addPerson {
		color: var(--primary);
		background: var(--light3);
		height: 40px;
		border-radius: 5px;
		margin-right: 10px;
	}

	.endCall {
		color: var(--light1);
		background: var(--primary);
		height: 40px;
		border-radius: 5px;
	}

	.tabs {
		display: grid;
		grid-template-columns: auto auto auto auto auto auto;
		justify-content: space-around;
	}

	.tab {
		width: max-content;
		border-bottom: 4px solid transparent;
	}

	.selectedTab {
		border-bottom: 4px solid var(--primary);
	}

	.footer {
		display: grid;
		grid-template-columns: max-content auto auto auto auto auto;
		align-items: center;
		margin-bottom: 20px;
	}

	.protocols {
		background: var(--secondary);
		width: max-content;
		padding: 10px;
		margin: auto;
		height: 100%;
		border-radius: 5px 5px 0 0;
		color: white;
		cursor: pointer;
	}

	.footerItem {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.footerItem:not(:last-child) {
		border-right: 1px solid var(--border);
	}

	section {
		height: 100%;
	}

	section:nth-child(odd) {
		background: var(--light3);
	}
</style>
