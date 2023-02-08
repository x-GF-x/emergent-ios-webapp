<script lang="ts">
	import CardModal from '$lib/ui_components/modal/CardModal.svelte';

	export let data: CardJson;
	export let value: Photo;

	let isOpen = false;
	let link: HTMLAnchorElement;
	let cardValue: { [key: string]: string } = {
		name: value.fields.name,
		image_type: value.fields.image_type
	};

	const openImage = () => {
		window.localStorage.setItem('photo_src', value.fields.value);
		window.localStorage.setItem('photo_alt', value.fields.image_type);
		link.click();
	};
</script>

<div class="photoContainer">
	<a bind:this={link} href="/image" target="_blank"><!-- Click from openImage --> </a>
	<button on:click={openImage}>
		<img class="photo" src={value.fields.value} alt={value.fields.image_type} />
	</button>
	<button class="nameAndType" on:click={() => (isOpen = !isOpen)}>
		<div class="stack">
			<div class="name">{value.fields.name}</div>
			<div class="type">{value.fields.image_type}</div>
		</div>
		<div class="material-symbols-outlined">edit</div>
	</button>
</div>

{#if isOpen}
	<CardModal
		{data}
		bind:value={cardValue}
		on:backdropClick={() => (isOpen = false)}
		on:updateModal={() => {
			value.fields.name = cardValue.name;
			value.fields.image_type = cardValue.image_type;
			isOpen = false;
		}}
	/>
{/if}

<style>
	button {
		padding: 0;
	}

	.photoContainer {
		width: 250px;
		height: 250px;
		position: relative;
		margin: 15px;
	}

	.photo {
		width: 250px;
		height: 250px;
		overflow: hidden;
		object-fit: cover;
	}

	.nameAndType {
		position: absolute;
		bottom: 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		width: 100%;
		background: rgba(0, 0, 0, 0.673);
		color: var(--light1);
	}
	.name {
		padding-bottom: 5px;
	}

	.stack {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
