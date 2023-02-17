<script lang="ts">
	export let title = '';
	export let subtitle = '';
</script>

<div class="messageContainer">
	<div class="title">{title}</div>
	<div class="subtitle">{subtitle}</div>
</div>

<style>
	.messageContainer {
		margin: 40px;
		width: max-content;
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: var(--fontLarge);
		margin-bottom: 20px;
	}

	.subtitle {
		font-size: var(--fontSmall);
	}
</style>
