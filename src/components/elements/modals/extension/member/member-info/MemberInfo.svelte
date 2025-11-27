<script>
	import { page } from "$app/stores";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import {
		getChfollowerRemarks,
		setChFollowerRemarkFields,
	} from "$providers/actions/kchannel/channel/channel";
	import { createEventDispatcher, onMount } from "svelte";
	import ChannelRemarkItem from "./ChannelRemarkItem.svelte";
	export let shown;
	export let membership;

	export let memberRemarks;
	const dispatch = createEventDispatcher();

	$: channelId = $page.params.channelId;

	let loadChFollowerRemarkFieldState = {
		channelRemarks: [],
		loading: false,
		loaded: false,
		errMsg: "",
	};

	let setChFollowerRemarkFieldsState = {
		loading: false,
		loaded: false,
		errMsg: "",
	};
	let updatedRemarkFieldsParam = null;

	const onLoadChannelRemark = async () => {
		try {
			loadChFollowerRemarkFieldState.errMsg = "";
			loadChFollowerRemarkFieldState.loading = true;
			loadChFollowerRemarkFieldState.loaded = false;
			const res = await getChfollowerRemarks.load({
				channelId: channelId,
				followerId: membership.user.id,
			});
			loadChFollowerRemarkFieldState.channelRemarks = res.data;
			loadChFollowerRemarkFieldState.loaded = true;
			loadChFollowerRemarkFieldState.loading = false;
		} catch (err) {
			loadChFollowerRemarkFieldState.errMsg = err.message;
		} finally {
			loadChFollowerRemarkFieldState.loading = false;
		}
	};

	const onUpdate = async () => {
		try {
			if (!updatedRemarkFieldsParam) return;

			setChFollowerRemarkFieldsState.errMsg = "";
			setChFollowerRemarkFieldsState.loading = true;
			setChFollowerRemarkFieldsState.loaded = false;
			const res = await setChFollowerRemarkFields.load({
				channelId: channelId,
				followerId: membership.user.id,
				remarkFields: updatedRemarkFieldsParam,
			});

			loadChFollowerRemarkFieldState.channelRemarks = res["data"];
			dispatch("close");
		} catch (err) {
			setChFollowerRemarkFieldsState.errMsg = err?.message || "";
		} finally {
			setChFollowerRemarkFieldsState.loading = false;
		}
	};

	onMount(async () => {
		await onLoadChannelRemark();
	});
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div
			class=" flex flex-col px-5 py-5 bg-white w-full max-w-[560px] h-full max-h-[560px] rounded-2xl shadow"
		>
			<div class="flex flex-col flex-grow">
				<div class="flex flex-grow-0 pb-2 space-x-4">
					<div class="flex flex-grow">
						<div class="flex-grow-0">
							<img
								class=" object-cover h-16 max-w-[64px] border rounded-full"
								src="https://student-management.com/wp-content/uploads/2018/10/smg_about_student-1-e1557866433197.png"
								alt=""
							/>
						</div>

						<div class="flex-grow px-4 my-auto text-left">
							<div class="text-xl">
								{membership?.user?.firstName}
								{membership?.user?.lastName}
							</div>

							<div>@{membership.user?.username}</div>
						</div>
					</div>

					<!-- <div class="flex-grow-0 px-4 py-3">
						<Remark />
					</div> -->
				</div>
				<div class="flex flex-col flex-grow text-base">
					<hr class=" flex-grow-0 bg-background-1 h-[2px]" />
					<div class="flex-grow p-5 space-y-4">
						{#if loadChFollowerRemarkFieldState.loaded}
							{#each loadChFollowerRemarkFieldState.channelRemarks as remark}
								<ChannelRemarkItem
									bind:remark
									value={remark?.followerRemarkField?.value || ""}
									on:change={(evt) => {
										const { remark, value } = evt.detail;
										const mapped =
											loadChFollowerRemarkFieldState.channelRemarks.map(
												(chRemark) => {
													if (chRemark.id == remark.id) {
														return {
															remark: chRemark.id,
															value: value,
														};
													}
													return {
														remark: chRemark.id,
														value: chRemark?.followerRemarkField?.value || "",
													};
												}
											);

										updatedRemarkFieldsParam = [...mapped];
									}}
								/>
							{/each}
						{:else}
							<div class="flex items-center justify-center w-full h-full">
								<SMFBLoading color="gray" />
							</div>
						{/if}
						{#if !loadChFollowerRemarkFieldState.loading && loadChFollowerRemarkFieldState?.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadChFollowerRemarkFieldState.errMsg}
							</div>
						{/if}
						{#if !setChFollowerRemarkFieldsState.loading && setChFollowerRemarkFieldsState?.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{setChFollowerRemarkFieldsState.errMsg}
							</div>
						{/if}
					</div>
				</div>
			</div>
			<div class="flex justify-end flex-grow-0 space-x-3">
				<button
					on:click={() => dispatch("close")}
					class="inline-flex items-center px-6 py-2 text-center cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
				>
					Cancel
				</button>
				<button
					disabled={setChFollowerRemarkFieldsState.loading ||
						!updatedRemarkFieldsParam}
					on:click={() => onUpdate()}
					class=" disabled:bg-gray-400 w-32 flex justify-center items-center px-10 py-2 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
					type="submit"
				>
					{#if !setChFollowerRemarkFieldsState.loading}
						Update
					{:else}
						<SMFBLoading color="white" />
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
