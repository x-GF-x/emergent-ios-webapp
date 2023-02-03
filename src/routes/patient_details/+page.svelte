<script lang="ts">
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';

	import { tabs, quickchartTabs, sceneTabs, scenes, footerItems } from '$lib/data/patient_details';

	let value: DataStorage = {
		created: new Date().toISOString(),
		last_modified: new Date().toISOString(),
		uuid: crypto.randomUUID(),
		actions: [],
		static_fields: {}
	};

	let selectedTab: Tab = tabs?.[0];
	let allCollapsed: boolean | undefined = undefined;
	let timers: Timers = {};

	const handleSceneAction = (action: string) => {
		if (action === 'expand') allCollapsed = false;
		else if (action === 'collapse') allCollapsed = true;
	};

	const handleChildCollapse = () => (allCollapsed = undefined);
</script>

<div class="grid">
	<section class="navigation">
		<a href="/" class="return material-symbols-outlined">arrow_back_ios</a>
	</section>
	<section class="controls">
		<SingleSelect value={'Patient 1'} props={{ icon: 'account_box', dropdownLabel: 'People' }} />
		<div class="material-symbols-outlined swap">swap_horiz</div>
		<button class="addPerson">Add Person</button>
		<button class="endCall">End Call</button>
	</section>
	<section class="tabs">
		{#each tabs as tab}
			<button
				class:selectedTab={tab.id === selectedTab.id}
				class="tab"
				on:click={() => (selectedTab = tab)}
			>
				{tab.label}
			</button>
		{/each}
	</section>
	<section class="body">
		<div class="sceneHeader">
			<h1 class="sceneHeaderLabel">
				{selectedTab.label}
				{#if selectedTab.scene_action}
					<button class="scene_action">{selectedTab.scene_action.label}</button>
				{/if}
			</h1>
			{#if selectedTab.headerTabs}
				{@const headerTabs = selectedTab.type === 'quickchart' ? quickchartTabs : sceneTabs}
				<div class="sceneTabs">
					{#each headerTabs as sceneTab}
						<button on:click={() => handleSceneAction(sceneTab.action)} class="sceneTab">
							{sceneTab.label}
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<!-- {#key selectedTab} -->
		<svelte:component
			this={scenes?.[selectedTab?.type]}
			on:collapsed={handleChildCollapse}
			{selectedTab}
			{allCollapsed}
			bind:value
			{timers}
		/>
		<!-- {/key} -->
	</section>
	<section class="footer">
		<!-- <button class="protocols">Protocols</button> -->
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
		grid-template-rows: 5% 10% 5% 67.5% 10% 2.5%;
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
		gap: 10px;
		margin: 0 10px;
		grid-template-columns: auto 40% 20% 20%;
		align-items: center;
	}

	.swap {
		background: var(--primary);
		width: max-content;
		color: white;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
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
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		justify-content: space-around;
	}

	.tab {
		border-bottom: 4px solid transparent;
	}

	.selectedTab {
		border-bottom: 4px solid var(--primary);
	}

	.body {
		overflow: auto;
		background: var(--light3);
	}

	.sceneHeader {
		padding: 10px 10px 0 10px;
		margin-bottom: 10px;
		/* If you want sticky */
		position: sticky;
		top: 0;
		background: var(--light3);
	}

	.sceneHeaderLabel {
		display: flex;
		justify-content: space-between;
	}

	.scene_action {
		color: var(--primary);
	}

	.sceneTab {
		padding: 10px 0;
		color: var(--primary);
	}

	.sceneTab:not(:last-child) {
		margin-right: 7px;
		padding-right: 7px;
		border-right: 1px solid var(--border);
	}

	.footer {
		display: grid;
		grid-template-columns: auto auto auto auto auto;
		align-items: center;
	}

	/* .protocols {
		background: var(--secondary);
		width: max-content;
		padding: 10px;
		margin: auto;
		height: 100%;
		border-radius: 5px 5px 0 0;
		color: white;
		cursor: pointer;
	} */

	.footerItem {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border);
	}

	.footerItem:not(:last-child) {
		border-right: none;
	}

	h1 {
		margin: 5px 0;
	}

	section {
		height: 100%;
	}
</style>
