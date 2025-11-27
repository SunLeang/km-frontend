<script>
	import { page } from "$app/stores";
	import UpDown from "$components/icons/Arrow/UpDown.svelte";
	import TimeSet from "$components/icons/Time/TimeSet.svelte";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import {
		addMinutesToDatetime,
		convertDateToTimestamp,
	} from "$lib/utils/date";
	import { createAttdSession } from "$providers/actions/kchannel/attendance/att-session";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	export let shown;
	export let cardId;
	let sessionName;
	let currentDate = new Date().toISOString().slice(0, 10); // Set currentDate to current date (format: "YYYY-MM-DD")
	let currentTime = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}); // Set currentTime to current time (format: "HH:mm")
	let startDate = currentDate;
	let startTime = currentTime;
	let lateTime = 15; // Default late time in minutes
	let endDate = currentDate;
	let endTime = currentTime; // End time startDate + 1h
	let loadACreateSessionState = {
		newSession: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};
	let hasLatetime = true;

	const onLoadACreateSession = async () => {
		try {
			loadACreateSessionState.errMsg = "";
			loadACreateSessionState.loading = true;
			loadACreateSessionState.loaded = false;
			const res = await createAttdSession.load({
				name: sessionName,
				startAt: convertDateToTimestamp(startDate, startTime),
				endAt: convertDateToTimestamp(endDate, endTime),
				lateAt: addMinutesToDatetime(startDate, startTime, lateTime),
				channel: $page.params.channelId,
				card: selectedCard.id,
				hasLatetime: hasLatetime,
			});
			loadACreateSessionState.newSession = res.data;
			loadACreateSessionState.loaded = true;
			dispatch("created", { newSession: res.data });
		} catch (err) {
			loadACreateSessionState.errMsg = err.message;
		} finally {
			loadACreateSessionState.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div class="relative bg-white w-[450px] h-[540px] rounded-lg shadow-md">
			<form on:submit|preventDefault={onLoadACreateSession}>
				<div class="w-full h-full p-8">
					<div class="text-2xl text-center">New session</div>
					<div class="space-y-2">
						<label for="">Session name</label>
						<input
							type="text"
							id="default-search"
							required
							bind:value={sessionName}
							class="block w-full p-3 px-4 text-xl bg-white border-2 outline-none text-title-1 border-background-1 rounded-xl dark:placeholder-subtitle-2 dark:text-title-1"
							placeholder="New session"
						/>
					</div>
					<div class="flex items-center px-6 py-6 space-x-3">
						<div class=" pt-9">
							<div class=" text-background-1"><UpDown /></div>
						</div>
						<div class="space-y-4">
							<div class="flex flex-col space-y-2">
								<label for="start">From</label>
								<div
									class="flex w-full px-2 py-2 text-xl border-2 outline-none text-title-1 border-background-1 rounded-xl dark:placeholder-subtitle-2 dark:text-title-1"
								>
									<input
										class="block cursor-pointer w-[150px] outline-none text-xl text-title-1 border-none dark:placeholder-subtitle-2 dark:text-title-1"
										type="date"
										name=""
										bind:value={startDate}
										id="startDate"
									/>
									<input
										class="block w-[150px] cursor-pointer outline-none text-xl text-title-1 border-none dark:placeholder-subtitle-2 dark:text-title-1"
										type="time"
										name=""
										bind:value={startTime}
										id="startTime"
									/>
								</div>
							</div>
							<div class="flex flex-col space-y-2">
								<label for="">To</label>
								<div
									class="flex px-2 py-2 text-xl border-2 outline-none text-title-1 border-background-1 rounded-xl dark:placeholder-subtitle-2 dark:text-title-1"
								>
									<input
										class="block w-[150px] cursor-pointer outline-none text-xl text-title-1 border-none dark:placeholder-subtitle-2 dark:text-title-1"
										type="date"
										name=""
										bind:value={endDate}
										id="endDate"
									/>
									<input
										class="block w-[150px] cursor-pointer outline-none text-xl text-title-1 border-none dark:placeholder-subtitle-2 dark:text-title-1"
										type="time"
										name=""
										bind:value={endTime}
										id="endTime"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="flex items-center px-5 py-4 space-x-4">
						<input
							id="checkSetLate"
							type="checkbox"
							bind:checked={hasLatetime}
							class="w-6 h-6 cursor-pointer accent-primary-4"
						/>
						<label for="checkSetLate" class="cursor-pointer"
							>Set late time</label
						>

						<div class="flex items-center space-x-2 cursor-pointer">
							<div
								class="flex items-center px-4 py-2 space-x-4 text-xl border-2 outline-none text-title-1 border-background-1 rounded-xl dark:placeholder-subtitle-2 dark:text-title-1"
							>
								<div><TimeSet /></div>
								<input
									type="number"
									bind:value={lateTime}
									max="60"
									min="0"
									id="endTime"
									class="block w-16 text-xl border-none outline-none cursor-pointer text-title-1 dark:placeholder-subtitle-2 dark:text-title-1"
								/>
							</div>

							<div>min(s)</div>
						</div>
					</div>
					<div
						class="absolute flex justify-end w-full space-x-3 bottom-6 right-6"
					>
						<div
							on:click={() => dispatch("close")}
							class="inline-flex items-center px-6 py-2 text-center cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
						>
							Cancel
						</div>
						<button
							type="submit"
							class="items-center px-10 py-2 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
						>
							{#if loadACreateSessionState.loading}
								<SMFBLoading color="white" />
							{:else}
								Submit
							{/if}
							{#if !loadACreateSessionState.loading && loadACreateSessionState.errMsg}
								<div class="p-5 font-semibold text-center text-subtitle-2">
									{loadACreateSessionState.errMsg}
								</div>
							{/if}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}
