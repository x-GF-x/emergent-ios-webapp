<script lang="ts">
	import { reposition, createPopper } from 'nanopop';
	import { onMount } from 'svelte';

	export let options: { code: string; value: string; id?: number; type?: string }[] = [
		{ code: '1', value: 'One' },
		{ code: '2', value: 'Two' }
	];
	export let props: { icon?: string; dropdownLabel?: string } | undefined = undefined;
	export let value: string | undefined = undefined;

	let toggleButton: HTMLElement;
	let popper: HTMLElement;
	let isOpen = false;
	let searchValue = '';
	let overPopper = false;

	const toggle = () => {
		isOpen = !isOpen;
		if (isOpen) {
			reposition(toggleButton, popper, { position: 'bottom-middle' });
		}
	};

	const selectOption = (code: string) => {
		if (value === code) {
			value = undefined;
		} else value = code;
	};

	onMount(() => {
		createPopper(toggleButton, popper);
	});
</script>

<svelte:window
	on:mouseup={() => {
		if (isOpen && !overPopper) toggle();
	}}
/>
<div class="wrapper">
	<button
		bind:this={toggleButton}
		class:iconToggle={props?.icon}
		class="toggleButton"
		on:click={toggle}
	>
		<div class="buttonLabel">
			{#if props?.icon}
				<div class="material-icons">
					{props.icon}
				</div>
			{/if}
			<div class="value">
				{value ? options.find((item) => item.code === value)?.value : ''}
			</div>
		</div>
		<div class="material-icons caret">expand_more</div>
	</button>
	<div
		bind:this={popper}
		class="popper {!isOpen ? 'closed' : ''}"
		on:mouseenter={() => (overPopper = true)}
		on:mouseleave={() => (overPopper = false)}
	>
		<div class="dropdown">
			{#if props?.dropdownLabel}
				<div class="dropdownLabel">
					{props.dropdownLabel}
				</div>
				<div class="dropdownLabel">
					<div class="material-icons searchIcon">search</div>
					<input class="search" placeholder="Search..." type="search" bind:value={searchValue} />
				</div>
			{/if}
			<div class="options">
				{#each options.filter((option) => option.value
						.toLowerCase()
						.includes(searchValue.toLowerCase())) as option}
					<button
						on:click={() => selectOption(option.code)}
						class:selected={option.code === value}
						class="option"
					>
						{option.value}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.popper {
		position: fixed;
		width: 300px;
		max-height: 800px;
		overflow: auto;
	}

	.closed {
		visibility: hidden;
	}

	.toggleButton {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 10px 0;
	}

	.iconToggle {
		color: var(--secondary);
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 5px;
	}

	.buttonLabel {
		display: grid;
		grid-template-columns: 50% 50%;
		align-items: center;
		width: 100%;
		text-align: initial;
	}

	.caret {
		color: var(--dark3);
	}

	.dropdown {
		border: 1px solid var(--border);
	}

	.dropdownLabel {
		display: flex;
		justify-content: center;
		padding: 10px;
		background: var(--dark2);
		font-weight: 500;
		border-bottom: 1px solid var(--border);
	}

	.search {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--border);
		border-left: 0;
		border-radius: 0 10px 10px 0;
	}

	.search:focus-visible {
		outline: none;
	}

	.searchIcon {
		color: var(--dark3);
		display: flex;
		align-items: center;
		background: white;
		border: 1px solid var(--border);
		border-right: 0;
		border-radius: 10px 0 0 10px;
	}

	.option {
		width: 100%;
		min-height: 40px;
		background: var(--light1);
		font-weight: 300;
	}

	.option:not(:last-child) {
		border-bottom: 1px solid var(--border);
	}

	.option:nth-child(even):not(.selected) {
		background: var(--light4);
	}

	.selected {
		background: var(--secondary);
		color: var(--light1);
	}
	/* select {
		font-size: 12pt;
		padding: 4px;
		margin: 4px;
		border: none;
	} */
</style>
