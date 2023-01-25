<script lang="ts">
	export let valueInput;
	export let value: string = '';
	export let error = false;

	let lastKey = '';
	let allowedKeys: any;

	export const setLastKey = (key: string) => {
		lastKey = key;
	};

	const arrayBuilder = (length: number) => {
		return Array.from({ length: length }, (_, i) => i.toString());
	};

	let zeroNine = arrayBuilder(10);
	let oneNine = zeroNine.slice(1);

	$: allowedKeys = [
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
	];

	const removeLast = () => {
		value = value.substring(0, value.length - 1);
	};

	const check = () => {
		if (value?.length) {
			if (value?.length > 10) removeLast();
			else if (value)
				for (var i = 0; i < value.length; i++)
					if (!allowedKeys[i].includes(value.charAt(i)))
						if (i === 0) value = '0' + value.charAt(i);
						else removeLast();
			if ((value.length === 2 || value.length === 5) && lastKey !== 'Backspace')
				value = value + '/';
		}
		if (!value?.length || value.length === 10) {
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
		on:keyup={(e) => {
			setLastKey(e.key);
		}}
	/>
</div>

<style>
	input {
		border: none;
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
