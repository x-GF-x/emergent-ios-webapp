import DynamicScene from '$lib/scenes/DynamicScene.svelte';
import StaticScene from '$lib/scenes/StaticScene.svelte';
import Quickchart from '$lib/scenes/Quickchart.svelte';
import Impression from '$lib/scene_actions/Impression.svelte';
import AddNote from '$lib/scene_actions/AddNote.svelte';
import AddAction from '$lib/scene_actions/AddAction.svelte';
import Timestamp from '$lib/scene_actions/Timestamp.svelte';

export const scenes = {
	quickchart: Quickchart,
	static_scene: StaticScene,
	dynamic_scene: DynamicScene
};

export const tabs: Tab[] = [
	{
		label: 'Quick Chart',
		id: 'default',
		type: 'quickchart',
		scene_action: { label: 'ADD NOTE', fn: 'add_note' },
		headerTabs: true
	},
	{
		label: 'Person Info',
		id: 'ems_patient_information',
		type: 'static_scene',
		headerTabs: true
	},
	{
		label: 'Timeline',
		id: '2',
		type: 'dynamic_scene',
		dynamic_ids: ['actions'],
		scene_action: { label: 'ADD ACTION', fn: 'add_action' },
		headerTabs: true
	},
	{
		label: 'Photos & Forms',
		id: '3',
		type: 'dynamic_scene',
		dynamic_ids: ['photo'],
		scene_action: { label: 'ADD PHOTO', fn: 'add_photo' }
	},
	{
		label: 'Narrative',
		id: '4',
		type: 'dynamic_scene',
		dynamic_ids: ['notes'],
		scene_action: { label: 'ADD NOTE', fn: 'add_note' }
	},
	{
		label: 'Summary',
		id: '5',
		type: 'dynamic_scene'
		// dynamic_ids: ['static_fields', 'actions']
	}
];

export const sceneTabs: SubTab[] = [
	{ label: 'Expand All', action: 'expand' },
	{ label: 'Collapse All', action: 'collapse' },
	{ label: 'Delete Person', action: 'delete' }
];

export const quickchartTabs: SubTab[] = [
	{ label: 'Edit Clinical Impression', action: 'impression' },
	{ label: 'Delete Person', action: 'delete' }
];

export const sceneActionComponents = {
	impression: Impression,
	add_note: AddNote,
	add_action: AddAction,
	edit_timestamp: Timestamp,
	delete: undefined,
	add_photo: undefined
};

export const footerItems = [
	{ label: 'Pulse', id: 'pulse' },
	{ label: 'Respirations', id: 'respirations' },
	{ label: 'Blood Pressure', id: 'blood_pressure' },
	{ label: 'SpO2', id: 'sp02' },
	{ label: 'ETC02', id: 'etc02' }
];
