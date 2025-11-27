<script>
	import { createEventDispatcher } from 'svelte';
	import SessionDetailsListItem from './SessionDetailsListItem.svelte';
	export let loadCardMemberByCardState;
	export let selectedSession;
	export let loadMembershipByCardAndAttSession;
	console.log("test",loadMembershipByCardAndAttSession);
	const dispatch = createEventDispatcher();

	// let currPageNumber = 0;
	// let scrollEle;
	// let scrollT,
	// 	scrollBarHidden = true;
	// let loadMembershipByCardAndAttSession = {
	// 	membershipByCardAndAttSession: [],
	// 	loading: false,
	// 	loaded: false,
	// 	errMsg: '',
	// 	hasMore: true,
	// };

	// $: if (selectedSession) {
	// 	onLoadMembershipByCardAndAttSession(true);
	// }
	// $: if (loadData) {
	// 	onLoadMembershipByCardAndAttSession(loadData);
	// }
	
	// const onLoadMembershipByCardAndAttSession = async (reset = false) => {
	// 	try {
	// 		if (reset) {
	// 			currPageNumber = 0;
	// 			loadMembershipByCardAndAttSession.hasMore = true;
	// 		}

	// 		if (loadMembershipByCardAndAttSession.loading) {
	// 			return;
	// 		}
	// 		loadMembershipByCardAndAttSession.errMsg = '';
	// 		loadMembershipByCardAndAttSession.loading = true;
	// 		loadMembershipByCardAndAttSession.loaded = false;
	// 		const res = await membershipByCardAndAttSession.load({
	// 			card: selectedSession.card.id,
	// 			attSess: selectedSession.id,
	// 			page: currPageNumber,
	// 			filter: 'phearun01ol',
	// 			status: '',
	// 		});

	// 		if (res.data?.length > 0) {
	// 			loadMembershipByCardAndAttSession.membershipByCardAndAttSession = [
	// 				...loadMembershipByCardAndAttSession.membershipByCardAndAttSession,
	// 				...res.data,
	// 			];
	// 			currPageNumber++;
	// 		} else {
	// 			loadMembershipByCardAndAttSession.hasMore = false;
	// 		}
	// 		loadMembershipByCardAndAttSession.loaded = true;
	// 		loadMembershipByCardAndAttSession.loading = false;
	// 	} catch (err) {
	// 		loadMembershipByCardAndAttSession.errMsg = err.message;
	// 	} finally {
	// 		loadMembershipByCardAndAttSession.loading = false;
	// 	}
	// };
	// onMount(() => {
	// 	onLoadMembershipByCardAndAttSession(true);
	// });

	let memberCheckStatus = [
		{ value: 'Present', status: 'Present', remark: '' },
		{ value: 'Late', status: 'Late', remark: '' },
		{ value: 'Absent', status: 'Absent', remark: '' },
		{ value: 'Excuse', status: 'Excuse', remark: '' },
	];
	let j = 4;
</script>


<SessionDetailsListItem
		onLoadMembershipByCardAndAttSession();
		bind:selectedSession
		bind:loadMembershipByCardAndAttSession
		{memberCheckStatus}
		on:select={(evt) => {
			dispatch('select', {});
		}}
/>
<!-- 
<div
	class="absolute inset-0 px-4 pr-6 space-y-2 overflow-y-auto chat-scrollbar"
	style={`--visble: ${scrollBarHidden ? 'hidden' : 'visible'}`}
	bind:this={scrollEle}
	on:scroll={() => {
		if (scrollT) clearTimeout(scrollT);
		scrollBarHidden = false;
		scrollT = setTimeout(() => {
			scrollBarHidden = true;
		}, 200);
	}}
>
	<SessionDetailsListItem
		onLoadMembershipByCardAndAttSession();
		bind:selectedSession
		bind:loadMembershipByCardAndAttSession
		{memberCheckStatus}
		on:select={(evt) => {
			dispatch('select', {});
		}}
	/>

	<InfiniteScoll
		elementScroll={scrollEle}
		hasMore={loadMembershipByCardAndAttSession.hasMore}
		threshold={20}
		on:loadMore={(evt) => {
			dispatch('morePage', {reload: loadMembershipByCardAndAttSession.hasMore})
			console.log("page ",loadMembershipByCardAndAttSession.hasMore);
			
		}}
	/>
</div>

<style>
	.chat-scrollbar::-webkit-scrollbar {
		width: 6px;
		background-color: red;
	}
</style> -->
