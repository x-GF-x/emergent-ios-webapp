<script lang="ts">
	import Subfields from '$lib/ui_components/Subfields.svelte';

	import { ems_drugs } from '$lib/resource_file/lookups/ems_drugs';
	import { onMount } from 'svelte';

	export let value: { [key: string]: FieldValues } = {};
	export let field: Field | undefined = undefined;
	export let chart;
	export let disabled = false;

	let drugId = chart?.card_data ? JSON.parse(chart?.card_data)?.drug_id : undefined;
	let drug: EmsDrug | undefined = undefined;
	let subFields: SubField[] = [];

	const setDrug = () => {
		drug = drugId ? ems_drugs.find((item) => item.drug_id === drugId) : undefined;
		if (drug) {
			value.eMedications03 = drug.drug_id;
			value.eMedications04 = drug.default_route;
			value.eMedications06 = drug.default_unit;
		}
	};

	const changeDrugId = (e: { detail: { value: string } }) => {
		drugId = e.detail.value;
		setDrug();
		setSubFields();
		if (value.eMedications05) value.eMedications05 = undefined;
	};
	const setSubFields = () => {
		subFields.forEach((subField) => {
			if (subField.id) {
				if (!value[subField.id]) value[subField.id] = undefined;
				if (subField.id === 'eMedications04')
					drug?.available_routes
						? (subField.available_routes = drug.available_routes.split(',  '))
						: delete subField?.available_routes;
				else if (subField.id === 'eMedications06')
					drug?.available_units
						? (subField.available_units = drug.available_units.split(',  '))
						: delete subField?.available_units;
			}
		});
		subFields = subFields;
	};

	onMount(() => {
		setDrug();
		if (field?.subFields) {
			subFields = field.subFields;
			if (!value) value = {};
			setSubFields();
		}
	});
</script>

<Subfields bind:value {disabled} {subFields} on:changeDrug={(e) => changeDrugId(e)} />
