<script>
	import { goto } from '$app/navigation';
	import Header from '$components/elements/Header.svelte';
	import { ensureSignedIn } from '$lib/middleware/auth';
	import { onMount } from 'svelte';

	let signedIn = false;
	onMount(() => {
		ensureSignedIn()
			.then(() => {
				signedIn = true;
			})
			.catch((err) => {
				goto('/auth');
			});
	});
</script>

{#if signedIn}
	<div class=" flex flex-col relative bg-white h-screen">
		<div class=" flex-grow-0">
			<Header />
		</div>
		<div class=" flex-grow">
			<slot />
		</div>
	</div>
{/if}
