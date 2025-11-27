<script>
	import { goto } from "$app/navigation";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";
	let displayed = true;
	let t1, t2;

	onMount(() => {
		t1 = setTimeout(() => {
			displayed = false;
		}, 1000);
		t2 = setTimeout(() => {
			goto("/auth");
		}, 2000);
	});
	onDestroy(() => {
		clearTimeout(t1);
		clearTimeout(t2);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="bg-gray-500 h-screen flex justify-center">
	{#if displayed}
		<div transition:fade class="m-auto">
			<div class=" text-gray-100 text-6xl font-extrabold">
				Welcome to <span class=" bg-pink-500 px-5 pb-2 rounded-2xl"
					>KRADASS</span
				>
			</div>
		</div>
	{/if}
</div>
