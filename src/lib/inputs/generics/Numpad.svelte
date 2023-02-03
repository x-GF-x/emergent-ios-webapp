<script lang="ts">
	import DateString from './DateString.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let type: 'date' | 'numeric';
	export let value: number | string | undefined;
	export let field: Field;

	let valueInput: HTMLInputElement;
	let datestring: DateString;
	let error = false;
	let errorMessage = 'Not a valid date';

	export const focusInput = () => {
		if (valueInput) {
			valueInput.focus();
		}
	};

	const selectNumber = (number: number) => {
		if (type === 'numeric') {
			if (value) value = Number(value + '' + number);
			else value = number;
		} else if (type === 'date') {
			datestring.setLastKey('any');
			if (value) value = value + '' + number;
			else value = number.toString();
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

	let numPad: NumPad = [
		...Array.from({ length: 9 }, (_, i) => i + 1),
		type === 'numeric' ? undefined : { icon: '/', fn: slash },
		0,
		{ icon: 'backspace', fn: backspace }
	];
</script>

<div class="numpadControl">
	<div class="header">
		<div class="label">{field?.title}</div>
	</div>
	<div class="inputWrapper">
		<div class="inputAndClear">
			{#if type === 'numeric'}
				<input
					bind:this={valueInput}
					class="input"
					bind:value
					type="number"
					on:keypress={(e) => {
						if (e.key === 'Enter') dispatch('update', { value: value });
					}}
				/>
			{:else if type === 'date'}
				{#if typeof value === 'string' || value === undefined}
					<DateString
						bind:this={datestring}
						type={field?.style === 'time' ? 'time' : 'date'}
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
				<button class="iconButton material-symbols-outlined" on:click={cell.fn}>{cell.icon}</button>
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
		justify-content: space-around;
	}

	.input {
		height: 100%;
		padding: 10px 0;
		border: none;
		background: none;
		color: white;
	}

	.input:focus-visible {
		outline: none;
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
