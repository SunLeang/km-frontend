<script>
	import InfiniteScoll from "$components/utils/InfiniteScoll.svelte";
	import { onMount } from "svelte";
	import SessionList from "./sessions/SessionList.svelte";
	import SessionDetails from "./sessions/session-selected/SessionDetails.svelte";
	import { getAttdSessionsByCard } from "$providers/actions/kchannel/attendance/att-session";
	import { attStatusOptions } from "$lib/statics/attd/attendance";
	import { getCardMembershipByCard } from "$providers/actions/kchannel/card/card-membership";
	import { page } from "$app/stores";

	$: cardId = $page.params?.cid;

	let selectedSession;
	let currPageNumber = 0;
	let scrollEle;
	let scrollT,
		scrollBarHidden = true;
	let loadAttdSessionsState = {
		attdSessions: [],
		loading: false,
		loaded: false,
		errMsg: "",
		hasMore: true,
	};

	let loadCardMemberByCardState = {
		cardMembers: [],
		loading: false,
		errMsg: "",
		loaded: false,
		searchText: "",
		sortByText: "",
		hasMore: true,
	};

	const onLoadCardMembers = async (reset = false) => {
		try {
			if (reset) {
				currPage = 0;
				loadCardMemberByCardState.hasMore = true;
				loadCardMemberByCardState.cardMembers = [];
			}
			if (loadCardMemberByCardState.loading) {
				return;
			}
			loadCardMemberByCardState.errMsg = "";
			loadCardMemberByCardState.loading = true;
			loadCardMemberByCardState.loaded = false;
			const res = await getCardMembershipByCard.load({
				card: cardId,
				page: currPage,
				filter: loadCardMemberByCardState.searchText,
				sortBy: loadCardMemberByCardState.sortByText,
			});
			if (res.data?.total > 0) {
				loadCardMemberByCardState.cardMembers = [
					...loadCardMemberByCardState.cardMembers,
					...res.data.cardMembership,
				];
				let p = currPage + 1;
				currPage = p;
			} else {
				loadCardMemberByCardState.hasMore = false;
			}
			loadCardMemberByCardState.loaded = true;
			loadCardMemberByCardState.loading = false;
		} catch (err) {
			loadCardMemberByCardState.errMsg = err.message;
		} finally {
			loadCardMemberByCardState.loading = false;
		}
	};

	const onLoadAttdSessions = async () => {
		try {
			if (loadAttdSessionsState.loading) return;

			loadAttdSessionsState.errMsg = "";
			loadAttdSessionsState.loading = true;
			loadAttdSessionsState.loaded = false;
			const res = await getAttdSessionsByCard.load({
				card: cardId,
				page: currPageNumber,
			});

			// loadAttdSessionsState.attdSessions = res.data;
			if (res.data?.length > 0) {
				loadAttdSessionsState.attdSessions = [
					...loadAttdSessionsState.attdSessions,
					...res.data,
				];
				currPageNumber++;
			} else {
				loadAttdSessionsState.hasMore = false;
			}

			loadAttdSessionsState.loaded = true;
		} catch (err) {
			loadAttdSessionsState.errMsg = err.message;
		} finally {
			loadAttdSessionsState.loading = false;
		}
	};
	onMount(() => {
		onLoadAttdSessions(true);
		onLoadCardMembers(true);
	});
</script>

<div class="flex-col w-full h-full">
	<div class="flex w-full h-full space-x-4">
		<div class="flex flex-col flex-grow-0">
			<div class="flex flex-grow-0 pb-4 space-x-3">
				<div class="p-1 px-2 rounded-md bg-tertiary-7">All</div>

				<div class="p-1 px-2 text-white rounded-md bg-tertiary-3">
					Jun 28, 2023
				</div>
			</div>
			<div
				class="flex-grow overflow-y-auto chat-scrollbar"
				style={`--visble: ${scrollBarHidden ? "hidden" : "visible"}`}
				bind:this={scrollEle}
				on:scroll={() => {
					if (scrollT) clearTimeout(scrollT);
					scrollBarHidden = false;
					scrollT = setTimeout(() => {
						scrollBarHidden = true;
					}, 200);
				}}
			>
				<SessionList
					bind:cardId
					bind:selectedSession
					bind:loadAttdSessionsState
					on:select={(evt) => {
						selectedSession = evt.detail.session;
					}}
				/>
				<InfiniteScoll
					elementScroll={scrollEle}
					hasMore={loadAttdSessionsState.hasMore}
					threshold={20}
					on:loadMore={() => {
						onLoadAttdSessions();
					}}
				/>
			</div>
		</div>
		<div class="flex-grow rounded-md bg-background">
			{#if selectedSession?.id !== undefined}
				<div class="w-full h-full py-2 text-center text-subtitle-2">
					<SessionDetails
						bind:selectedSession
						options={attStatusOptions}
						{loadCardMemberByCardState}
						on:sessionDeleted={() => {
							selectedSession = null;
						}}
					/>
				</div>
			{:else}
				<div class="py-4 text-center text-subtitle-2">No session selected</div>
			{/if}
		</div>
	</div>

	{#if selectedSession?.id !== undefined}
		<div class="flex items-center justify-end pt-1 space-x-3 text-subtitle-2">
			{#each attStatusOptions as option, i}
				{#if i !== 0}
					<span class="pr-1 text-title-1">{option?.name}:</span>
					{option?.desc}
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.chat-scrollbar::-webkit-scrollbar {
		width: 6px;
		background-color: red;
	}

	/* .truncate-overflow {
	  --max-lines: 2;
	  position: relative;
	  max-height: calc(var(--lh) * var(--max-lines));
	  overflow: hidden;
	  padding-right: 1rem;
	} */

	/* .small {
	  --lh: 1.5;
	line-height: var(--lh);
	
	} */
</style>
