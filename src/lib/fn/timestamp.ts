export const created_and_last_modified = (value: { [key: string]: FieldValues }) => {
	last_modified(value);
	value.created = new Date().toLocaleString();
};

export const last_modified = (value: { [key: string]: FieldValues }) => {
	value.last_modified = new Date().toLocaleTimeString('en-US', {
		hour12: false
	});
};
