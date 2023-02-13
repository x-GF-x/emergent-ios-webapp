export const format = (
	node: {
		value: string;
		addEventListener: (arg0: string, arg1: { (e: string): void; (e: string): void }) => void;
		removeEventListener: (arg0: string, arg1: { (e: string): void; (e: string): void }) => void;
	},
	formatFunction: (arg0: string) => string
): { destroy(): void } => {
	function updateValue() {
		node.value = formatFunction(node.value);
	}

	node.addEventListener('input', updateValue);
	node.addEventListener('paste', updateValue);

	// Format on intial hydration
	node.value = formatFunction(node.value);

	return {
		destroy() {
			node.removeEventListener('input', updateValue);
			node.removeEventListener('paste', updateValue);
		}
	};
};

export const phoneNumber = (value: string): string => {
	const regex = /^(\d{0,3})(\d{0,3})(\d{0,4})\d{0,2}$/g;
	const onlyNumbers = value?.replaceAll(/[^\d]/g, '');

	return onlyNumbers?.replaceAll(regex, (_regex, $1, $2, $3) =>
		[$1, $2, $3].filter((group) => !!group).join('-')
	);
};

export const none = (value: string): string => {
	return value;
};
