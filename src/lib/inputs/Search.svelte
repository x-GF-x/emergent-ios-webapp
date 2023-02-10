<script lang="ts">
	export let searchValue: string;
	export let containerStyle: string = '';
	export let inputStyle: string = '';
	let search: HTMLInputElement;

	export const searchFocus = () => {
		search?.focus();
	};
</script>

<div style={containerStyle} class="searchContainer">
	<div style={inputStyle} class="material-symbols-outlined searchIcon">search</div>
	<input
		bind:this={search}
		style={inputStyle}
		class="search"
		placeholder="Search..."
		type="text"
		bind:value={searchValue}
	/>
</div>

<style>
	.searchContainer {
		display: flex;
		justify-content: center;
		padding: 10px;
		background: var(--light4);
		font-weight: 500;
		border-bottom: 1px solid var(--border);
	}

	.search {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--border);
		border-left: 0;
		border-radius: 0 10px 10px 0;
	}

	.search:focus-visible {
		outline: none;
	}

	.searchIcon {
		color: var(--dark3);
		display: flex;
		align-items: center;
		background: white;
		border: 1px solid var(--border);
		border-right: 0;
		border-radius: 10px 0 0 10px;
	}
</style>
