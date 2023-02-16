import { base64, base64_2 } from '$lib/resource_file/base64_example';

export const default_value: PersonStorage = {
	readonly: false,
	created: new Date().toISOString(),
	last_modified: new Date().toISOString(),
	uuid: crypto.randomUUID(),
	actions: [],
	notes: [],
	static_fields: {},
	photo: [
		{
			card_id: 'photo',
			fields: { name: 'First Photo', image_type: 'Example Type', value: base64 }
		},
		{
			card_id: 'photo',
			fields: { name: 'Second Photo', image_type: 'Other Type', value: base64_2 }
		}
	]
};

const newUuid = () => {
	return crypto.randomUUID();
};

const newDate = () => {
	return new Date().toISOString();
};

export const newPerson = {
	readonly: false,
	created: newDate(),
	last_modified: newDate(),
	uuid: newUuid(),
	actions: [],
	notes: [],
	static_fields: {},
	photo: []
};
