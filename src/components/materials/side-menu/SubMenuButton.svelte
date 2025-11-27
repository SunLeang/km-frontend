<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	export let title = 'Sub Title';
	export let href = '#';
	export let tailwindClass = '';

	let active = false;
	afterUpdate(() => {
		active = $page.url.pathname == href;
	});
</script>

<div class="">
	<a sveltekit:prefetch {href}>
		<div
			class="flex pl-6 py-3 items-center {active &&
				'bg-gray-100 text-tertiary-3'} transition ease-in-out text-gray-600 text-sm rounded-sm hover:bg-gray-200 hover:text-blue-500 p-1 px-2 {tailwindClass}"
		>
			<div><slot /></div>
			<div class="pl-4 ">{title}</div>
		</div>
	</a>
</div>
