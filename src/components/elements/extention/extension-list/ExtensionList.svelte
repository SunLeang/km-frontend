<script>
	import Modal from '$components/elements/modals/Modal.svelte';
	import Review from '$components/elements/modals/extension/Review.svelte';
	import Subscription from '$components/elements/modals/extension/Subscription.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import { getChannelExtensionsSubscription } from '$providers/actions/kchannel/channel/channel';
	import {
		getExtensions,
		unsubscribeChannelExtension,
	} from '$providers/actions/kchannel/extension.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import ExtensionListItem from './ExtensionListItem.svelte';

	const dispatch = createEventDispatcher();

	export let channelId;
	export let selectedSession;
	console.log('hey u,', selectedSession);

	let selectedFeedbackExtension;
	let selectedRemoveSubscription;
	console.log(selectedRemoveSubscription);
	let selectedExtension;
	let addRateModalShown = false;
	let addSubscriptionModalShown = false;
	let isAddOpen = false;
	let isAddedOpen = false;
	let isButtonDisable = false;

	let loadExtensionState = {
		extensions: null,
		loading: false,
		errMsg: 'Not Found',
		loaded: false,
	};
	const onLoadExtensions = async () => {
		try {
			loadExtensionState.errMsg = '';
			loadExtensionState.loading = true;
			loadExtensionState.loaded = false;
			const res = await getExtensions.load({ channel: channelId });
			loadExtensionState.extensions = res.data;
			loadExtensionState.loaded = true;
		} catch (err) {
			loadExtensionState.errMsg = err.message;
		} finally {
			loadExtensionState.loading = false;
		}
	};

	let loadRemoveSubscription = {
		removeSubscription: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};

	const onReloadMyExtensionSubscriptions = async () => {
		getChannelExtensionsSubscription.load({
			channelId: channelId,
		});
	};

	const onLoadRemoveSubscription = async (extensionId) => {
		try {
			loadRemoveSubscription.loading = true;
			loadRemoveSubscription.loaded = false;
			loadRemoveSubscription.removeSubscription =
				await unsubscribeChannelExtension.load({
					extension: extensionId,
					channel: channelId,
				});
			loadRemoveSubscription.loaded = true;
			onLoadExtensions();
			onReloadMyExtensionSubscriptions();
		} catch (err) {
			console.log(err);
			loadRemoveSubscription.errMsg = err.message;
		} finally {
			loadRemoveSubscription.loading = false;
		}
	};

	onMount(() => {
		onLoadExtensions();
	});
</script>

<div class="space-y-3">
	{#if loadExtensionState.loaded}
		{#each loadExtensionState.extensions as extension}
			<ExtensionListItem
				{loadRemoveSubscription}
				{channelId}
				{extension}
				on:feedback={(evt) => {
					selectedFeedbackExtension = evt.detail.extension;
					addRateModalShown = true;
				}}
				on:unsubscribe={(evt) => {
					const extension = evt.detail.extension;
					onLoadRemoveSubscription(extension.id);
				}}
				on:subscribe={(evt) => {
					selectedExtension = evt.detail.extension;
					addSubscriptionModalShown = true;
				}}
			/>
		{/each}
	{:else if loadExtensionState.loading}
		<div
			class="absolute inset-0 z-50 flex items-center justify-center w-full h-full"
		>
			<SMFBLoading color="gray" />
		</div>
	{/if}
	{#if !loadExtensionState.loading && loadExtensionState.errMsg}
		<div
			class="absolute inset-0 z-50 flex items-center justify-center w-full h-full"
		>
			{loadExtensionState.errMsg}
		</div>
	{/if}
</div>

<Modal shown={addRateModalShown}>
	<Review
		shown={true}
		extensionDetail={selectedFeedbackExtension}
		on:close={() => (addRateModalShown = false)}
		on:onReviewed={() => {
			onLoadExtensions();
			addRateModalShown = false;
		}}
	/>
</Modal>
<Modal shown={addSubscriptionModalShown}>
	<Subscription
		shown={true}
		extensionDetail={selectedExtension}
		on:close={() => (addSubscriptionModalShown = false)}
		on:onSubscribed={() => {
			onLoadExtensions();
			onReloadMyExtensionSubscriptions();
			addSubscriptionModalShown = false;
		}}
	/>
</Modal>
