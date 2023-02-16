<script lang="ts">
	import Address from './Address.svelte';

	export let value: string = '';
	export let field: Field;
	export let fromModal = false;
	export let disabled = false;

	let multiline = field?.multiline;
	let address: Address;
</script>

{#if field.id === 'ePatient06'}
	<Address bind:this={address} {field} bind:value />
{/if}

{#if multiline}
	<!-- svelte-ignore a11y-autofocus -->
	<textarea {disabled} placeholder="Note" autofocus={fromModal ? true : false} bind:value />
{:else}
	<input
		{disabled}
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
	textarea,
	.text {
		border: none;
		font-size: var(--fontSmall);
		font-weight: var(--weightBold);
		caret-color: var(--primary);
	}

	.text {
		padding: 2px 8px 8px 16px;
		width: 100%;
		background: transparent;
	}

	textarea {
		display: flex;
		font-family: inherit;
		resize: vertical;
		width: 100%;
		height: 270px;
		padding: 0px;
		text-indent: 10px;
		padding-top: 5px;
	}

	textarea:focus-visible,
	.text:focus-visible {
		outline: none;
	}
</style>
