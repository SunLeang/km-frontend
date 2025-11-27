<script>
	import Modal from "$components/elements/modals/Modal.svelte";
	import ChevronDown from "$components/icons/Chevron/ChevronDown.svelte";
	import Edit from "$components/icons/Edit.svelte";
	import MenuDots from "$components/icons/Menu/Menu-dots.svelte";
	import Scan from "$components/icons/Scan/Scan.svelte";
	import Search from "$components/icons/Search/Search.svelte";
	import Trash from "$components/icons/Trash.svelte";
	import InfiniteScoll from "$components/utils/InfiniteScoll.svelte";
	import { clickOutside } from "$lib/utils/click-outside";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";
	import DeleteAttdSession from "$components/elements/modals/extension/session/DeleteAttdSession.svelte";
	import UpdateSession from "$components/elements/modals/extension/session/UpdateSession.svelte";
	import SessionDetailsList from "./SessionDetailsList.svelte";
	import { membershipByCardAndAttSession } from "$providers/actions/kchannel/card/card-membership";
	const dispatch = createEventDispatcher();
	let isOpen = false;
	let isMenuOpen = false;
	let isButtonDisable = false;
	let tout;
	let scrollEle;
	let scrollT,
		scrollBarHidden = true;

	export let options;
	export let loadCardMemberByCardState;
	export let selectedSession;
	let filter = "";
	let loadData = false;
	let status = "";
	let selectedOption = options[0];
	let updateSessionModalShown = false;
	let deleteAttdSessionModalShown = false;

	let currPageNumber = 0;
	let loadMembershipByCardAndAttSession = {
		membershipByCardAndAttSession: [],
		loading: false,
		loaded: false,
		errMsg: "",
		hasMore: true,
	};
	function selectOption(option) {
		selectedOption = option;
		status = selectedOption.desc == "Members" ? "" : selectedOption.desc;
		dispatch("optionSelected", { status });
		onLoadMembershipByCardAndAttSession(true);
	}

	$: if (selectedSession) {
		onLoadMembershipByCardAndAttSession(true);
	}
	$: if (loadData) {
		onLoadMembershipByCardAndAttSession(loadData);
	}
	const onLoadMembershipByCardAndAttSession = async (reset = false) => {
		try {
			if (reset) {
				currPageNumber = 0;
				loadMembershipByCardAndAttSession.hasMore = true;
				console.log("reset");
			}

			if (loadMembershipByCardAndAttSession.loading) {
				return;
			}
			console.log("page ", currPageNumber);
			loadMembershipByCardAndAttSession.errMsg = "";
			loadMembershipByCardAndAttSession.loading = true;
			loadMembershipByCardAndAttSession.loaded = false;
			const res = await membershipByCardAndAttSession.load({
				card: selectedSession.card.id,
				attSess: selectedSession.id,
				page: currPageNumber,
				filter: filter,
				status: status,
			});

			if (res.data?.length > 0) {
				loadMembershipByCardAndAttSession.membershipByCardAndAttSession = [
					...loadMembershipByCardAndAttSession.membershipByCardAndAttSession,
					...res.data,
				];
				console.log("page1 ", currPageNumber);
				currPageNumber++;
			} else {
				loadMembershipByCardAndAttSession.hasMore = false;
			}
			loadMembershipByCardAndAttSession.loaded = true;
			loadMembershipByCardAndAttSession.loading = false;

			// myAttdMembeshipStore.updateById({
			// 	id: loadMembershipByCardAndAttSession.membershipByCardAndAttSession.id,
			// 	user: loadMembershipByCardAndAttSession.membershipByCardAndAttSession.user.id
			// })
		} catch (err) {
			loadMembershipByCardAndAttSession.errMsg = err.message;
		} finally {
			loadMembershipByCardAndAttSession.loading = false;
		}
	};
	onMount(() => {
		onLoadMembershipByCardAndAttSession(true);
	});

	onDestroy(() => {
		clearTimeout(tout);
	});
	let i = 0;
	console.log("i", i);
</script>

