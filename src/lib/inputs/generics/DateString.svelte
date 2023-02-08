<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let valueInput;
	export let value: string = '';
	export let error = false;
	export let type: 'date' | 'time' = 'date';

	let lastKey = '';
	let allowedKeys: any;
	let maxLength: number = type === 'date' ? 10 : 8;

	export const setLastKey = (key: string) => {
		lastKey = key;
	};

	const arrayBuilder = (length: number) => {
		return Array.from({ length: length }, (_, i) => i.toString());
	};

	let zeroNine = arrayBuilder(10);
	let oneNine = zeroNine.slice(1);

	$: allowedKeys =
		type === 'date'
			? [
					['0', '1'],
					value?.charAt(0) === '1' ? arrayBuilder(3) : oneNine,
					['/'],
					arrayBuilder(4),
					value?.charAt(3) === '3' ? arrayBuilder(2) : oneNine,
					['/'],
					['1', '2'],
					value?.charAt(6) === '1' ? ['9'] : ['0'],
					zeroNine,
					zeroNine
			  ]
			: [
					['0', '1', '2'],
					value?.charAt(0) === '2' ? arrayBuilder(4) : zeroNine,
					[':'],
					arrayBuilder(6),
					zeroNine,
					[':'],
					arrayBuilder(6),
					zeroNine
			  ];

	const removeLast = () => {
		value = value.substring(0, value.length - 1);
	};

	const check = () => {
		if (value?.length) {
			if (value?.length > maxLength) removeLast();
			else if (value)
				for (var i = 0; i < value.length; i++)
					if (!allowedKeys[i].includes(value.charAt(i)))
						if (type === 'date' && i === 0) value = '0' + value.charAt(i);
						else removeLast();
			if ((value.length === 2 || value.length === 5) && lastKey !== 'Backspace')
				value = value + (type === 'date' ? '/' : ':');
		}
		if (!value?.length || value.length === maxLength) {
			error = false;
		} else {
			error = true;
		}
	};

	$: value, check();
</script>

<div class="datestring">
	<input
		bind:this={valueInput}
		type="text"
		bind:value
		on:keypress={(e) => {
			setLastKey(e.key);
			if (e.key === 'Enter') dispatch('update');
		}}
	/>
</div>

<style>
	input {
		border: none;
		margin-left: 5px;
		background: none;
		width: 100%;
		height: 100%;
		padding: 10px 0;
		color: var(--light1);
	}

	input:focus-visible {
		outline: none;
	}

	.datestring {
		display: flex;
		flex-direction: column;
	}
</style>
