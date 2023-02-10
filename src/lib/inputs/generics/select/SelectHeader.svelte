<script lang="ts">
	import Search from '../../Search.svelte';

	import { createEventDispatcher, tick } from 'svelte';

	export let title: string | undefined;
	export let props: InputProps = undefined;
	export let searchValue: string;
	export let type: 'singleSelect' | 'multiSelect' = 'singleSelect';

	let searchOpen = false;
	let search: Search;

	const dispatch = createEventDispatcher();

	const toggleSearch = async () => {
		searchOpen = !searchOpen;
		if (searchOpen) {
			await tick().then(() => search.searchFocus());
		}
	};

	const dispatchClose = () => {
		dispatch('close');
	};
</script>

<div class="dropdown">
	<div class="dropdownLabel" class:multiBackground={type === 'multiSelect'}>
		{#if !searchOpen}
			<div class="title">
				{title ? title : props?.dropdownLabel}
			</div>
		{:else}
			<Search
				bind:this={search}
				bind:searchValue
				inputStyle={'border:none;'}
				containerStyle={'border:none;background:var(--light1);padding:2.5px 10px'}
			/>
		{/if}
		{#if type === 'multiSelect'}
			<div class="multiControls">
				<button
					class:searchOpen
					class="searchReveal material-symbols-outlined"
					on:click={toggleSearch}
				>
					{searchOpen ? 'cancel' : 'search'}
				</button>
				<button class="close material-symbols-outlined" on:click={dispatchClose}> close </button>
			</div>
		{/if}
	</div>
	{#if type === 'singleSelect'}
		<Search bind:searchValue />
	{/if}
	<slot />
</div>

<style>
	/* .dropdown {
		border: var(--1pxBorder);
	} */

	.dropdownLabel {
		display: flex;
		justify-content: center;
		background: var(--light2);
		font-weight: var(--weightBold);
		border-bottom: var(--1pxBorder);
		position: sticky;
		top: 0;
	}

	.multiBackground {
		background: var(--light1);
		justify-content: space-between;
	}

	.title {
		padding: 16px;
	}

	.multiControls {
		display: flex;
	}

	.material-symbols-outlined {
		color: var(--dark3);
	}

	.searchOpen {
		color: var(--primary);
		font-size: var(--fontLarge);
	}

	.close {
		border-left: var(--1pxBorder);
	}
</style>
