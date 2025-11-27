<script>
		export let title = 'Sub Title';
	export let href = '#';
</script>

<div class=" py-1 bg-tertiary-3 cursor-pointer">
	<a sveltekit:prefetch {href}>
		<div
			class="flex justify-center text-white py-2 items-center transition ease-in-out"
		>
			<div><slot /></div>
			<div class=" pl-2">{title}</div>
		</div>
	</a>
</div>
