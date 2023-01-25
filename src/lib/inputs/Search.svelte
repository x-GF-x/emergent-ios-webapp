<script lang="ts">
	export let searchValue: string;
</script>

<div class="searchWrapper">
	<div class="material-icons searchIcon">search</div>
	<input class="search" placeholder="Search..." type="search" bind:value={searchValue} />
</div>

<style>
	.searchWrapper {
		display: flex;
		justify-content: center;
		padding: 10px;
		background: var(--dark2);
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
