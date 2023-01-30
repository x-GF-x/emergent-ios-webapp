type InputProps =
	| { suggest?: number | string; label?: string; dropdownLabel?: string; icon?: string }
	| undefined;

type NumPad = Array<number | undefined | { icon: string; fn: () => void }>;

type ToggleIcon = { open: string; closed: string; color?: string; style?: string } | undefined;

type Field =
	| {
			ds?: string;
			key?: string;
			id?: string;
			type?: FieldTypes;
			title?: string;
			embedded?: Field;
			scoreFields?: Field[];
			subField?: SubField[];
	  }
	| undefined;

type SubField = {
	id: string;
	type: 'singleSelect' | 'text' | 'numeric' | 'date' | 'age' | 'multiSelect';
	title: string;
	style?: string;
	min?: number;
	max?: number;
	ds?: string;
	action?: string;
	key?: string;
	data: { id: number; type: string; code: string; value: string }[];
};

type FieldTypes = 'singleSelect' | 'text' | 'numeric' | 'date' | 'age' | 'multiSelect' | 'score';

type Option = {
	value: string;
	pn?: string;
	label?: string;
};

type MultiSelectValues = {
	value: string;
	pn?: string;
	label?: string;
}[];

type EmbeddedMultiSelectValues = { [key: string]: MultiSelectValues };

type DropDownOption = {
	code: string;
	id: number;
	type: string;
	value: string;
};

type ScoreOption = {
	code: string;
	description: string;
	operand: 1;
	operator: '+' | '-';
	value: string;
};

type Tab = {
	label: string;
	id: string;
	type: 'quickchart' | 'static_scene' | 'dynamic_scene';
	sceneAction: { label: string; fn: string } | undefined;
	headerTabs?: boolean;
};

type CardJson = {
	properties: {
		title: string;
	};
	rows: {
		fields: {
			id: string;
			width: 'oneThird' | 'half' | 'full';
			type: 'singleSelect' | 'text' | 'numeric' | 'date' | 'age' | 'multiSelect';
			title?: string;
			style?: string;
			action?: string;
			ds?: string;
			min?: number;
			max?: number;
			key?: string;
			subFields?: {
				id: string;
				type: 'singleSelect' | 'text' | 'numeric' | 'date' | 'age' | 'multiSelect';
				title: string;
				style?: string;
				min?: number;
				max?: number;
				ds?: string;
				action?: string;
				key?: string;
				data?: { id: number; type: string; code: string; value: string }[];
			}[];
		}[];
	}[];
};
