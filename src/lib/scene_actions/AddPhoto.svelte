<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value: DataStorage;
	export let selectedTab: Tab;
	console.log(value);
	value = value;
	selectedTab = selectedTab;

	let files: FileList;
	let fileInput: HTMLInputElement;

	const getBase64 = (file: File) => {
		if (file) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				// console.log(reader.result);
				if (reader.result) {
					value.photo.push({
						card_id: 'photo',
						fields: {
							image_type: 'Default Type',
							name: 'Image ' + (value.photo.length + 1),
							value: reader.result.toString()
						}
					});
					value = value;
					console.log('success');
				}
			};
			reader.onerror = (error) => console.log('Error: ', error);
			dispatch('close');
		}
	};

	const checkOnCancel = () => {
		if (!files) {
			dispatch('close');
		}
	};

	onMount(() => fileInput.click());
</script>

<svelte:window
	on:focus={() => {
		setTimeout(checkOnCancel, 500);
	}}
/>

<input bind:this={fileInput} type="file" bind:files on:change={() => getBase64(files?.[0])} />

<style>
	input {
		display: none;
	}
</style>
