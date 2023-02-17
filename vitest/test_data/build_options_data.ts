export const field_with_nv = {
	id: 'eExam02',
	width: 'half',
	type: 'singleSelect',
	ds: 'res',
	key: 'nemsis_length_based_tape_measure',
	title: 'Length',
	nv: true
};

export const field_with_routes = {
	type: 'singleSelect',
	id: 'eMedications04',
	title: 'Route',
	ds: 'res',
	key: 'nemsis_current_medication_administration_route',
	available_routes: ['20a55421-110f-4bcf-92cf-09fdea4efaac', '2c30b818-5f66-45ae-a179-67f148c20a08']
};

export const field_with_units = {
	type: 'singleSelect',
	id: 'eMedications06',
	title: 'Dosage Units',
	ds: 'res',
	key: 'nemsis_current_medication_dosage_unit',
	available_units: [
		'8392688b-07bd-4c0d-a08a-7c243efcc562',
		'd7829957-be4f-4563-9806-20bf1749aeb5\n'
	]
};

export const score_field = {
	id: 'eVitals23',
	width: 'full',
	type: 'score',
	scoreFields: [
		{
			id: 'eVitals19',
			type: 'singleSelect',
			data: [
				{
					code: '1',
					description: 'No eye movement when assessed (All Age Groups)',
					operator: '+',
					operand: 1,
					value: 'No eye movement when assessed (All Age Groups)'
				},
				{
					code: '2',
					description: 'Opens Eyes to painful stimulation (All Age Groups)',
					operator: '+',
					operand: 2,
					value: 'Opens Eyes to painful stimulation (All Age Groups)'
				},
				{
					code: '3',
					description: 'Opens Eyes to verbal stimulation (All Age Groups)',
					operator: '+',
					operand: 3,
					value: 'Opens Eyes to verbal stimulation (All Age Groups)'
				},
				{
					code: '4',
					description: 'Opens Eyes spontaneously (All Age Groups)',
					operator: '+',
					operand: 4,
					value: 'Opens Eyes spontaneously (All Age Groups)'
				}
			],
			title: 'Eye Opening'
		},
		{
			id: 'eVitals20',
			type: 'singleSelect',
			data: [
				{
					code: '1',
					description: 'No verbal/vocal response (All Age Groups)',
					operator: '+',
					operand: 1,
					value: 'No verbal/vocal response (All Age Groups)'
				},
				{
					code: '2',
					description: 'Incomprehensible sounds (>2 Years); Inconsolable, agitated',
					operator: '+',
					operand: 2,
					value: 'Incomprehensible sounds (>2 Years); Inconsolable, agitated'
				},
				{
					code: '3',
					description: 'Inappropriate words (>2 Years); Inconsistently consolable, moaning',
					operator: '+',
					operand: 3,
					value: 'Inappropriate words (>2 Years); Inconsistently consolable, moaning'
				},
				{
					code: '4',
					description: 'Confused (>2 Years); Cries but is consolable, inappropriate interactions',
					operator: '+',
					operand: 4,
					value: 'Confused (>2 Years); Cries but is consolable, inappropriate interactions'
				},
				{
					code: '5',
					description:
						'Oriented (>2 Years); Smiles, oriented to sounds, follows objects, interacts',
					operator: '+',
					operand: 5,
					value: 'Oriented (>2 Years); Smiles, oriented to sounds, follows objects, interacts'
				}
			],
			title: 'Verbal Response'
		},
		{
			id: 'eVitals21',
			type: 'singleSelect',
			data: [
				{
					code: '1',
					description: 'No Motor Response (All Age Groups)',
					operator: '+',
					operand: 1,
					value: 'No Motor Response (All Age Groups)'
				},
				{
					code: '2',
					description: 'Extension to pain (All Age Groups)',
					operator: '+',
					operand: 2,
					value: 'Extension to pain (All Age Groups)'
				},
				{
					code: '3',
					description: 'Flexion to pain (All Age Groups)',
					operator: '+',
					operand: 3,
					value: 'Flexion to pain (All Age Groups)'
				},
				{
					code: '4',
					description: 'Withdrawal from pain (All Age Groups)',
					operator: '+',
					operand: 4,
					value: 'Withdrawal from pain (All Age Groups)'
				},
				{
					code: '5',
					description: 'Localizing pain (All Age Groups)',
					operator: '+',
					operand: 5,
					value: 'Localizing pain (All Age Groups)'
				},
				{
					code: '6',
					description: 'Obeys commands (>2Years); Appropriate response to stimulation',
					operator: '+',
					operand: 6,
					value: 'Obeys commands (>2Years); Appropriate response to stimulation'
				}
			],
			title: 'Motor Response'
		}
	],
	title: 'Glasgow Coma Score'
};
