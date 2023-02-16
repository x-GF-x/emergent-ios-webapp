<script lang="ts">
	import Address from './Address.svelte';

	import { nameEdited } from '$lib/stores/data';

	export let value: string = '';
	export let field: Field;
	export let fromModal = false;
	export let disabled = false;
	export let disabledValue: string | undefined = undefined;

	let multiline = field?.multiline;
	let address: Address;
</script>

{#if field.id === 'ePatient06'}
	<Address bind:this={address} {field} bind:value />
{/if}

{#if multiline}
	<!-- svelte-ignore a11y-autofocus -->
	<div class="textareaContainer">
		<textarea
			style:height={fromModal ? '270px' : '120px'}
			{disabled}
			placeholder="Note"
			autofocus={fromModal ? true : false}
			bind:value />
	</div>
{:else if disabledValue}
	<div class="text">{disabledValue}</div>
{:else}
	<input
		{disabled}
		on:blur={() => {
			if (field.id === 'ePatient03' || field.id === 'ePatient02') $nameEdited = !$nameEdited;
		}}
		class="text"
		type="text"
		bind:value
		on:keydown={() => {
			if (address) {
				if (value?.length && value.length > 1) {
					address?.openPopper();
				} else address?.closePopper();
			}
		}} />
{/if}

<style>
	.textareaContainer {
		padding-top: 10px;
		padding-left: 12px;
		height: 100%;
	}

	textarea,
	.text {
		border: none;
		font-size: var(--fontSmall);
		font-weight: var(--weightBold);
		caret-color: var(--primary);
		background: transparent;
	}

	.text {
		padding: 2px 8px 8px 16px;
		width: 100%;
	}

	textarea {
		display: flex;
		font-family: inherit;
		resize: vertical;
		width: 100%;
		padding: 0px;
	}

	textarea:focus-visible,
	.text:focus-visible {
		outline: none;
	}
</style>
