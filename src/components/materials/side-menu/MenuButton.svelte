<script>
	import { page } from "$app/stores";
	import ChevronDown from "$components/icons/Chevron/ChevronDown.svelte";
	import ChevronUp from "$components/icons/Chevron/ChevronUp.svelte";
	import { afterUpdate } from "svelte";
	import { onMount } from "svelte";

	export let title = "Title";
	export let href = "";
	export let tailwindClass = "";
	export let hasSubMenu;

	let active = false;
	let subMenuShown = false;

	afterUpdate(() => {
		active = $page.url.pathname == href;
	});

	const onClickMenu = () => {
		subMenuShown = !subMenuShown;
	};

	onMount(() => {
		subMenuShown = !!$page.url.pathname.includes(href);
	});
</script>

<div class="select-none">
	{#if !hasSubMenu}
		<a sveltekit:prefetch {href}>
			<div
				class={"transition duration-150 ease-in-out p-2 px-4 w-full rounded-md hover:bg-gray-600 hover:text-white text-lg mb-1 " +
					tailwindClass +
					" " +
					(active ? "bg-gray-600 text-white" : "bg-white text-gray-600 ")}
			>
				<span class="text-base">{title}</span>
			</div>
		</a>
	{:else}
		<div>
			<div
				on:click={onClickMenu}
				class={" relative cursor-pointer transition duration-150 ease-in-out bg-white text-gray-600 p-2 px-4 w-full rounded-md hover:bg-gray-600 hover:text-white text-lg mb-1 " +
					tailwindClass +
					" " +
					(active ? "bg-gray-600 text-white" : "")}
			>
				<span class="text-base">{title}</span>
				<div class=" absolute right-0 top-0 bottom-0 pr-2 flex items-center">
					{#if subMenuShown}
						<ChevronUp />
					{:else}
						<div class=" text-gray-400"><ChevronDown /></div>
					{/if}
				</div>
			</div>
			{#if subMenuShown}
				<div class=" p-1 pr-0 pl-4">
					<div class=" border-l p-2 pl-2 pr-0">
						<slot />
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
