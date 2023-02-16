<script lang="ts">
	import SingleSelect from '$lib/inputs/SingleSelect.svelte';

	import { dataStorageAccessor } from '$lib/stores/data';
	import { getContext, tick } from 'svelte';

	let pnNvStorage = getContext('pnNvStorage') as PnNvStorage;
	let pnField: Field | undefined = undefined;
	let pnSelector: SingleSelect;

	export let field: Field;
	export let value = pnNvStorage ? pnNvStorage : $dataStorageAccessor.static_fields; //Value is passed in from cards, except for multiSelects;
	export let disabled = false;

	const handleNv = (e: { detail: { field: Field } }) => {
		if (!value[e.detail.field.id + '_nv']) {
			value[e.detail.field.id + '_nv'] = true;
			disabled = true;
		} else {
			value[e.detail.field.id + '_nv'] = false;
			disabled = false;
		}
		value = value;
	};

	const handlePn = (e: { detail: { field: Field } }) => {
		const { field } = e.detail;
		value[field.id + '_pn'] = undefined;
		value[field.id + '_nv'] = undefined;

		if (pnField) pnField = undefined; //Close popover if open

		if (!disabled) {
			if (field.pn?.length === 1 && !field?.nv) {
				value[field.id + '_pn'] = field.pn[0].code;
				disabled = true;
			} else openPnSelector(field);
		} else disabled = false;

		value = value;
	};

	const openPnSelector = async (field: Field) => {
		pnField = field;
		if (Array.isArray(pnField.pn) && pnField.nv && !pnField.pn.find((item) => item.code === 'nv')) {
			pnField.pn = [...pnField.pn, { code: 'nv', description: 'None' }];
		}
		await tick().then(() => pnSelector?.toggle());
	};

	const selectOptionSelection = (e: { detail: { value: string } }) => {
		if (pnField?.id) {
			const selectedCode = e.detail.value;
			if (selectedCode) {
				disabled = true;
				if (selectedCode === 'nv') {
					value[pnField.id + '_nv'] = true;
					value[pnField.id + '_pn'] = undefined;
				} else {
					value[pnField.id + '_pn'] = selectedCode;
					value[pnField.id + '_nv'] = undefined;
				}
			} else disabled = false;
			value = value;
		}
	};
</script>

<div class="pnNvContainer">
	{#if field.type === 'multiSelect'}
		<div class="none">None</div>
	{/if}

	<button
		disabled={$dataStorageAccessor.readonly}
		class="notValue"
		class:material-symbols-outlined={field.type !== 'multiSelect'}
		class:multiCheckbox={field.type === 'multiSelect'}
		class:multiCheckboxFilled={disabled && field.type === 'multiSelect'}
		on:click|stopPropagation={() =>
			field.pn ? handlePn({ detail: { field: field } }) : handleNv({ detail: { field: field } })}>
		{field.type === 'multiSelect' ? '' : 'block'}
	</button>
</div>
{#if pnField?.id}
	<SingleSelect
		bind:this={pnSelector}
		passedInOptions={pnField.pn}
		hidePopperButton
		value={undefined}
		on:selectOption={(e) => selectOptionSelection(e)} />
{/if}

<style>
	.notValue {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 60px;
		font-weight: 200;
		color: var(--dark2);
		font-size: var(--fontXL);
		border-left: var(--1pxBorder);
	}

	.pnNvContainer {
		display: flex;
		flex-direction: row;
		height: 100%;
		align-items: center;
	}

	.none {
		margin-right: 10px;
	}

	.multiCheckbox {
		height: 20px;
		width: 20px;
		margin-right: 10px;
		border: 1px solid var(--dark1);
		display: flex;
		align-items: center;
		font-weight: var(--weightRegular);
		color: var(--dark1);
	}
	.multiCheckboxFilled {
		background: var(--dark1);
	}
</style>
