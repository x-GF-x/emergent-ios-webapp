import Age from '$lib/inputs/Age.svelte';
import DatePicker from '$lib/inputs/DatePicker.svelte';
import MultiSelect from '$lib/inputs/MultiSelect.svelte';
import Numeric from '$lib/inputs/Numeric.svelte';
import Score from '$lib/inputs/Score.svelte';
import SingleSelect from '$lib/inputs/SingleSelect.svelte';
import Text from '$lib/inputs/Text.svelte';

export const input_components = {
	singleSelect: SingleSelect,
	date: DatePicker,
	numeric: Numeric,
	text: Text,
	age: Age,
	multiSelect: MultiSelect,
	score: Score ? Score : undefined
};
