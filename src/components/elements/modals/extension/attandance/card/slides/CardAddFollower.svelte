<script>
	import { page } from "$app/stores";
	import Search from "$components/icons/Search/Search.svelte";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import {
		getFollowerIds,
		getFollowships,
	} from "$providers/actions/ktalk/channel/followship.js";
	import { createEventDispatcher, onMount } from "svelte";
	import { writable } from "svelte/store";
	import FollowerList from "./follower-list/FollowerList.svelte";
	import { createManyCardMemberships } from "$providers/actions/kchannel/card/card-membership";

	const dispatch = createEventDispatcher();

	$: channelId = $page.params.channelId;
	export let getCard;
	export let shown;
	let checked = true;
	let searchText = "";
	let selectFilter = 7;
	let allSelected = false;
	let scrollEle;
	let scrollT,
		scrollBarHidden = true;
	let selectedFollowerIds = [];
	let selectedCount = writable(0);

	let loadFollowshipState = {
		allFollowship: [],
		total: 0,
		loading: false,
		loaded: false,
		errMsg: "",
		hasMore: true,
		pageNum: 1,
	};

	const onLoadFollowship = async (reset = false) => {
		try {
			loadFollowshipState.errMsg = "";
			loadFollowshipState.loaded = false;
			loadFollowshipState.loading = true;

			if (reset) {
				loadFollowshipState.allFollowship = [];
				loadFollowshipState.hasMore = true;
				loadFollowshipState.pageNum = 1;
			}

			const res = await getFollowships.load({
				channel: $page.params.channelId,
				page: loadFollowshipState.pageNum,
				limit: selectFilter,
				searchText,
			});
			// loadFollowshipState.allFollowship = res.data.followships;
			if (res.data?.followships?.length > 0) {
				loadFollowshipState.allFollowship = [
					...loadFollowshipState.allFollowship,
					...res.data.followships,
				];
				loadFollowshipState.pageNum++;
				loadFollowshipState.hasMore = true;

				updateActiveFollowers();
			} else {
				loadFollowshipState.hasMore = false;
			}

			loadFollowshipState.total = res.data.total;
			loadFollowshipState.loaded = true;
		} catch (err) {
			loadFollowshipState.errMsg = err.message;
		} finally {
			loadFollowshipState.loading = false;
		}
	};

	let loadCreateManyCardMemberships = {
		createManyMemberships: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};
	const onCreateManyCardMemberships = async () => {
		try {
			loadCreateManyCardMemberships.errMsg = "";
			loadCreateManyCardMemberships.loaded = false;
			loadCreateManyCardMemberships.loading = true;
			console.log("Hello", selectedFollowerIds);
			console.log("Hello bro1", getCard.autoApproved);
			const res = await createManyCardMemberships.load({
				users: selectedFollowerIds,
				card: getCard.id,
				expiredAt: "null",
				issuedAt: "null",
				approved: getCard.autoApproved,
			});
			console.log("hello");
			loadCreateManyCardMemberships.createManyMemberships = res.data;
			loadCreateManyCardMemberships.loaded = true;
			dispatch("created");
		} catch (err) {
			loadCreateManyCardMemberships.errMsg = err.message;
		} finally {
			loadCreateManyCardMemberships.loading = false;
		}
	};
	let loadFollowerIdsState = {
		allFollowerIds: [],
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const updateActiveFollowers = () => {
		if (
			loadFollowshipState.total > 0 &&
			selectedFollowerIds.length == loadFollowshipState.total
		) {
			allSelected = true;
		}

		loadFollowshipState.allFollowship = loadFollowshipState.allFollowship.map(
			(followship) => {
				followship["active"] = selectedFollowerIds.includes(followship.user.id);
				return followship;
			}
		);
	};

	const onLoadFollowerIds = async () => {
		try {
			if (allSelected == false) {
				selectedFollowerIds = [];
				updateActiveFollowers();
				return;
			}
			loadFollowerIdsState.errMsg = "";
			loadFollowerIdsState.loaded = false;
			loadFollowerIdsState.loading = true;
			const res = await getFollowerIds.load({
				channelId: $page.params.channelId,
			});
			loadFollowerIdsState.allFollowerIds = res.data;
			selectedFollowerIds = res.data;
			loadFollowerIdsState.loaded = true;

			updateActiveFollowers();
		} catch (err) {
			loadFollowerIdsState.errMsg = err.message;
		} finally {
			loadFollowerIdsState.loading = false;
		}
	};
	onMount(() => {
		onLoadFollowship();
	});
</script>

{#if shown}
	<div
		class="  flex flex-col relative bg-white z-50 w-[750px] h-[calc(70vh_-_20px)] min-h-[calc(100vh_-_50px)] rounded-lg shadow-md"
	>
		<div class="flex justify-center flex-grow-0 pt-4 text-2xl">
			{getCard.name}
		</div>
		<div class="flex flex-grow p-6">
			<div class="flex-grow">
				<div
					class="flex flex-col w-full h-full py-4 pl-4 bg-background rounded-xl"
				>
					<div class="flex-grow-0 pl-1 pr-4">
						<div class="flex items-center space-x-2">
							{#if loadFollowerIdsState.loading}
								<SMFBLoading color="gray" />
							{:else}
								<input
									type="checkbox"
									class="scale-150 cursor-pointer form-checkbox"
									checked={allSelected}
									on:click={() => {
										allSelected = !allSelected;
										onLoadFollowerIds();
									}}
								/>
							{/if}
							{#if !loadFollowerIdsState.loading && loadFollowerIdsState.errMsg}
								<div class="p-5 font-semibold text-center text-subtitle-2">
									{loadFollowerIdsState.errMsg}
								</div>
							{/if}

							<!-- on:change={handleCheckAll} -->
							<div class="flex justify-between w-full px-6">
								<span class="ml-6">Name/username</span>

								<span>Follow date</span>
							</div>
						</div>
						<hr class="h-[2px] my-3 border-0 bg-subtitle-2" />
					</div>
					<div class="flex flex-col flex-grow pr-2">
						<div class="relative flex-grow">
							<div
								class="absolute inset-0 overflow-y-auto y-scrollbar"
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
								<div class="pr-3">
									<div class="w-full h-full pl-1 space-y-4">
										<FollowerList
											bind:scrollEle
											bind:followships={loadFollowshipState}
											bind:hasMore={loadFollowshipState.hasMore}
											on:select={(evt) => {
												const user = evt.detail.followship.user;
												const isActive = selectedFollowerIds.includes(user.id);

												if (isActive) {
													allSelected = false;

													selectedFollowerIds = selectedFollowerIds.filter(
														(id) => id != user.id
													);
												} else {
													selectedFollowerIds.push(user.id);
												}
												// Re-render active status
												updateActiveFollowers();
											}}
											on:loadMore={() => {
												onLoadFollowship();
											}}
										/>
										<div class="pt-12" />
									</div>
								</div>
							</div>
						</div>
						<div class="pr-2">
							<div
								class="flex items-center flex-grow-0 w-full h-16 bg-white border shadow-sm rounded-xl"
							>
								<label
									for="default-search"
									class="text-sm font-medium text-gray-900 sr-only dark:text-white"
									>Search</label
								>
								<div class="w-full px-3">
									<div class="relative w-full">
										<div
											class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-subtitle"
										>
											<Search />
										</div>
										<input
											bind:value={searchText}
											on:input={() => onLoadFollowship(true)}
											hideLabel
											type="search"
											id="default-search"
											class="block w-full p-3 pl-10 text-sm text-gray-900 border-none rounded-full outline-none bg-gray-50 dark:bg-background dark:border-gray-600 dark:placeholder-gray-400 dark:text-title-1"
											placeholder="Search"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<form on:submit|preventDefault={onCreateManyCardMemberships}>
			<div class="flex justify-end flex-grow-0 w-full px-6 pb-6 space-x-3">
				<button
					type="submit"
					disabled={loadFollowerIdsState.loading === true}
					class="flex items-center px-10 py-2 space-x-3 text-center text-white cursor-pointer disabled:bg-gray-300 bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
				>
					{#if loadCreateManyCardMemberships.loading}
						<SMFBLoading color="white" />
					{:else}
						Done
					{/if}
					{#if !loadCreateManyCardMemberships.loading && loadCreateManyCardMemberships.errMsg}
						<div class="p-5 font-semibold text-center text-subtitle-2">
							{loadCreateManyCardMemberships.errMsg}
						</div>
					{/if}
				</button>
			</div>
		</form>
	</div>
{/if}

<style>
	.y-scrollbar::-webkit-scrollbar {
		width: 6px;
		background-color: red;
	}
</style>
