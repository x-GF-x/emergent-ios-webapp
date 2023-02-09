<script lang="ts">
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';

	import {
		tabs,
		quickchartTabs,
		sceneTabs,
		scenes,
		footerItems,
		sceneActionComponents
	} from '$lib/data/patient_details';

	import { dataStorageAccessor } from '$lib/stores/data';
	import { default_value } from '$lib/data/default_value';

	let value: DataStorage = default_value;
	$dataStorageAccessor = value;
	let selectedTab: Tab = tabs?.[0];
	let allCollapsed: boolean | undefined = undefined;
	let timers: Timers = {};
	let sceneAction: ActionComponents;

	const handleSceneAction = (action: SubTabActions) => {
		if (action === 'expand') allCollapsed = false;
		else if (action === 'collapse') allCollapsed = true;
		else sceneAction = sceneActionComponents[action];
	};

	const handleChildCollapse = () => (allCollapsed = undefined);
</script>

{#if sceneAction}
	<svelte:component
		this={sceneAction}
		bind:selectedTab
		bind:value
		on:close={() => (sceneAction = undefined)}
	/>
{/if}

<div class="grid">
	<section class="navigation">
		<a href="/" class="return material-symbols-outlined">arrow_back_ios</a>
	</section>
	<section class="controls">
		<div class="patientSelect">
			<SingleSelect
				field={{}}
				value={'Patient 1'}
				props={{ icon: 'account_box', dropdownLabel: 'People' }}
			/>
		</div>
		<!-- <div class="material-symbols-outlined swap">swap_horiz</div> -->
		<button class="addPerson">ADD PERSON</button>
		<button class="endCall">END CALL</button>
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
			<div class="headerAndActionButton">
				<div class="label">
					{selectedTab.label}
				</div>
				{#if selectedTab.scene_action}
					<button
						class="sceneAction"
						on:click={() => {
							if (selectedTab.scene_action?.fn) handleSceneAction(selectedTab.scene_action.fn);
						}}
					>
						{selectedTab.scene_action.label}
					</button>
				{/if}
			</div>
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
		{#key selectedTab}
			<svelte:component
				this={scenes?.[selectedTab?.type]}
				on:collapsed={handleChildCollapse}
				{selectedTab}
				{allCollapsed}
				{timers}
				bind:value
			/>
		{/key}
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
		grid-template-columns: 1fr max-content max-content;
		align-items: center;
	}
	.patientSelect {
		max-width: 250px;
		height: 60px;
	}
	/* .swap {
		background: var(--primary);
		width: max-content;
		color: white;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
	} */

	.addPerson {
		color: var(--primary);
		background: var(--light3);
		height: 60px;
		border-radius: 5px;
		margin-right: 10px;
		font-weight: 500;
		white-space: nowrap;
		padding: 0 16px;
	}

	.endCall {
		color: var(--light1);
		background: var(--primary);
		height: 60px;
		border-radius: 5px;
		font-weight: 500;
		white-space: nowrap;
		padding: 0 16px;
	}

	.tabs {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		justify-content: space-around;
	}

	.tab {
		border-bottom: 4px solid transparent;
		min-width: max-content;
		font-weight: 300;
	}

	.selectedTab {
		border-bottom: 4px solid var(--primary);
		font-weight: 500;
	}

	.body {
		overflow-y: scroll;
		background: var(--light3);
	}

	.sceneHeader {
		padding: 16px 0 0 16px;
		margin-bottom: 10px;
		/* If you want sticky */
		position: sticky;
		top: 0;
		background: var(--light3);
	}

	.headerAndActionButton {
		display: flex;
		justify-content: space-between;
		margin: 5px 0;
	}

	.label {
		font-size: 24px;
		font-weight: 500;
	}

	.sceneAction {
		color: var(--primary);
		padding: 0px 16px;
	}

	.sceneTab {
		padding: 10px 0;
		color: var(--primary);
		font-weight: 300;
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

	section {
		height: 100%;
	}
</style>
