<script lang="ts">
	import Subfields from '$lib/ui_components/Subfields.svelte';
	import { ems_drugs } from '$lib/resource_file/lookups/ems_drugs';

	export let value: { [key: string]: FieldValues } = {};
	export let field: Field = undefined;
	export let chart;
	let drugId = JSON.parse(chart?.card_data)?.drug_id;
	let drug: EmsDrug | undefined = ems_drugs.find((item) => item.drug_id === drugId);

	value.eMedications04 = drug?.default_route;
	value.eMedications06 = drug?.default_unit;

	// console.log(drug, field);

	let subFields: SubField[] = [];

	if (field?.subFields) {
		subFields = field.subFields;
		if (!value) value = {};
		subFields.forEach((subField) => {
			if (!value[subField.id]) value[subField.id] = undefined;
			if (subField.id === 'eMedications04' && drug?.available_routes)
				subField.available_routes = drug.available_routes.split(',  ');
			if (subField.id === 'eMedications06' && drug?.available_units)
				subField.available_units = drug.available_units.split(',  ');
		});
	}
	// console.log(subFields);
</script>

<Subfields bind:value {subFields} />
