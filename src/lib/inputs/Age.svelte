<script lang="ts">
	import Subfields from '$lib/ui_components/Subfields.svelte';

	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let value: { [key: string]: FieldValues } = {};
	export let field: Field;
	export let disabled = false;

	let subFields: SubField[];
	let setterId = ''; //ID of subfield that is of type date
	let numericId = '';
	let selectId = '';
	let options: DropDownOption[] = [];

	if (field?.subFields) {
		subFields = field.subFields;
		if (!value) value = {};
		subFields.forEach((subField) => {
			if (subField.id) {
				if (!value[subField.id]) value[subField.id] = undefined;
				if (subField.type === 'date') {
					setterId = subField.id;
				}
				if (subField.type === 'numeric') {
					numericId = subField.id;
				} else if (subField.type === 'singleSelect' && subField.key) {
					selectId = subField.id;
					options = fieldOptions.filter((option) => option.type === subField.key);
				}
			}
		});
	}

	const setAgeValueAndUnit = (dateToRead: FieldValues) => {
		if (typeof dateToRead === 'string') {
			let dob = new Date(dateToRead);
			let currentDate = new Date();
			if (dob > currentDate) {
				value[numericId] = 0;
				return;
			}
			let timeDifference = currentDate.getTime() - dob.getTime();
			let minuteDifference = timeDifference / (1000 * 60);
			let hourDifference = timeDifference / (1000 * 3600);
			let dayDifference = timeDifference / (1000 * 3600 * 24);
			let monthDifference = dayDifference / 30;
			let yearDifference = dayDifference / 365;

			if (dayDifference <= 2) {
				addTimeField();
			} else {
				removeTimeField();
			}
			if (yearDifference >= 2) {
				value[selectId] = options.find((option) => option.value === 'Years')?.code;
				value[numericId] = Math.floor(yearDifference);
			} else if (monthDifference >= 1) {
				value[selectId] = options.find((option) => option.value === 'Months')?.code;
				value[numericId] = Math.floor(monthDifference);
			} else if (dayDifference >= 1) {
				value[selectId] = options.find((option) => option.value === 'Days')?.code;
				value[numericId] = Math.floor(dayDifference);
			} else if (hourDifference >= 1) {
				value[selectId] = options.find((option) => option.value === 'Hours')?.code;
				value[numericId] = Math.floor(hourDifference);
			} else {
				value[selectId] = options.find((option) => option.value === 'Minutes')?.code;
				value[numericId] = Math.floor(minuteDifference);
			}
		}
	};

	const removeTimeField = () => {
		subFields = subFields.filter((field) => field.id !== 'time');
		subFields = subFields;
	};

	const addTimeField = () => {
		if (!subFields.find((field) => field.id === 'time')) {
			subFields.splice(1, 0, {
				id: 'time',
				style: 'time',
				title: 'Time of Birth',
				type: 'date'
			});
			subFields = subFields;
		}
	};

	//tack time onto date
	const applyTime = () => {
		if (typeof value?.time === 'string' && value?.time?.length === 8) {
			let firstTwoOfTime = Number(value.time.slice(0, 2));
			let amOrPm;
			if (firstTwoOfTime < 12) {
				amOrPm = 'AM';
			} else {
				amOrPm = 'PM';
				value.time = value.time.replace(
					firstTwoOfTime.toString(),
					(firstTwoOfTime - 12).toString()
				);
			}
			let originalDateString = value?.[setterId]?.toString();
			let timelessDate = new Date(originalDateString ? originalDateString : '');
			if (timelessDate instanceof Date && !isNaN(timelessDate.getTime())) {
				let dateWithTime = new Date(
					timelessDate.toLocaleString().replace('12:00:00 AM', `${value.time} ${amOrPm}`)
				).toString();
				setAgeValueAndUnit(dateWithTime);
			}
		}
	};
</script>

<Subfields
	bind:value
	{subFields}
	{disabled}
	on:setDate={(e) => {
		const { id } = e.detail;
		if (id === setterId) setAgeValueAndUnit(value?.[setterId]);
		else if (id === 'time') applyTime();
	}} />
