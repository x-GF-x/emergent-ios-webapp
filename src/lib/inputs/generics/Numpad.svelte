<script lang="ts">
	import DateString from './DateString.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let type: 'date' | 'numeric';
	export let value: FieldValues;
	export let field: Field | SubField;

	let valueInput: HTMLInputElement;
	let datestring: DateString;
	let error = false;
	let errorMessage = 'Not a valid date';
	let disabled = false;
	let { style } = field;

	export const focusInput = () => {
		if (valueInput) {
			valueInput.focus();
		}
	};

	const selectNumber = (number: number) => {
		if (!disabled) {
			if (type === 'numeric') {
				if (value) value = value + '' + number;
				else value = number;
			} else if (type === 'date') {
				datestring.setLastKey('any');
				if (value) value = value + '' + number;
				else value = number.toString();
			}
		}
	};

	const backspace = () => {
		if (value) {
			if (type === 'numeric') {
				value = Number(value.toString().slice(0, -1));
			} else if (type === 'date') {
				datestring.setLastKey('Backspace');
				value = value.toString().slice(0, -1);
			}
		}
	};

	const slash = () => {
		if (value) value = value + '/';
	};

	const decimal = () => {
		if (value) value = value + '.';
		else value = '0.';
	};

	let tenthSlot: undefined | NumPadIconSlot;

	if (type === 'numeric' && (style === 'oneDecimal' || style === 'twoDecimal')) {
		tenthSlot = {
			icon: '.',
			fn: decimal
		};
	} else if (type === 'date') {
		tenthSlot = { icon: '/', fn: slash };
	}

	let numPad: NumPad = [
		...Array.from({ length: 9 }, (_, i) => i + 1),
		tenthSlot,
		0,
		{ icon: 'backspace', fn: backspace }
	];

	//Enforce decimals dependent on style
	$: {
		if (typeof value === 'string' && value?.includes('.')) {
			if (style === 'oneDecimal') {
				if (value.split('.')[1].length === 1) disabled = true;
				else disabled = false;
			} else if (style === 'twoDecimal') {
				if (value.split('.')[1].length === 2) disabled = true;
				else disabled = false;
			}
		}
	}
</script>

<div class="numpadControl">
	<div class="header">
		<div class="label">{field.title}</div>
	</div>
	<div class="inputWrapper">
		<div class="inputAndClear">
			{#if type === 'numeric'}
				<div class="inputAndUnit">
					<input
						bind:this={valueInput}
						max={'max' in field ? field.max : ''}
						min={'min' in field ? field.min : ''}
						style:width={value || value === 0 ? value.toString().length + 'ch' : '10px'}
						class="input"
						bind:value
						type="text"
						on:keypress={(e) => {
							if (disabled && typeof value === 'string') {
								value = value.substring(0, value.length - 1);
							}
							if (e.key === 'Enter') dispatch('update', { value: value });
						}}
					/>
					{#if field.unitText}
						<div class="unit">
							{field.unitText}
						</div>
					{/if}
				</div>
			{:else if type === 'date'}
				{#if typeof value === 'string' || value === undefined}
					<DateString
						bind:this={datestring}
						type={style === 'time' ? 'time' : 'date'}
						bind:error
						bind:valueInput
						bind:value
						on:update={() => dispatch('update', { value: value })}
					/>
				{/if}
			{/if}

			<button
				class="material-symbols-outlined cancel"
				on:click={() => (type === 'numeric' ? (value = undefined) : (value = ''))}
			>
				cancel
			</button>
		</div>
		{#if error}
			<div class="error">
				<div class="material-symbols-outlined errorIcon">error</div>
				<div class="errorMessage">
					{errorMessage}
				</div>
			</div>
		{:else}
			<div class="error" style:height="17px" />
		{/if}
	</div>
	<div class="numPad">
		{#each numPad as cell}
			{#if typeof cell === 'number'}
				<button
					class="numberButton"
					on:click={() => (typeof cell === 'number' ? selectNumber(cell) : null)}>{cell}</button
				>
			{:else if typeof cell === 'object'}
				<button
					disabled={cell.icon !== 'backspace' && typeof value === 'string' && value.includes('.')
						? true
						: false}
					class="iconButton material-symbols-outlined"
					on:click={cell.fn}>{cell.icon}</button
				>
			{:else}
				<button />
			{/if}
		{/each}
	</div>
	<div class="footer">
		<button
			class="update"
			disabled={error}
			on:click={() => {
				if (error) alert('Incorrect Date Format. Please use MM/DD/YYY');
				else dispatch('update', { value: value });
			}}
		>
			UPDATE
		</button>
	</div>
</div>

<style>
	.numpadControl {
		background: var(--light1);
		border: 1px solid var(--border);
		border-radius: 10px;
		width: max-content;
	}
	.header {
		padding: 10px 5px;
		display: grid;
		align-items: center;
		justify-content: center;
		text-align: start;
		font-size: 12pt;
		font-weight: 400;
	}

	.inputWrapper {
		background: var(--secondary);
		color: var(--light1);
		align-items: center;
		text-align: start;
		display: flex;
		flex-direction: column;
	}

	.inputAndClear {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.inputAndUnit {
		display: flex;
		align-items: baseline;
		padding: 10px 0;
		margin-left: 10px;
		max-width: 180px;
		overflow: hidden;
	}

	.input {
		border: none;
		background: none;
		color: white;
		margin-right: 5px;
		font-size: 20pt;
	}

	.input:focus-visible {
		outline: none;
	}

	.unit {
		font-size: 10pt;
	}

	.error {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		width: 100%;
		background: var(--light1);
	}

	.errorIcon {
		color: orange;
		margin-right: 10px;
		font-size: 14px;
	}

	.errorMessage {
		color: var(--dark1);
	}

	.numPad {
		display: grid;
		grid-template-columns: 33.3% 33.3% 33.3%;
		grid-template-rows: 25% 25% 25% 25%;
		background: var(--light3);
	}

	.numberButton {
		font-size: 18pt;
		height: 50px;
		width: 75px;
		background: var(--light1);
		font-weight: 600;
	}

	.numberButton:hover {
		text-decoration: underline;
	}

	button:not(.cancel):not(.update):focus-visible {
		outline: none;
		border-bottom: 1px solid;
	}

	.cancel:focus-visible {
		border-left: 1px solid var(--light1);
		outline: none;
	}

	.iconButton {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: var(--dark3);
	}

	.footer {
		display: flex;
		justify-content: center;
		padding: 5px 10px;
	}

	.update {
		height: 40px;
		width: 100%;
		background: var(--primary);
		color: white;
		border-radius: 5px;
		font-size: 10pt;
		font-weight: 400;
	}

	.cancel {
		font-size: 12pt;
		cursor: pointer;
		color: var(--light1);
	}

	button:disabled {
		filter: saturate(60%);
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
