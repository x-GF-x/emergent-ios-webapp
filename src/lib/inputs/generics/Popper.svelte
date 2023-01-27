<script lang="ts">
	import { reposition, createPopper } from 'nanopop';
	import { createEventDispatcher, onMount, tick } from 'svelte';

	export let props: InputProps = undefined;
	export let toggleIcon: ToggleIcon = undefined;
	export let value: any;

	let toggleButton: HTMLElement;
	let popper: HTMLElement;
	let isOpen = false;
	let overPopper = false; //Prevent 'blur' when mouse is over the popper

	const dispatch = createEventDispatcher();

	export const toggle = async () => {
		isOpen = !isOpen;
		if (isOpen) {
			reposition(toggleButton, popper, { position: 'bottom-middle' });
			await tick().then(() => dispatch('open'));
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
		disabled={typeof props?.icon === 'string'}
		class="toggleButton"
		on:click={toggle}
		on:mouseenter={() => (overPopper = true)}
		on:mouseleave={() => (overPopper = false)}
	>
		{#if props?.icon}
			<div class="material-icons icon">
				{props.icon}
			</div>
		{/if}
		<div class="buttonLabel">
			<div class="value">
				{#if value !== undefined}
					{value}
				{/if}
			</div>
		</div>
		{#if toggleIcon}
			<div class="material-icons caret">{isOpen ? toggleIcon.open : toggleIcon.closed}</div>
		{/if}
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
		max-height: 540px;
		overflow: auto;
		z-index: 100;
	}

	.closed {
		visibility: hidden;
	}

	.wrapper {
		min-height: 44px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggleButton {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding: 10px 0;
	}

	.icon {
		margin-right: 20px;
	}

	.iconToggle {
		color: var(--secondary);
		display: flex;
		align-items: center;
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 5px;
		max-height: 44px;
	}

	.buttonLabel {
		display: grid;
		/* grid-template-columns: 50% 50%; */
		align-items: center;
		width: 100%;
		text-align: initial;
	}

	.caret {
		color: var(--dark3);
	}
</style>
