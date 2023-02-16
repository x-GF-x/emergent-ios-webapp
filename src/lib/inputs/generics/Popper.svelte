<script lang="ts">
	import ModalBackdrop from '$lib/ui_components/modal/ModalBackdrop.svelte';
	import PnNv from '$lib/ui_components/PnNv.svelte';

	import * as nanopop from 'nanopop';
	import { createEventDispatcher, getContext, onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';

	export let props: InputProps = undefined;
	export let toggleIcon: ToggleIcon = undefined;
	export let value: any = undefined;
	export let type: FieldTypes | undefined = undefined;
	export let hidePopperButton = false;
	export let modal = false;
	export let field: Field = {};
	export let disabled = false;

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
				nanopop.reposition(toggleButton, popper, {
					position: hidePopperButton ? 'top-end' : 'bottom-middle'
				});
			}
			await tick().then(() => dispatch('open'));
		}
	};

	onMount(() => {
		if (!modal) nanopop.createPopper(toggleButton, popper);
	});
</script>

<svelte:window
	on:mouseup={() => {
		if (isOpen && !overPopper) toggle();
	}} />

<div
	class="popperContainer"
	on:mouseenter={() => (overPopper = true)}
	on:mouseleave={() => (overPopper = false)}
	bind:this={toggleButton}
	class:paddingDisabled={props}
	class:multi={type === 'multiSelect'}>
	{#if !hidePopperButton}
		<button
			class:iconToggle={props?.icon}
			disabled={typeof props?.icon === 'string' || noneSelected || disabled}
			class="toggleButton"
			style:padding={type === 'multiSelect' || props ? 0 : '2px 4px 8px 16px'}
			on:click={toggle}>
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
					<PnNv {field} on:handlePnNv />
				{/if}
			</div>
			{#if toggleIcon}
				<div
					class="material-symbols-outlined caret"
					class:multiSelect={type === 'multiSelect'}
					class:largeIcon={props}
					style={toggleIcon?.style}
					style:color={noneSelected ? 'lightgray' : toggleIcon?.color}>
					{isOpen ? toggleIcon.open : toggleIcon.closed}
				</div>
			{/if}
		</button>
	{/if}
	{#if isOpen || !modal}
		<div
			transition:fly={{ duration: modal ? 500 : 0, y: 1000 }}
			bind:this={popper}
			class="popper {!isOpen && !modal ? 'closed' : ''} {!modal ? 'boxShadow' : ''}"
			class:modal
			on:mouseenter={() => (overPopper = true)}
			on:mouseleave={() => (overPopper = false)}>
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
		width: 290px;
		max-height: 424px;
		overflow: auto;
		z-index: 100;
		border-radius: 10px;
	}

	.boxShadow {
		box-shadow: 1px 1px 80px 1px var(--modalBoxShadow);
		max-width: max-content;
	}

	.closed {
		visibility: hidden;
	}

	.popperContainer {
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
		font-size: var(--fontSmall);
		font-weight: var(--weightBold);
	}

	.paddingDisabled {
		padding: 0;
		height: 100%;
	}

	.multi {
		padding: 0 0 0 16px;
		min-height: 48px;
	}

	.icon {
		margin: 0 16px;
	}

	.iconToggle {
		color: var(--secondary);
		display: flex;
		align-items: center;
		padding: 10px;
		border: var(--1pxBorder);
		border-radius: 5px;
	}

	.buttonLabel {
		display: flex;
		justify-content: space-between;
		margin-right: 10px;
		align-items: center;
		width: 100%;
		text-align: initial;
	}

	.caret {
		color: var(--dark2);
		height: 100%;
		display: flex;
		padding: 0;
		align-items: center;
		font-weight: var(--weightRegular);
	}

	.multiSelect {
		height: 48px;
		padding: 0 12px;
	}

	.largeIcon {
		font-size: var(--fontXXL);
		font-weight: 100;
		margin-top: 4px;
	}

	.value {
		/* white-space: nowrap; */
		width: 100%;
	}

	.modal {
		width: 452px;
		top: 20vh;
		z-index: 100;
		max-height: 660px;
	}
</style>
