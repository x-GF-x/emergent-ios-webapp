export const example_cards: {
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
} = {
	properties: {
		title: 'Basic Information'
	},
	rows: [
		{
			fields: [
				{
					id: 'e_patient03',
					width: 'oneThird',
					type: 'text',
					title: 'First Name'
				},
				{
					id: 'e_patient04',
					width: 'oneThird',
					type: 'text',
					title: 'MI'
				},
				{
					id: 'e_patient02',
					width: 'oneThird',
					type: 'text',
					title: 'Last Name'
				}
			]
		},
		{
			fields: [
				{
					type: 'age',
					id: 'patient_age',
					width: 'full',
					subFields: [
						{
							id: 'e_patient17',
							type: 'date',
							style: 'date',
							title: 'Date of Birth'
						},
						{
							id: 'e_patient15',
							type: 'numeric',
							style: 'integer',
							min: 1,
							max: 120,
							title: 'Age'
						},
						{
							id: 'e_patient16',
							type: 'singleSelect',
							ds: 'res',
							key: 'nemsis_age_units',
							title: 'Age Units',
							data: [
								{
									id: 2516001,
									type: 'ePatient16',
									code: '2516001',
									value: 'Days'
								},
								{
									id: 2516003,
									type: 'ePatient16',
									code: '2516003',
									value: 'Hours'
								},
								{
									id: 2516005,
									type: 'ePatient16',
									code: '2516005',
									value: 'Minutes'
								},
								{
									id: 2516007,
									type: 'ePatient16',
									code: '2516007',
									value: 'Months'
								},
								{
									id: 2516009,
									type: 'ePatient16',
									code: '2516009',
									value: 'Years'
								}
							]
						}
					]
				}
			]
		},
		{
			fields: [
				{
					id: 'e_exam01',
					max: 999.9,
					min: 0.1,
					width: 'half',
					type: 'numeric',
					style: 'oneDecimal',
					title: 'Weight'
				},
				{
					id: 'e_exam02',
					width: 'half',
					type: 'singleSelect',
					ds: 'res',
					key: 'nemsis_broselow_luten_color',
					title: 'Length'
				}
			]
		},
		{
			fields: [
				{
					id: 'e_patient12',
					width: 'half',
					type: 'numeric',
					style: 'ssn',
					title: 'SSN'
				},
				{
					id: 'e_patient13',
					width: 'half',
					type: 'singleSelect',
					ds: 'res',
					key: 'nemsis_gender',
					title: 'Gender'
				}
			]
		},
		{
			fields: [
				{
					id: 'e_patient14',
					width: 'full',
					type: 'multiSelect',
					ds: 'res',
					key: 'nemsis_race',
					title: 'Race'
				}
			]
		},
		{
			fields: [
				{
					id: 'e_history18',
					width: 'full',
					type: 'singleSelect',
					ds: 'res',
					key: 'nemsis_pregnancy',
					title: 'Pregnancy'
				}
			]
		}
		// {
		// 	fields: [
		// 		{
		// 			id: 'actionScan',
		// 			width: 'full',
		// 			type: 'action',
		// 			action: 'SCAN_DL',
		// 			title: "SCAN DRIVER'S LICENSE"
		// 		}
		// 	]
		// }
	]
};
