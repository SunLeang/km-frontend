<script>
	import Modal from '$components/elements/modals/Modal.svelte';
	import DeleteChannelRemark from '$components/elements/modals/channel-remark/DeleteChannelRemark.svelte';
	import UpdateChannelRemark from '$components/elements/modals/channel-remark/UpdateChannelRemark.svelte';
	import Pen from '$components/icons/Pen/Pen.svelte';
	import Trash from '$components/icons/Trash/Trash.svelte';
	import { updateChannelRemarkEnable } from '$providers/actions/kchannel/channel/channel';
	import { myChannelRemarkStore } from '$providers/stores/kchannel/my-channel-remarks';
	import { createEventDispatcher } from 'svelte';
	export let remark;
	const dispatch = createEventDispatcher();
	let selectedRemarkChannel;
	let selectedDeleteRemarkChannel;
	const openUpdateChannelRemark = (remark) => {
		selectedRemarkChannel = remark;
	};

	const openDeleteChannelRemark = (remark) => {
		selectedDeleteRemarkChannel = remark;
	};

	let loadChannelRemarkEnableState = {
		channelRemarkEnable: [],
		loading: false,
		loaded: false,
		errMsg: '',
	};
	const onLoadChannelRemarkEnable = async (remark) => {
		try {
			(loadChannelRemarkEnableState.errMsg = ''),
				(loadChannelRemarkEnableState.loading = true),
				(loadChannelRemarkEnableState.loaded = false);
			console.log(remark.isEnable);
			const res = await updateChannelRemarkEnable.load({
				id: remark.id,
				isEnable: !remark.isEnable,
			});
			loadChannelRemarkEnableState.channelRemarkEnable = res.data;
			console.log(res.data);
			loadChannelRemarkEnableState.loaded = true;
			loadChannelRemarkEnableState.loading = false;
		} catch (err) {
			loadChannelRemarkEnableState.errMsg = err.message;
		} finally {
			loadChannelRemarkEnableState.loading = false;
		}
	};
</script>

<div
	class="flex items-center flex-grow px-4 space-x-24 border-2 border-gray-200 cursor-pointer h-14 rounded-xl"
>
	<label
		for={remark.id}
		on:click={() => onLoadChannelRemarkEnable(remark)}
		class="flex items-center flex-grow-0 space-x-3 cursor-pointer"
	>
		<input
			id={remark.id}
			bind:checked={remark.isEnable}
			type="checkbox"
			class="flex-grow-0 w-6 h-6 cursor-pointer"
		/>
		{#if remark.isEnable == true}
			<div>Enable</div>
		{:else}
			<div>Disable</div>
		{/if}
	</label>
	<div class="flex flex-grow">
		<div class="flex-grow-0 text-lg">{remark?.name}</div>
		<div class="flex-grow text-right text-subtitle-2">
			{#if remark.isRequired == true}
				<span class=" text-primary-3">*</span>Required
			{:else}
				Optional
			{/if}
		</div>
	</div>
	<div class="flex justify-end flex-grow-0 space-x-10 text-subtitle-2">
		<div
			class="cursor-pointer hover:text-warning"
			on:click={() => openUpdateChannelRemark(remark)}
		>
			<Pen />
		</div>
		<div
			class="cursor-pointer hover:text-primary-4"
			on:click={() => openDeleteChannelRemark(remark)}
		>
			<Trash />
		</div>
	</div>
</div>

<Modal shown={!!selectedRemarkChannel}>
	<UpdateChannelRemark
		shown={true}
		on:openUpdateChannelRemark={(evt) => {
			const { remark } = evt.detail;
			selectedRemarkChannel = remark;
		}}
		on:close={() => (selectedRemarkChannel = null)}
		on:done={(evt) => {
			selectedRemarkChannel = null;
			const newChannelRemark = evt.detail.newChannelRemark;
			dispatch("reloadData", {newChannelRemark})
		}}
		remark={selectedRemarkChannel}
	/>
</Modal>

<Modal shown={!!selectedDeleteRemarkChannel}>
	<DeleteChannelRemark
		shown={true}
		on:openDeleteChannelRemark={(evt) => {
			const { remark } = evt.detail;
			selectedDeleteRemarkChannel = remark;
		}}
		on:close={() => (selectedDeleteRemarkChannel = null)}
		on:deleted={(evt) => {
			selectedDeleteRemarkChannel = null;
			const deletedChannelRemark = evt.detail.deletedChannelRemark;
			myChannelRemarkStore.deleteById({ id: deletedChannelRemark.id });
		}}
		remark={selectedDeleteRemarkChannel}
	/>
</Modal>
