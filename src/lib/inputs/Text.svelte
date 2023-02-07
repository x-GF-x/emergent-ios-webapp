<script lang="ts">
	export let value: string | undefined;
	export let field: Field;
	export let fromModal = false;
	let multiline = field?.multiline;
</script>

{#if multiline}
	<!-- svelte-ignore a11y-autofocus -->
	<textarea autofocus={fromModal ? true : false} bind:value cols="30" />
{:else}
	<input class="text" type="text" bind:value />
{/if}

<style>
	textarea,
	.text {
		border: none;
		font-size: 12pt;
		caret-color: var(--primary);
		background: var(--light2);
		padding-left: 10px;
	}

	.text {
		height: 35px;
	}

	textarea {
		height: 100px;
		font-family: inherit;
		padding-top: 10px;
	}

	textarea:focus-visible,
	.text:focus-visible {
		outline: none;
	}
</style>
