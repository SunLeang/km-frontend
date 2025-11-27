<script>
	import TimeSet from '$components/icons/Time/TimeSet.svelte';
	import CheckSelector from '$components/materials/check-radio/CheckSelector.svelte';
	import { formatTime } from '$lib/utils/date.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let session;
	export let checked;

</script>
<div
	on:click={() => {
		dispatch('select', { session });
	}}
	class="​ py-2 px-4 cursor-pointer border-2 border-background-1 hover:bg-background rounded-lg"
>
	<div class="flex justify-between">
		<div>
			<div class="text-lg">{session?.name}</div>

			<div class="text-sm text-subtitle-2">
				<div class="flex items-center">
					<TimeSet />
					<div class="pl-2">
						{formatTime(session?.startAt)}
					</div>
				</div>
				<div class="w-6 text-center">|</div>
				<div class="flex items-center">
					<TimeSet />
					<div class="pl-2">{formatTime(session?.endAt)}</div>
				</div>
			</div>
		</div>
		<div class="flex items-center">
			<div><CheckSelector {checked} /></div>
		</div>
	</div>
</div>
