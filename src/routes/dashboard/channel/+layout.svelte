<script>
	import { page } from '$app/stores';
	import Extension from '$components/icons/Extension/Extension.svelte';
	import Note from '$components/icons/Note/Note.svelte';
	import TimeCheck from '$components/icons/Time/TimeCheck.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import { getChannelExtensionsSubscription } from '$providers/actions/kchannel/channel/channel';
	import { onMount } from 'svelte';
// import TimeCheck from '$components/icons/Time/TimeCheck.svelte';
	import ExtensionButton from '$components/materials/ExtensionButton.svelte';
	import SubMenuButton from '$components/materials/side-menu/SubMenuButton.svelte';
	import { myExtensionSubscriptions } from '$providers/stores/kchannel/my-extension-subscriptions';

	$: channelId = $page.params.channelId;
	$: if (channelId) {
		onLoadAChannelExtensionSub();
	}
	let loadChannelSubState = {
		channelSub: null,
		loading: false,
		errMsg: '',
		loaded: false,
	};

	const onLoadAChannelExtensionSub = async () => {
		try {
			loadChannelSubState.errMsg = '';
			loadChannelSubState.loading = true;
			loadChannelSubState.loaded = false;
			const res = await getChannelExtensionsSubscription.load({
				channelId: $page.params.channelId,
			});
			loadChannelSubState.channelSub = res.data;
			loadChannelSubState.loaded = true;
		} catch (err) {
			loadChannelSubState.errMsg = err.message;
		} finally {
			loadChannelSubState.loading = false;
		}
	};
	onMount(() => {
		onLoadAChannelExtensionSub();
	});

	// let ready = false;
	// beforeUpdate(async () => {
	// 	if (channelId == '' || channelId == undefined) {
	// 		await goto('/dashboard');
	// 		return;
	// 	} else {
	// 		ready = true;
	// 	}
	// });
</script>

<div class="relative w-screen h-full">
	<div class="flex w-full h-full">
		<!-- menu switch -->
		<div class=" flex flex-col relative w-full max-w-[250px] overflow-y-auto">
			<div class="flex-grow">
				<div class="pt-2 pl-2 text-gray-400">Settings</div>
				<div>
					<SubMenuButton title="Remarks" href="/dashboard/channel/{channelId}/remarks">
						<Note />
					</SubMenuButton>
				</div>
				<div class="pt-2 pl-2 text-gray-400">Extension</div>
				<div>
					<SubMenuButton
						title="Appointment"
						href="/dashboard/channel/{channelId}/appointment"
					>
						<TimeCheck />
					</SubMenuButton>
					{#if loadChannelSubState.loaded}
						{#each $myExtensionSubscriptions as channelSub}
							<SubMenuButton
								title={channelSub?.extension?.name}
								href="/dashboard/channel/{channelId}/{channelSub?.extension
									?.keyname}"
							>
								<TimeCheck />
							</SubMenuButton>
							<!-- <Boxes /> -->
						{/each}
					{:else if loadChannelSubState.loading}
						<div class="flex items-center justify-center w-full h-full">
							<SMFBLoading color="gray" />
						</div>
					{/if}
					{#if !loadChannelSubState.loading && loadChannelSubState.errMsg}
						<div class="p-5 font-semibold text-center text-subtitle-2">
							{loadChannelSubState.errMsg}
						</div>
					{/if}
				</div>
			</div>
			<div class="flex-grow-0">
				<ExtensionButton
					title="Extensions"
					href="/dashboard/channel/{channelId}/extension-store"
				>
					<div class="w-6 h-6">
						<Extension />
					</div>
				</ExtensionButton>
			</div>
		</div>

		<!-- tab content -->
		<div class="relative flex-grow bg-background">
			<div class="absolute inset-0">
				<slot />
			</div>
		</div>
	</div>
</div>
