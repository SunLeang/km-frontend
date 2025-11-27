<script>
	import { page } from '$app/stores';
	import ExtensionList from '$components/elements/extention/extension-list/ExtensionList.svelte';

	$: channelId = $page.params.channelId;

</script>

<div class="flex flex-col w-full h-full max-w-6xl pl-2 mx-auto">
	<div class="flex-grow-0 py-4 text-title-1">Recommended For You</div>
	<div class="flex-grow w-full h-full overflow-y-auto">
		<div class="max-w-6xl mx-auto">
			<div class="w-full h-full pr-2">
				<div class="pb-4">
					<ExtensionList
						bind:channelId
		
					/>
				</div>
			</div>
		</div>
	</div>
</div>
