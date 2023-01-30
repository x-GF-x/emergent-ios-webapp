<script lang="ts">
	import InputBuilder from '$lib/inputs/generics/InputBuilder.svelte';

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
					>
						{#if !field.subFields}
							<InputBuilder {field} value={undefined} />
						{:else}
							<div class="subFields">
								{#each field?.subFields as subField}
									<div class="subField">
										<InputBuilder field={subField} value={undefined} />
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
		min-height: 40px;
		justify-content: center;
	}

	.row:not(:last-child) {
		border-bottom: none;
	}

	.field {
		display: flex;
		flex-direction: column;
	}
	.field:not(:last-child) {
		border-right: 1px solid var(--border);
	}

	.multiSelect {
		padding: 0 10px;
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
	}

	.subField:not(:last-child) {
		border-right: 1px solid var(--border);
	}
</style>
