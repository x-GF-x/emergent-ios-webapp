import { fieldOptions } from '$lib/resource_file/lookups/lookups';

let setterId = ''; //ID of subfield that is of type date
let numericId = '';
let selectId = '';
let options: DropDownOption[] = [];

export const setValues = ({
	subFields: subFields,
	value: value
}: {
	subFields: SubField[];
	value: { [key: string]: FieldValues };
}) => {
	if (subFields) {
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
};

export const setAgeValueAndUnit = ({
	value: value,
	dateToRead: dateToRead,
	subFields: subFields
}: {
	dateToRead: FieldValues;
	subFields: SubField[];
	value: { [key: string]: FieldValues };
}) => {
	if (typeof dateToRead === 'string') {
		const dob = new Date(dateToRead);
		const currentDate = new Date();

		if (dob > currentDate) {
			value[numericId] = 0;
			return;
		}

		const timeDifference = currentDate.getTime() - dob.getTime();
		const minuteDifference = timeDifference / (1000 * 60);
		const hourDifference = timeDifference / (1000 * 3600);
		const dayDifference = timeDifference / (1000 * 3600 * 24);
		const monthDifference = dayDifference / 30;
		const yearDifference = dayDifference / 365;

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

		if (dayDifference <= 2) {
			return addTimeField(subFields);
		} else {
			return removeTimeField(subFields);
		}
	}
};

const removeTimeField = (subFields: SubField[]) => {
	return subFields.filter((field) => field.id !== 'time');
};

const addTimeField = (subFields: SubField[]) => {
	if (!subFields.find((field) => field.id === 'time')) {
		return subFields.splice(1, 0, {
			id: 'time',
			style: 'time',
			title: 'Time of Birth',
			type: 'date'
		});
	}
};

//tack time onto date
export const applyTime = ({
	value: value,
	subFields: subFields
}: {
	value: { [key: string]: FieldValues };
	subFields: SubField[];
}) => {
	if (typeof value?.time === 'string' && value?.time?.length === 8) {
		const firstTwoOfTime = Number(value.time.slice(0, 2));
		let amOrPm;
		if (firstTwoOfTime < 12) {
			amOrPm = 'AM';
		} else {
			amOrPm = 'PM';
			value.time = value.time.replace(firstTwoOfTime.toString(), (firstTwoOfTime - 12).toString());
		}
		const originalDateString = value?.[setterId]?.toString();
		const timelessDate = new Date(originalDateString ? originalDateString : '');
		if (timelessDate instanceof Date && !isNaN(timelessDate.getTime())) {
			const dateWithTime = new Date(
				timelessDate.toLocaleString().replace('12:00:00 AM', `${value.time} ${amOrPm}`)
			).toString();
			return setAgeValueAndUnit({ dateToRead: dateWithTime, value: value, subFields: subFields });
		}
	}
};
