<script>
	import Modal from "$components/elements/modals/Modal.svelte";
	import MemberCard from "$components/elements/modals/extension/member/MemberCard.svelte";
	import ChevronDown from "$components/icons/Chevron/ChevronDown.svelte";
	import RecycleFill from "$components/icons/Recycle/RecycleFill.svelte";
	import Search from "$components/icons/Search/Search.svelte";
	import InfiniteScoll from "$components/utils/InfiniteScoll.svelte";
	import { clickOutside } from "$lib/utils/click-outside";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { fade } from "svelte/transition";
	import MemberInfoDetailsList from "./member/MemberInfoDetailsList.svelte";
	const dispatch = createEventDispatcher();
	export let memberships;
	export let hasMore = true;
	export let selectedCard;
	let isOpen = false;
	let isButtonDisable = false;
	let tout;
	let scrollEle;
	let scrollT,
		scrollBarHidden = true;

	let memberFilter = [
		{ id: "all", name: "All" },
		{ id: "APPROVED", name: "Follower" },
		{ id: "REJECTED", name: "QRCode" },
	];
	let filter = "";
	let sortBy = "";
	let loadMorePage = true;

	let selectedOption = memberFilter[0];
	let memberCardShown = false;
	function selectOption(option) {
		selectedOption = option;
		sortBy = option.id == "all" ? "" : option.id;
		dispatch("sortBy", { sortByText: sortBy });
	}
	let page = 0;
	function loadMorepage() {
		page++;
		console.log(page);
	}
	onDestroy(() => {
		clearTimeout(tout);
	});
</script>

<div class="flex flex-col w-full h-full bg-background">
	<div class="flex-grow-0">
		<div class="flex items-center justify-between px-2 py-2">
			<div class="flex items-center space-x-8">
				<div class="flex items-center">
					<label
						for="default-search"
						class="text-sm font-medium sr-only text-subtitle">Search</label
					>
					<div class="w-full px-3">
						<div class="relative w-full">
							<div
								class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sub"
							>
								<Search />
							</div>
							<input
								type="search"
								bind:value={filter}
								on:input={() => dispatch("search", { searchText: filter })}
								id="default-search"
								class="block p-3 pl-10 text-base border-none rounded-full outline-none w-80 text-subtitle bg-background-2 dark:placeholder-gray-400"
								placeholder="Search"
							/>
						</div>
					</div>
					<div class="relative items-center inline-block space-x-1 text-left">
						<button
							disabled={isButtonDisable}
							on:click={() => {
								isOpen = true;
							}}
							class="inline-flex items-center justify-between w-auto px-4 py-1 border rounded-lg shadow-sm border-subtitle-2 bg-background-2 text-subtitle hover:bg-background focus:outline-none"
						>
							<div class="pr-2 text-tertiary-1">{selectedOption.name}</div>
							<div class=" {isOpen === true ? ' rotate-180 duration-150' : ''}">
								<ChevronDown />
							</div>
						</button>
						{#if isOpen}
							<div
								in:fade={{ duration: 100 }}
								class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								{#each memberFilter as option}
									<div
										on:click={() => selectOption(option)}
										use:clickOutside
										on:click_outside={() => {
											isButtonDisable = true;
											tout = setTimeout(() => {
												isButtonDisable = false;
												isOpen = false;
											}, 50);
										}}
										class="px-3 py-2 cursor-pointer hover:bg-background"
									>
										<span class="pr-2">{option.name}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<!-- <div class=" text-tertiary-1">Request only</div> -->
			</div>

			<div class="flex space-x-2">
				<div
					on:click={() => {
						memberCardShown = true;
					}}
					class="flex items-center px-2 py-2 pl-4 space-x-3 text-white border-2 rounded-md cursor-pointer border-subtitle-2 bg-tertiary-3 hover:bg-tertiary-2"
				>
					<RecycleFill />
					<div>Member</div>
				</div>
			</div>
		</div>
	</div>
	<div class="relative flex-grow py-3 overflow-auto bg-red-200">
		<div class="px-3 space-y-2">
			<div
				class="absolute inset-0 px-4 pr-6 space-y-6 overflow-y-auto chat-scrollbar"
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
				<MemberInfoDetailsList bind:memberships />
				<InfiniteScoll
					elementScroll={scrollEle}
					{hasMore}
					threshold={20}
					on:loadMore={(evt) => {
						dispatch("morePage", { loadMore: loadMorePage });
					}}
				/>
			</div>
		</div>
	</div>
</div>

<Modal shown={memberCardShown}>
	<MemberCard
		shown={true}
		cardMemberships={memberships}
		on:updated={(evt) => {
			const newCardMemberships = evt.detail.newCardMemberships;
			console.log("test", newCardMemberships);
			dispatch("reloadMemberships", { newCardMemberships });
			memberCardShown = false;
		}}
		on:close={() => (memberCardShown = false)}
	/>
</Modal>
