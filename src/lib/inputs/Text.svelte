<script lang="ts">
	import Address from './Address.svelte';

	export let value: string = '';
	export let field: Field;
	export let fromModal = false;

	let multiline = field?.multiline;
	let address: Address;
</script>

{#if field.id === 'ePatient06'}
	<Address bind:this={address} {field} bind:value />
{/if}

{#if multiline}
	<!-- svelte-ignore a11y-autofocus -->
	<textarea placeholder="Note" autofocus={fromModal ? true : false} bind:value cols="30" />
{:else}
	<input
		class="text"
		type="text"
		bind:value
		on:keydown={() => {
			if (address) {
				if (value?.length && value.length > 1) {
					address?.openPopper();
				} else address?.closePopper();
			}
		}}
	/>
{/if}

<style>
	textarea,
	.text {
		border: none;
		font-size: var(--fontSmall);
		font-weight: var(--weightBold);
		caret-color: var(--primary);
		padding-left: 10px;
	}

	.text {
		padding: 2px 8px 8px 16px;
		width: 100%;
		background: transparent;
	}

	textarea {
		height: 270px;
		font-family: inherit;
		padding-top: 10px;
		resize: vertical;
	}

	textarea:focus-visible,
	.text:focus-visible {
		outline: none;
	}
</style>
