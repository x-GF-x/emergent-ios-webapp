<script lang="ts">
	export let value: string | undefined;
	export let field: Field;
	export let fromModal = false;
	let multiline = field?.multiline;
</script>

{#if multiline}
	<!-- svelte-ignore a11y-autofocus -->
	<textarea placeholder="Note" autofocus={fromModal ? true : false} bind:value cols="30" />
{:else}
	<input class="text" type="text" bind:value />
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
