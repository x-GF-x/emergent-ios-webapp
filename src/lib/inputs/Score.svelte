<script lang="ts">
	import SingleSelect from './SingleSelect.svelte';

	export let value: { [key: string]: ScoreObject };
	export let field: Field;
	export let disabled = false;
	export let fromModal = false;
	fromModal = fromModal;
	export let pnNvStorage: ActionItem['fields'] | undefined = undefined;
	pnNvStorage = pnNvStorage;

	const mathOperations = {
		'+': (val: number) => {
			totalScore += val;
		},
		'-': (val: number) => {
			totalScore -= val;
		}
	};

	let totalScore = 0;
	$: {
		totalScore = 0;
		Object.values(value).forEach((item) => {
			if (item.operator && item.operand) mathOperations[item.operator](item.operand);
		});
	}

	if (!value) {
		value = {};
		field?.scoreFields?.forEach((scoreField) => {
			if (scoreField?.id) value[scoreField.id] = { value: ' ' };
		});
	}
</script>

<div class="scoreContainer">
	{#if field?.scoreFields}
		<div class="scoreFields">
			{#each field.scoreFields as scoreField}
				<div class="scoreField">
					{#if scoreField?.id}
						<div class="fieldTitle">
							{scoreField.title}
						</div>
						<SingleSelect {disabled} field={scoreField} bind:value={value[scoreField.id]} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	<div class="score">
		<div class="scoreTitle">Total Score</div>
		<div class="result">
			{totalScore ? totalScore : '-'}
		</div>
	</div>
</div>

<style>
	.scoreContainer {
		display: grid;
		grid-template-columns: 66% 34%;
	}

	.scoreFields {
		display: flex;
		flex-direction: column;
	}

	.scoreField:not(:last-child) {
		border-bottom: var(--1pxBorder);
	}

	.score {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-left: var(--1pxBorder);
		background: var(--light4);
		font-weight: var(--weightBold);
	}

	.result {
		font-size: var(--fontScore);
		font-weight: var(--weightSemiBold);
	}

	.fieldTitle {
		padding: 8px 8px 0 16px;
		font-weight: var(--weightRegular);
		font-size: var(--fontSmall);
		color: var(--dark2);
	}
</style>
