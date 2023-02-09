<script lang="ts">
	let files: FileList;

	const getBase64 = (file: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => console.log(reader.result);
		reader.onerror = (error) => console.log('Error: ', error);
	};

	$: files, getBase64(files?.[0]);
</script>

<input type="file" bind:files />

<p>
	{files?.[0]?.name}
</p>

<!-- <button
	id="button"
	on:click={() => {
		if (files.length > 0) {
			getBase64(files[0]);
		}
	}}>Convert</button
> -->
