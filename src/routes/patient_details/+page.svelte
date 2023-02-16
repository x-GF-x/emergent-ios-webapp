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
	import { default_value, createPerson } from '$lib/data/default_value';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { build_name, person_options } from '$lib/fn/build_select_options';

	let value: PersonStorage = default_value;
	let data: DataStorage = { persons: [value] };
	let selectedTab: Tab = tabs?.[0];
	let allCollapsed: boolean | undefined = undefined;
	let timers: Timers = {};
	data.persons.map((person) => (timers[person.uuid] = {}));
	let sceneAction: ActionComponents;
	let currentPerson = { name: 'Patient 1', uuid: value.uuid };
	let personOptions = person_options(data);

	const buildPerson = () => {
		let personIndex = personOptions.findIndex((item) => item.code === value.uuid);
		currentPerson.name = build_name(value, personIndex);
		currentPerson.uuid = value.uuid;
		personOptions = person_options(data);
	};

	$: value.static_fields, buildPerson();

	const handleSceneAction = (action: SubTabActions) => {
		if (action === 'expand') allCollapsed = false;
		else if (action === 'collapse') allCollapsed = true;
		else sceneAction = sceneActionComponents[action];
	};

	const handleChildCollapse = () => (allCollapsed = undefined);

	onMount(() => {
		$dataStorageAccessor = value;
	});
</script>

<!-- <button on:click={() => (value.readonly = true)}>dev</button> -->
{#if sceneAction}
	<svelte:component
		this={sceneAction}
		bind:selectedTab
		bind:value
		on:close={() => (sceneAction = undefined)} />
{/if}

<div class="grid">
	<section class="navigation">
		<a href="/" class="return material-symbols-outlined">arrow_back_ios</a>
		<button
			class="theme material-symbols-outlined"
			on:click={() => ($theme === 'dark' ? ($theme = 'light') : ($theme = 'dark'))}>
			{$theme === 'dark' ? 'dark_mode' : 'light_mode'}
		</button>
	</section>
	<section class="controls">
		<div class="patientSelect">
			<SingleSelect
				passedInOptions={personOptions}
				bind:value={currentPerson.name}
				on:selectOption={(e) => {
					let matchingPerson = data.persons.find((item) => item.uuid === e.detail.value);
					if (matchingPerson) value = matchingPerson;
				}}
				props={{ icon: 'account_box', dropdownLabel: 'People' }} />
		</div>
		<button
			class="addPerson"
			on:click={() => {
				data.persons = [...data.persons, createPerson()];
				personOptions = person_options(data);
				value = data.persons[data.persons.length - 1];
				timers[value.uuid] = {};
			}}>
			ADD PERSON
		</button>
		<button class="endCall">END CALL</button>
	</section>
	<section class="tabs">
		{#each tabs as tab}
			<button
				class:selectedTab={tab.id === selectedTab.id}
				class="tab"
				on:click={() => (selectedTab = tab)}>
				{tab.label}
			</button>
		{/each}
	</section>
	<div class="sceneHeader">
		<div class="headerAndActionButton">
			<div class="label">{selectedTab.label}</div>
			{#if selectedTab.scene_action}
				<button
					class="sceneAction"
					on:click={() => {
						if (selectedTab.scene_action?.fn) handleSceneAction(selectedTab.scene_action.fn);
					}}>
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
	<section class="body">
		{#key selectedTab}
			<svelte:component
				this={scenes?.[selectedTab?.type]}
				on:collapsed={handleChildCollapse}
				{selectedTab}
				{allCollapsed}
				{timers}
				bind:value />
		{/key}
	</section>
	<section class="footer">
		{#each footerItems as footerItem}
			{@const mostRecentVitals = value.actions.find(
				(item) => item.card_id === 'vital_signs'
			)?.fields}
			<div class="footerItem">
				<div class="footerItemHeader">{footerItem.label}</div>
				<div class="footerItemValue">
					{mostRecentVitals?.[footerItem.id] ? mostRecentVitals[footerItem.id] : '-'}
				</div>
			</div>
		{/each}
	</section>
</div>

<style>
	section {
		height: 100%;
	}

	.grid {
		display: grid;
		grid-template-rows: 5% 10% 5% auto 1fr 10% 2.5%;
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
		font-weight: var(--weightBold);
		white-space: nowrap;
		padding: 0 16px;
	}

	.endCall {
		color: var(--light4);
		background: var(--primary);
		height: 60px;
		border-radius: 5px;
		font-weight: var(--weightBold);
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
		font-weight: var(--weightRegular);
	}

	.selectedTab {
		border-bottom: 4px solid var(--primary);
		font-weight: var(--weightBold);
	}

	.body {
		overflow-y: auto;
		background: var(--light3);
	}

	.sceneHeader {
		padding: 16px 0 0 16px;
		background: var(--light3);
	}

	.headerAndActionButton {
		display: flex;
		justify-content: space-between;
	}

	.label {
		font-size: var(--fontXL);
		font-weight: var(--weightSemiBold);
	}

	.sceneAction {
		color: var(--primary);
		font-weight: var(--weightBold);
		padding: 0px 16px;
	}

	.sceneTab {
		padding: 10px 0;
		color: var(--primary);
		font-weight: var(--weightRegular);
	}

	.sceneTab:not(:last-child) {
		margin-right: 7px;
		padding-right: 7px;
		border-right: var(--1pxBorder);
	}

	.footer {
		display: grid;
		grid-template-columns: auto auto auto auto auto;
		align-items: center;
		z-index: 1;
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
		border: var(--1pxBorder);
	}

	.footerItem:not(:last-child) {
		border-right: none;
	}

	.theme {
		display: flex;
		justify-content: flex-end;
		margin-right: 6px;
	}
</style>
