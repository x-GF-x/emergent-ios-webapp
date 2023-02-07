export const createdLastModified = (value: { [key: string]: FieldValues }) => {
	value.last_modified = new Date().toLocaleTimeString('en-US', {
		hour12: false
	});
	value.created = new Date().toLocaleString();
};