<div class="flex flex-col w-full h-full">
	<div class="flex-grow-0">
		<div class="flex items-center justify-between px-2 pb-2">
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
							on:input={() => onLoadMembershipByCardAndAttSession(true)}
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
						class="inline-flex items-center justify-between w-20 px-4 py-1 border rounded-lg shadow-sm border-subtitle-2 bg-background-2 text-subtitle hover:bg-background focus:outline-none"
					>
						<div class="pr-2">{selectedOption.name}</div>
						<div class=" {isOpen === true ? ' rotate-180 duration-150' : ''}">
							<ChevronDown />
						</div>
					</button>
					{#if isOpen}
						<div
							in:fade={{ duration: 100 }}
							class="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							{#each options as option}
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
									<span class="pr-2">{option.name}</span>:<span class="px-2"
										>{option.desc}</span
									>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="flex space-x-2">
				<div
					class="flex items-center px-2 py-2 pl-4 space-x-3 text-white border-2 rounded-md cursor-pointer border-subtitle-2 bg-tertiary-3 hover:bg-tertiary-2"
				>
					<div>IN</div>
					<Scan />
				</div>
				<div
					class="flex items-center px-2 py-2 pl-4 space-x-3 text-white border-2 rounded-md cursor-pointer border-subtitle-2 bg-secondary-3 hover:bg-secondary-2"
				>
					<div>OUT</div>
					<Scan />
				</div>
				<div class="relative items-center inline-block space-x-1 text-left">
					<button
						disabled={isButtonDisable}
						on:click={() => {
							isMenuOpen = true;
						}}
						class="flex items-center px-2 py-2 rounded-md cursor-pointer text-title-1 border-subtitle-2 hover:bg-background-1"
					>
						<MenuDots />
					</button>
					{#if isMenuOpen}
						<div
							in:fade={{ duration: 100 }}
							class="absolute right-0 z-10 mt-2 space-y-2 origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div
								class="flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-background-1 text-secondary-3"
								use:clickOutside
								on:click={() => (updateSessionModalShown = true)}
								on:click_outside={() => {
									isButtonDisable = true;
									tout = setTimeout(() => {
										isButtonDisable = false;
										isMenuOpen = false;
									}, 50);
								}}
							>
								<Edit />
								<div class=" text-secondary-2">Update</div>
							</div>
							<div
								class="flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer hover:bg-background-1 text-primary-4"
								use:clickOutside
								on:click={() => (deleteAttdSessionModalShown = true)}
								on:click_outside={() => {
									isButtonDisable = true;
									tout = setTimeout(() => {
										isButtonDisable = false;
										isMenuOpen = false;
									}, 50);
								}}
							>
								<Trash />
								<div class=" text-primary-3">delete</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="relative flex-grow pt-3">
		<div
			class="absolute inset-0 px-4 pr-6 space-y-2 overflow-y-auto chat-scrollbar"
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
			<SessionDetailsList
				bind:selectedSession
				bind:loadMembershipByCardAndAttSession
				on:morePage{
				reload
				}
				{loadCardMemberByCardState}
			/>
			<InfiniteScoll
				elementScroll={scrollEle}
				hasMore={loadMembershipByCardAndAttSession.hasMore}
				threshold={20}
				on:loadMore={(evt) => {
					onLoadMembershipByCardAndAttSession();
				}}
			/>
		</div>
	</div>
</div>
<Modal shown={updateSessionModalShown}>
	<UpdateSession
		shown={true}
		{selectedSession}
		on:close={() => (updateSessionModalShown = false)}
	/>
</Modal>
<Modal shown={deleteAttdSessionModalShown}>
	<DeleteAttdSession
		shown={true}
		{selectedSession}
		on:close={() => (deleteAttdSessionModalShown = false)}
		on:deleted={(evt) => {
			const deletedAttdSession = evt.detail.deletedAttdSession;
			deleteAttdSessionModalShown = false;
			dispatch("sessionDeleted", { deletedAttdSession });
		}}
	/>
</Modal>

<style>
	.chat-scrollbar::-webkit-scrollbar {
		width: 6px;
		background-color: red;
	}
</style>
