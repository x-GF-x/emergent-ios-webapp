<script lang="ts">
	import { reposition, createPopper } from 'nanopop';
	import { onMount } from 'svelte';

	export let props: { icon?: string; dropdownLabel?: string } | undefined = undefined;
	export let value: any;

	let toggleButton: HTMLElement;
	let popper: HTMLElement;
	let isOpen = false;
	let overPopper = false; //Prevent 'blur' when mouse is over the popper

	const toggle = () => {
		isOpen = !isOpen;
		if (isOpen) {
			reposition(toggleButton, popper, { position: 'bottom-middle' });
		}
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
				{value}
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
		<slot />
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
</style>
