import DatePicker from '$lib/inputs/DatePicker.svelte';
import MultiSelect from '$lib/inputs/MultiSelect.svelte';
import Numeric from '$lib/inputs/Numeric.svelte';
import Score from '$lib/inputs/Score.svelte';
import SingleSelect from '$lib/inputs/SingleSelect.svelte';
import Text from '$lib/inputs/Text.svelte';
import ActionButton from '$lib/inputs/ActionButton.svelte';

export const input_components = {
	action: ActionButton,
	singleSelect: SingleSelect,
	date: DatePicker,
	numeric: Numeric,
	text: Text,
	multiSelect: MultiSelect,
	score: Score
};
