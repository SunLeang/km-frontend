<script>
	import { page } from "$app/stores";
	import ChannelRemarkList from "$components/elements/channel-remark/ChannelRemarkList.svelte";
	import Modal from "$components/elements/modals/Modal.svelte";
	import AddChannelRemark from "$components/elements/modals/channel-remark/AddChannelRemark.svelte";
	import AddCircle from "$components/icons/Add/AddCircle.svelte";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import { channelRemarksByChannel } from "$providers/actions/kchannel/channel/channel";

	import { createEventDispatcher, onMount } from "svelte";
	export let selectedGroup;
	export let options;
	export let selectedCard;

	const dispatch = createEventDispatcher();
	let addNewChannelRemarkShown = false;

	let loadChannelRemarkState = {
		channelRemarks: [],
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onLoadChannelRemark = async () => {
		try {
			loadChannelRemarkState.errMsg = "";
			loadChannelRemarkState.loading = true;
			loadChannelRemarkState.loaded = false;
			const res = await channelRemarksByChannel.load({
				channelId: $page.params.channelId,
			});
			loadChannelRemarkState.channelRemarks = res.data;
			loadChannelRemarkState.loaded = true;
			loadChannelRemarkState.loading = false;
		} catch (err) {
			loadChannelRemarkState.errMsg = err.message;
		} finally {
			loadChannelRemarkState.loading = false;
		}
	};
	onMount(async () => {
		await onLoadChannelRemark();
	});
</script>

<div class="w-full h-full p-2 overflow-y-auto">
	<div class="max-w-6xl mx-auto">
		<div class="p-4 space-y-12 rounded-lg shadow-sm bg-background-2">
			<div class="flex justify-between py-2 text-lg text-subtitle">
				<div>Remark fields</div>
				<div class="flex">
					<div
						on:click={() => {
							addNewChannelRemarkShown = true;
						}}
						class="flex items-center w-auto p-2 px-3 space-x-2 border-2 rounded-full cursor-pointer hover:bg-background-1 border-background-1"
					>
						<div class=""><AddCircle /></div>
						<div>New remark</div>
					</div>
				</div>
			</div>
			<div
				class="relative flex flex-col h-screen max-w-3xl mx-auto rounded-lg shadow-sm"
			>
				<div class="absolute inset-0 flex flex-col px-2 overflow-auto">
					<div class="flex flex-col space-y-3">
						{#if loadChannelRemarkState.loaded}
							<ChannelRemarkList
								{loadChannelRemarkState}
								on:reloadData={() => {
									onLoadChannelRemark();
								}}
							/>
						{:else}
							<div class="flex items-center justify-center w-full h-full">
								<SMFBLoading color="gray" />
							</div>
						{/if}
						{#if !loadChannelRemarkState.loading && loadChannelRemarkState.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadChannelRemarkState.errMsg}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal shown={addNewChannelRemarkShown}>
	<AddChannelRemark
		shown={true}
		on:close={() => (addNewChannelRemarkShown = false)}
		on:created={(evt) => {
			addNewChannelRemarkShown = false;
		}}
	/>
</Modal>
