<script lang="ts">
	import Age from '$lib/inputs/Age.svelte';
	import DatePicker from '$lib/inputs/DatePicker.svelte';
	import MultiSelect from '$lib/inputs/MultiSelect.svelte';
	import Numeric from '$lib/inputs/Numeric.svelte';
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';
	import Text from '$lib/inputs/Text.svelte';

	import type { PageData } from './$types';

	let inputs = {
		singleSelect: SingleSelect,
		date: DatePicker,
		numeric: Numeric,
		text: Text,
		age: Age,
		multiSelect: MultiSelect
	};

	export let data: PageData;
	console.log(data);

	let widthConversion = { oneThird: '33.33', full: '100', half: '50' };
</script>

<h1>{data.properties.title}</h1>
<div class="list">
	{#each data.rows as row}
		<div class="row">
			{#each row.fields as field}
				<div
					class="field"
					style:padding={!field.subFields ? '10px' : ''}
					style:width={`${widthConversion[field.width]}%`}
				>
					{#if !field.subFields}
						{field.title}
						<svelte:component this={inputs[field.type]} />
					{:else}
						<div class="subFields">
							{#each field?.subFields as subField}
								<div class="subField">
									{#if !subField.data}
										{subField.title}
										<svelte:component this={inputs[subField.type]} />
									{:else}
										<div class="dataBlock">
											<u>{subField.title}</u>
											{#each subField.data as dataObject}
												<div class="dataObject">
													- {dataObject.value}
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		max-width: 1200px;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.row:nth-child(odd) {
		background: lightgray;
	}

	.field {
		border: 1px solid;
		display: flex;
		flex-direction: column;
	}

	.subFields {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.subField {
		width: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid;
		padding: 10px;
	}
</style>
