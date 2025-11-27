<script>
	import ProfiePopover from './profile-popover/ProfiePopover.svelte';
</script>

<div class="top-0 left-0 right-0 z-50 py-2 shadow  bg-gray-50">
	<div class="relative flex py-2">
		<div class="flex m-auto space-x-2 text-2xl font-bold text-gray-600 ">
			<span class="px-2 text-gray-100 bg-gray-700 rounded ">Extension</span>
			<div>Dashboard</div>
		</div>
		<div class="absolute top-0 bottom-0 right-5">
			<ProfiePopover />
		</div>
	</div>
</div>
