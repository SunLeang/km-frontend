<script>
	import { goto } from "$app/navigation";
	import { ensureSignedIn } from "$lib/middleware/auth";
	import { onMount } from "svelte";

	let ready = false;
	onMount(async () => {
		try {
			await ensureSignedIn();
			goto("/dashboard");
		} catch (error) {
			ready = true;
		}
	});
</script>

<div>
	{#if ready}
		<slot />
	{/if}
</div>
