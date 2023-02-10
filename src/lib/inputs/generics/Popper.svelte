<script lang="ts">
	import ModalBackdrop from '$lib/ui_components/modal/ModalBackdrop.svelte';

	import * as nanopop from 'nanopop';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';

	export let props: InputProps = undefined;
	export let toggleIcon: ToggleIcon = undefined;
	export let value: any = undefined;
	export let type: FieldTypes | undefined = undefined;
	export let hidePopperButton = false;
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
	}}
/>

<div
	class="popperContainer"
	on:mouseenter={() => (overPopper = true)}
	on:mouseleave={() => (overPopper = false)}
	bind:this={toggleButton}
	class:paddingDisabled={props}
	class:multi={type === 'multiSelect'}
>
	{#if !hidePopperButton}
		<button
			class:iconToggle={props?.icon}
			disabled={typeof props?.icon === 'string' || noneSelected}
			class="toggleButton"
			style:padding={type === 'multiSelect' ? 0 : '2px 4px 8px 16px'}
			on:click={toggle}
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
					style:padding={type === 'multiSelect' ? '0 12px' : '0'}
					class:largeIcon={props}
				>
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
		width: 290px;
		max-height: 424px;
		overflow: auto;
		z-index: 100;
		border-radius: 10px;
	}

	.boxShadow {
		box-shadow: 5px 5px 80px 20px lightgrey;
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
		margin-right: 20px;
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

	.multiNone {
		display: flex;
		align-items: center;
		font-weight: var(--weightRegular);
		color: var(--dark1);
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
		color: var(--dark2);
		height: 100%;
		display: flex;
		align-items: center;
		font-weight: var(--weightRegular);
	}

	.largeIcon {
		font-size: var(--fontXXL);
		font-weight: 100;
		margin-top: 4px;
	}

	.value {
		white-space: nowrap;
	}

	.modal {
		width: 452px;
		top: 20vh;
		z-index: 100;
		max-height: 660px;
	}
</style>
