//Data storage for one person
interface DataStorage {
	//####
	//Fields that do not repeat (ie are not in actions array- for example person first name) go here
	[key: string]: { [key: string]: { value: string } };
	//####
	last_modified: string; //timestamp
	created: string; //timestamp
	uuid: string;
	//Actions is array of cards- think quickcharts, where card can be set multiple times
	//To get count for quickchart buttons, count instances of the card in this array.
	actions: {
		//Card
		last_modified: string; //timestamp
		created: string; //timestamp
		card_id: string;
		uuid: string;
		[key: string]: //Individual fields within card: [lookup, value]
		| number
			| string
			| {
					[key: string]: {
						code: string;
						operand: number;
						description: string;
						operator: string;
					};
			  }; //Score
	}[];
}

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
			style?: string;
			type?: FieldTypes;
			title?: string;
			embedded?: Field;
			scoreFields?: Field[];
			subFields?: SubField[];
	  }
	| undefined;

type SubField = {
	id: string;
	type: 'singleSelect' | 'text' | 'numeric' | 'date' | 'multiSelect';
	title: string;
	style?: string;
	min?: number;
	max?: number;
	ds?: string;
	action?: string;
	key?: string;
	data?: { id: number; type: string; code: string; value: string }[];
};

type FieldTypes = 'singleSelect' | 'text' | 'numeric' | 'date' | 'multiSelect' | 'score' | 'age';

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
				type: 'singleSelect' | 'text' | 'numeric' | 'date' | 'multiSelect';
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
