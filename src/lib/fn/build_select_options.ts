import { fieldOptions } from '$lib/resource_file/lookups/lookups';
import { ems_drugs } from '$lib/resource_file/lookups/ems_drugs';
import { quickchartMapping } from '$lib/resource_file/ui/ui_quickchart_mapping';
import { scenes } from '$lib/resource_file/ui/ui_scenes';
import { cards } from '$lib/resource_file/ui/ui_cards';

export const standard_options = (field: Field | SubField | undefined) => {
	const fieldLookupId = field?.key;
	return fieldOptions.filter(
		(option) =>
			//Type is a reference to ui_cards
			option.type === fieldLookupId &&
			//If it is a drug, we want to limit units/routes to those specified by field
			(!field ||
				!('available_units' in field) ||
				(field && field.available_units?.includes(option.code))) &&
			(!field ||
				!('available_routes' in field) ||
				(field && field.available_routes?.includes(option.code)))
	);
};

export const drug_options = () => {
	return ems_drugs.map((item) => {
		return {
			code: item.drug_id,
			id: item.id,
			type: 'drug',
			value: item.name
		};
	});
};

export const score_card_options = (field: Field | SubField | undefined) => {
	if (field && 'data' in field && field.data) {
		if (field.data)
			field.data.forEach((option) => {
				if ('description' in option && typeof option.description === 'string')
					option.value = option.description;
			});
		return field.data;
	}
	return [];
};

export const clinical_impression_options = () => {
	return quickchartMapping.map((item) => {
		item.value = item.code_description;
		item.code = item.qc_key;
		return item;
	});
};

export const timeline_options = () => {
	return scenes
		.filter((item) => item.scene_id === 'ems_timeline')
		.map((item) => {
			const matchingCard = cards.find((card) => card.card_id === item.card_id);
			if (matchingCard)
				return {
					code: matchingCard.card_id,
					value: matchingCard.title,
					id: matchingCard.id,
					type: ''
				};
		});
};
export const person_options = (data: DataStorage) => {
	return data.persons.map((item, itemIndex) => {
		return {
			code: item.uuid,
			value: build_name(item, itemIndex),
			description: build_name(item, itemIndex)
		};
	});
};

export const build_name = (value: PersonStorage, index: number) => {
	const firstName =
		value?.static_fields?.ePatient03 && typeof value?.static_fields?.ePatient03 === 'string'
			? value.static_fields.ePatient03
			: '';
	const lastName =
		value?.static_fields?.ePatient02 && typeof value?.static_fields?.ePatient02 === 'string'
			? value.static_fields.ePatient02
			: '';

	return firstName || lastName ? firstName + ' ' + lastName : 'Patient ' + (index + 1);
};
