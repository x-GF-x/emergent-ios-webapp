<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let countdown: number;
	export let count = 0;
	export let overdue = false;

	let now = Date.now();
	let end = now + countdown * 1000;

	$: count = Math.round((!overdue ? end - now : now - end) / 1000);
	$: rounded = Math.round((end - now) / 1000);
	$: {
		if (rounded === 0) {
			overdue = true;
		}
	}
	$: h = Math.floor(count / 3600);
	$: m = Math.floor((count - h * 3600) / 60);
	$: s = count - h * 3600 - m * 60;

	function updateTimer() {
		now = Date.now();
	}

	let interval = setInterval(updateTimer, 1000);

	function handleStart() {
		now = Date.now();
		end = now + count * 1000;
		interval = setInterval(updateTimer, 1000);
	}

	onMount(() => {
		handleStart();
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="time">
	{overdue ? 'Overdue by' : 'Perform again in'}
	<b>
		{h < 10 ? 0 + '' + h : h}:{m < 10 ? 0 + '' + m : m}:{s < 10 ? 0 + '' + s : s}
	</b>
</div>

<style>
	.time {
		color: var(--light1);
	}
</style>
