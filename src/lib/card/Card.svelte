<script lang="ts">
	import Age from '$lib/inputs/Age.svelte';
	import DatePicker from '$lib/inputs/DatePicker.svelte';
	import MultiSelect from '$lib/inputs/MultiSelect.svelte';
	import Numeric from '$lib/inputs/Numeric.svelte';
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';
	import Text from '$lib/inputs/Text.svelte';

	let inputs = {
		singleSelect: SingleSelect,
		date: DatePicker,
		numeric: Numeric,
		text: Text,
		age: Age,
		multiSelect: MultiSelect
	};

	export let data: CardJson;

	let widthConversion = { oneThird: '33.33', full: '100', half: '50' };
</script>

<div class="list">
	<button class="listHeader">
		<div class="material-icons">unfold_less</div>
		<h3>{data.properties.title}</h3>
	</button>
	<div class="rows">
		{#each data.rows as row}
			<div class="row">
				{#each row.fields as field}
					<div
						style:width={`${widthConversion[field.width]}%`}
						class="field"
						class:multiSelect={field.type === 'multiSelect'}
						class:padding={!field.subFields && field.type !== 'multiSelect'}
					>
						{#if !field.subFields}
							{#if field.type !== 'multiSelect'}
								<div class="fieldTitle">
									{field?.title}
								</div>
							{/if}
							<svelte:component this={inputs[field.type]} {field} value={undefined} />
						{:else}
							<div class="subFields">
								{#each field?.subFields as subField}
									<div class="subField">
										{#if !subField.data}
											{#if subField.type !== 'multiSelect'}
												<div class="fieldTitle">
													{subField?.title}
												</div>
											{/if}
											<svelte:component
												this={inputs[subField.type]}
												field={subField}
												value={undefined}
											/>
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
</div>

<style>
	.list {
		display: flex;
		flex-direction: column;
		max-width: 1200px;
		margin: 0 10px 10px 10px;
		background: var(--light2);
		border: 1px solid var(--border);
		border-radius: 5px;
	}

	.listHeader {
		display: flex;
		align-items: center;
		color: var(--secondary);
		border-bottom: 1px solid var(--border);
		font-weight: 300;
		font-size: 10pt;
	}

	.rows {
		margin: 15px;
	}

	.row {
		display: flex;
		flex-direction: row;
		border: 1px solid var(--border);
	}

	.row:not(:last-child) {
		border-bottom: none;
	}

	.fieldTitle {
		font-weight: 200;
		font-size: 10pt;
	}

	.field {
		display: flex;
		flex-direction: column;
	}
	.field:not(:last-child) {
		border-right: 1px solid var(--border);
	}

	.padding {
		padding: 10px 10px 0 10px;
	}

	.multiSelect {
		padding: 0 10px;
		min-height: 50px;
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
		padding: 10px 10px 0 10px;
	}

	.subField:not(:last-child) {
		border-right: 1px solid var(--border);
	}
</style>
