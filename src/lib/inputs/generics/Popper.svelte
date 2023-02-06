<script lang="ts">
	import ModalBackdrop from '$lib/ui_components/ModalBackdrop.svelte';
	import { reposition, createPopper } from 'nanopop';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';

	export let props: InputProps = undefined;
	export let toggleIcon: ToggleIcon = undefined;
	export let value: any = undefined;
	export let type: FieldTypes | undefined = undefined;
	export let modal = false;

	let toggleButton: HTMLElement;
	let popper: HTMLElement;
	let isOpen = false;
	let overPopper = false; //Prevent 'blur' when mouse is over the popper
	let noneSelected = false;

	const dispatch = createEventDispatcher();

	export const toggle = async () => {
		isOpen = !isOpen;
		if (isOpen) {
			if (!modal) {
				reposition(toggleButton, popper, { position: 'bottom-middle' });
			}
			await tick().then(() => dispatch('open'));
		}
	};

	onMount(() => {
		if (!modal) createPopper(toggleButton, popper);
	});
</script>

<svelte:window
	on:mouseup={() => {
		if (isOpen && !overPopper) toggle();
	}}
/>
<div class="popperContainer">
	<button
		bind:this={toggleButton}
		class:iconToggle={props?.icon}
		disabled={typeof props?.icon === 'string' || noneSelected}
		class="toggleButton"
		class:multiSelect={type === 'multiSelect'}
		on:click={toggle}
		on:mouseenter={() => (overPopper = true)}
		on:mouseleave={() => (overPopper = false)}
	>
		{#if props?.icon}
			<div class="material-symbols-outlined icon">
				{props.icon}
			</div>
		{/if}
		<div class="buttonLabel">
			<div class="value">
				{#if value !== undefined}
					{value}
				{/if}
			</div>
			{#if type === 'multiSelect'}
				<div class="multiNone">
					<button
						class="none"
						on:click|stopPropagation={() => {
							noneSelected = !noneSelected;
							dispatch('noneSelected', { value: noneSelected });
						}}
						class:noneFilled={noneSelected}
					/>
					None
				</div>
			{/if}
		</div>
		{#if toggleIcon}
			<div
				class="material-symbols-outlined caret"
				style:color={noneSelected ? 'lightgray' : toggleIcon?.color}
				style={toggleIcon?.style}
			>
				{isOpen ? toggleIcon.open : toggleIcon.closed}
			</div>
		{/if}
	</button>
	{#if isOpen || !modal}
		<div
			transition:fly={{ duration: modal ? 500 : 0, y: 1000 }}
			bind:this={popper}
			class="popper {!isOpen && !modal ? 'closed' : ''}"
			class:modal
			class:popperBorder={type === 'multiSelect' || type === 'singleSelect'}
			on:mouseenter={() => (overPopper = true)}
			on:mouseleave={() => (overPopper = false)}
		>
			<slot />
		</div>
	{/if}
</div>

{#if modal && isOpen}
	<ModalBackdrop />
{/if}

<style>
	.popper {
		position: fixed;
		width: 350px;
		max-height: 440px;
		overflow: auto;
		z-index: 100;
	}

	.popperBorder {
		border: 1px solid var(--border);
	}

	.closed {
		visibility: hidden;
	}

	.popperContainer {
		min-height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggleButton {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 10px;
	}

	.multiSelect {
		padding: 0;
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
		display: flex;
		justify-content: space-between;
		margin-right: 10px;
		align-items: center;
		width: 100%;
		text-align: initial;
	}

	.multiNone {
		display: flex;
		align-items: center;
	}

	.none {
		height: 20px;
		width: 20px;
		margin-right: 10px;
		border: 1px solid var(--dark1);
	}
	.noneFilled {
		background: var(--dark1);
	}

	.caret {
		color: var(--dark3);
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 10px;
	}

	.modal {
		width: 50vh;
		top: 20vh !important;
		z-index: 100;
	}
</style>
