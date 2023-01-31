<script lang="ts">
	import InputBuilder from './generics/InputBuilder.svelte';
	import { fieldOptions } from '$lib/resource_file/lookups/lookups';

	export let value: any;
	export let field: Field;
	// export let isStaticField = false;
	// if (isStaticField && field?.id && !('card_id' in value)) value = value.static_fields[field.id];

	let subFields: SubField[];
	let setterId = ''; //ID of subfield that is of type date
	let numericId = '';
	let selectId = '';
	let options: DropDownOption[] = [];

	if (field?.subFields) {
		subFields = field.subFields;
		if (!value) value = {};
		subFields.forEach((subField) => {
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
		});
	}

	const setAgeValueAndUnit = (dateToRead: { value: string } | undefined | number | string) => {
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

	$: value?.[setterId], setAgeValueAndUnit(value?.[setterId]);

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

	$: value?.time, applyTime();

	//ePatient17 = date
	//ePatient15 = age
	//ePatient16 = age type
	// $: console.log(value);
</script>

{#if Array.isArray(field?.subFields)}
	<div class="subFields">
		{#each subFields as subField}
			{#if value}
				<div class="subField">
					<InputBuilder field={subField} bind:value={value[subField.id]} />
				</div>
			{/if}
		{/each}
	</div>
{/if}

<style>
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
