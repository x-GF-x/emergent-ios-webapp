import { describe, it, expect } from 'vitest';

import * as build from '../src/lib/fn/build_select_options';
import * as options from './test_data/build_options_data';

describe('build standard options', () => {
	it('non drug', () => {
		expect(JSON.stringify(build.standard_options(options.field_with_nv))).toContain(
			'Orange' && 'Blue'
		);
	});
	it('units', () => {
		expect(JSON.stringify(build.standard_options(options.field_with_units))).toContain('Grams');
	});
	it('routes', () => {
		expect(JSON.stringify(build.standard_options(options.field_with_routes))).toContain(
			'Intravenous'
		);
	});
});

describe('build drug options', () => {
	it('no parameters', () => {
		expect(JSON.stringify(build.drug_options())).toContain('Adenosine');
	});
});

describe('build score card', () => {
	it('score card field', () => {
		options.score_field.scoreFields.forEach((field) => {
			expect(build.score_card_options(field)).toBeInstanceOf(Array);
			expect(JSON.stringify(build.score_card_options(field))).toContain('operand');
		});
	});
});

describe('clinical impressions', () => {
	it('no parameters', () => {
		expect(JSON.stringify(build.clinical_impression_options())).toContain(`"qc_key":"dizziness"`);
	});
});

describe('timeline options', () => {
	it('no parameters', () => {
		expect(JSON.stringify(build.timeline_options())).toContain(`"value":"Abdomen Assessment`);
	});
});

describe('persons', () => {
	it('build people from data', () => {
		expect(JSON.stringify(build.person_options(options.data_with_two_persons))).toContain(
			'Tom Gunn' && 'Maddison Smith'
		);
	});

	it('build name from single persons data object', () => {
		expect(
			JSON.stringify(
				build.build_name(
					options.data_with_two_persons.persons[0],
					options.data_with_two_persons.persons.length
				)
			)
		).toContain('Tom Gunn');
	});
});
