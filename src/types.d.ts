//Data storage for one patient
type DataStorage = {
	//Fields that do not repeat (ie are not in actions array- for example person first name) go in static_fields.
	//In mikes JSON these fields exist alongside last_modified, created etc.
	//But TS did not like it and I agree it is less type safe
	//I can flatten when I give to Shawn
	static_fields: {
		[key: string]: FieldValues;
	};
	notes: NoteItem[];
	photo: Photo[];
	last_modified: string; //timestamp
	created: string; //timestamp
	uuid: string;
	//Actions is array of cards- think quickcharts, where card can be set multiple times
	//To get count for quickchart buttons, count instances of the card in this array.
	actions: ActionItem[] | [];
};

type SingleSelectValue = string | undefined;

type FieldValues =
	| SingleSelectValue
	| ScoreObject
	| MultiSelectValues
	| EmbeddedMultiSelectValues
	| Date
	| string
	| number
	| boolean
	| undefined
	| { [key: string]: ScoreObject }
	| Record<string, never>;

type NoteItem =
	| {
			card_id: string;
			ems_notes?: string;
			last_modified: string;
			created: string;
			//I am temporarily making fake UUIDs
			uuid: string;
	  }
	| Record<string, never>;

type ActionItem = {
	//Card
	last_modified?: string; //timestamp
	created?: string; //timestamp
	title?: string;
	card_id: string;
	uuid?: string;
	fields: {
		//Individual fields within card: [lookup, value]
		[key: string]: FieldValues;
	};
};

type ScoreObject = {
	code?: string;
	operand?: number;
	description?: string;
	operator?: '+' | '-';
	value?: string;
};

type InputProps =
	| { suggest?: number | string; label?: string; dropdownLabel?: string; icon?: string }
	| undefined;

type NumPad = Array<number | undefined | NumPadIconSlot>;

type NumPadIconSlot = { icon: string; fn: () => void };

type ToggleIcon = { open: string; closed: string; color?: string; style?: string } | undefined;

type PnOption = { code: string; description: string; value?: string };

interface Field {
	ds?: string;
	key?: string;
	id?: string;
	style?: string;
	type?: FieldTypes;
	title?: string;
	unitText?: string;
	embedded?: Field;
	scoreFields?: Field[];
	subFields?: SubField[];
	splitFields?: Field[];
	action?: string;
	multiline?: boolean;
	pn?: { code: string; description: string }[];
}

type SubFieldData = { id: number; type: string; code: string; value: string };

interface SubField extends Field {
	min?: number;
	max?: number;
	action?: string;
	data?: SubFieldData[];
	//For drugs, manually set the available routes/units from the drug lookup
	available_routes?: string[];
	available_units?: string[];
}

type QuickChartObject = {
	card: string; //whenever card is timeline_cards, a modal of single select choices of all the cards comes up. Whichever one you choose it then opens that card in a modal
	card_data: string; //object with lookup - ie {drug_id: 1231232}, which prepopulates drug when button is clicked. comes from ems_drugs file
	filter: null; // unused- replaced by the quickchart_mapping file
	id: number;
	interval: number | null; //should be set on anything timed. In seconds, ie 120 = 2 minutes. Epidural is 4 minutes, chest compress 2
	key: string;
	section: number;
	title: string;
	type: QuickChartItemType;
};

type QuickChartItemType =
	| 'untimed' //default
	| 'timed' //QuickChartObject['interval'] is shown before button is pressed: "action is performed every (interval)"
	//Colors: red, yellow, green
	//Green is over 1 minute to go, yellow is 60 seconds or less, red is overdue and it starts counting up
	//Green and yellow: Perform again in, Red: Overdue for...
	| 'unrepeatable' //button is disabled once it is done
	| 'secondary'; //mostly drugs. Has no timestamp, doesnt change color

type FieldTypes =
	| 'singleSelect'
	| 'text'
	| 'numeric'
	| 'date'
	| 'multiSelect'
	| 'score'
	| 'age'
	| 'action'
	| 'drug';

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

type DynamicId = 'static_fields' | 'actions' | 'notes' | 'photo';

type Tab = {
	label: string;
	id: string;
	type: 'quickchart' | 'static_scene' | 'dynamic_scene';
	dynamic_ids?: DynamicIds; //ids by which dynamic scenes get their data
	scene_action?: { label: string; fn: SubTabActions };
	headerTabs?: boolean;
};

type ActionComponents = Impression | AddNote | undefined;

type SubTabActions =
	| 'expand'
	| 'collapse'
	| 'impression'
	| 'add_note'
	| 'delete'
	| 'add_action'
	| 'add_photo';

type SubTab = { action: SubTabActions; label: string };

type EmsDrug = {
	available_routes: null | string;
	available_units: null | string;
	decimals: number;
	default_route: string;
	default_unit: string;
	drug_id: string;
	id: number;
	name: string;
};

type Timers = {
	[key: string]: { value: number; overdue: boolean; deadline: number };
};

type CardJson = {
	properties: {
		title: string;
	};
	rows: {
		fields: {
			id: string;
			width: 'oneThird' | 'half' | 'full';
			type: FieldTypes;
			title?: string;
			style?: string;
			action?: string;
			ds?: string;
			min?: number;
			max?: number;
			key?: string;
			splitFields?: SubField[];
			subFields?: SubField[];
		}[];
	}[];
};

interface QCMapping {
	code: string;
	code_description: string;
	id: number;
	qc_key: string;
	value?: string;
}

type Photo = {
	last_modified?: string; //timestamp
	created?: string; //timestamp
	title?: string;
	card_id: string;
	uuid?: string;
	fields: {
		//Individual fields within card: [lookup, value]
		[key: string]: string;
	};
};
