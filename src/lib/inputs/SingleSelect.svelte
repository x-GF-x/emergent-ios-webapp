<script lang="ts">
	import { reposition, createPopper } from 'nanopop';
	import { onMount } from 'svelte';

	export let options: { value: string; label: string }[] = [
		{ value: '1', label: 'One' },
		{ value: '2', label: 'Two' }
	];

	export let props: { buttonLabel?: string; icon?: string; dropdownLabel?: string } | undefined =
		undefined;

	let toggleButton: HTMLElement;
	let popper: HTMLElement;
	let isOpen = false;

	const toggle = () => {
		isOpen = !isOpen;
		if (isOpen) {
			reposition(toggleButton, popper, { position: 'bottom-middle' });
		}
	};
	let searchSelected = false;
	onMount(() => {
		createPopper(toggleButton, popper);
	});
</script>

<svelte:window
	on:mouseup={() => {
		if (isOpen && !searchSelected) toggle();
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
			{props?.buttonLabel ? props.buttonLabel : ''}
		</div>
		<div class="material-icons caret">expand_more</div>
	</button>
	<div bind:this={popper} class="popper {!isOpen ? 'closed' : ''}">
		<div class="dropdown">
			{#if props?.dropdownLabel}
				<div class="dropdownLabel">
					{props.dropdownLabel}
				</div>
				<div class="dropdownLabel">
					<div class="material-icons searchIcon">search</div>
					<input
						class="search"
						on:mousedown={() => (searchSelected = true)}
						on:click={() => (searchSelected = false)}
						placeholder="Search..."
						type="search"
					/>
				</div>
			{/if}
			<div class="options">
				{#each options as option}
					<button
						on:click={() => {
							console.log(option.value);
						}}
						class="option"
					>
						{option.label}</button
					>
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
	}

	.iconToggle {
		color: var(--secondary);
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 5px;
	}

	.buttonLabel {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
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

	.option:nth-child(even) {
		background: var(--light4);
	}
	/* select {
		font-size: 12pt;
		padding: 4px;
		margin: 4px;
		border: none;
	} */
</style>
