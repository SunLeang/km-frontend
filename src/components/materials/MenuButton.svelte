<script>
	export let href = '';
  	export let active = false
	export let moreStyle = '';
</script>

<a sveltekit:prefetch {href}>
	<div
		class={'transition duration-150 ease-in-out text-gray-600 p-2 px-4 w-full rounded-md hover:bg-gray-600 hover:text-white text-lg mb-1 ' +
			moreStyle + ' ' + (active ? 'bg-gray-600 text-white' : 'bg-white')}
	>
		<slot />
	</div>
</a>
