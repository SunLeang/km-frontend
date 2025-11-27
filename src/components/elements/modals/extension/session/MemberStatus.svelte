<script>
	import Remark from '$components/icons/Remark/Remark.svelte';
	import CheckSelector from '$components/materials/check-radio/CheckSelector.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import {
		createAttendance,
		updateAttendance,
	} from '$providers/actions/kchannel/attendance/attendance.js';
	import { createEventDispatcher } from 'svelte';
	export let shown;
	export let membership;
	export let attendance;
	export let memberCheckStatus;
	export let selectedSession;
	console.log(selectedSession);
	console.log('here', membership);
	let remark = membership.attendance?.remark || '';
	let id = memberCheckStatus?.status?.value || membership.attendance?.status;
	// let id = memberCheckStatus?.status?.value;
	const dispatch = createEventDispatcher();
	function selected(status) {
		id = status.value;
	}

	let loadAttMembeshipStatus = {
		attMembership: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};
	console.log(membership?.id);
	const onUpdateAttMembership = async () => {
		try {
			loadAttMembeshipStatus.errMsg = '';
			loadAttMembeshipStatus.loading = true;
			loadAttMembeshipStatus.loaded = false;
			if (membership.attendance == null) {
				console.log('gg');
				const res = await createAttendance.load({
					attdSession: selectedSession?.id,
					cardMembership: membership?.id,
					checkInAt: selectedSession.startAt,
					checkOutAt: selectedSession.endAt,
					status: id,
					remark: remark,
				});
				loadAttMembeshipStatus.attMembership = res.data;
				loadAttMembeshipStatus.loading = false;
				loadAttMembeshipStatus.loaded = true;
				dispatch('done', {
					newAttendance: loadAttMembeshipStatus.attMembership,
				});
			} else {
				const res = await updateAttendance.load({
					id: membership.attendance?.id,
					attdSession: selectedSession?.id,
					cardMembership: membership?.id,
					checkInAt: membership.attendance?.checkInAt,
					checkOutAt: membership.attendance?.checkOutAt,
					status: id,
					remark: remark,
				});
				loadAttMembeshipStatus.attMembership = res.data;
				loadAttMembeshipStatus.loading = false;
				loadAttMembeshipStatus.loaded = true;
				dispatch('done', {
					newAttendance: loadAttMembeshipStatus.attMembership,
				});
			}

			// loadAttMembeshipStatus.attMembership = res.data;
			// loadAttMembeshipStatus.loading = false;
			// loadAttMembeshipStatus.loaded = true;
			// dispatch('done', {
			// 	newAttendance: loadAttMembeshipStatus.attMembership,
			// });
			console.log('result', loadAttMembeshipStatus.attMembership);
		} catch (err) {
			loadAttMembeshipStatus.errMsg = err.message;
		} finally {
			loadAttMembeshipStatus.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<form
			on:submit|preventDefault={onUpdateAttMembership}
			class="flex flex-col px-5 py-5 bg-white w-[560px] h-[660px] rounded-2xl shadow"
		>
			<div class="flex flex-col flex-grow">
				<div class="flex flex-grow-0 pb-2 space-x-4">
					<div class="flex flex-grow">
						<div class="flex-grow-0">
							<img
								class=" object-cover h-16 max-w-[64px] border rounded-full"
								src="https://toppng.com/uploads/preview/icon-student-icon-for-new-student-11553429035frago151ec.png"
								alt=""
							/>
						</div>

						<div class="flex-grow px-4 my-auto text-left">
							<div class="text-xl">
								{membership.user?.firstName}
								{membership.user?.lastName}
							</div>

							<div>@{membership.user?.username}</div>
						</div>
					</div>

					<div class="flex-grow-0 px-4 py-3">
						<Remark />
					</div>
				</div>
				<div class="flex flex-col flex-grow text-base">
					<hr class=" flex-grow-0 bg-background-1 h-[2px]" />
					<div class="flex-grow px-5">
						<div class="py-2">
							{#each memberCheckStatus as status}
								<div
									on:click={() => selected(status)}
									class=" flex items-center cursor-pointer gap-x-4 hover:rounded-md px-6 py-3 text-title-1 transition hover:bg-background {status?.value ==
									id
										? 'bg-background border-2 rounded-md border-background-1'
										: ' border-x-2 border-white'} "
								>
									<div class="">
										<CheckSelector checked={status?.value == id} />
									</div>
									<div class="">
										{status?.value}
									</div>
								</div>
							{/each}
						</div>
						<div class="text-left">
							<div for="message" class="py-2">Remark</div>
							<textarea
								name="remark"
								bind:value={remark}
								id="remark"
								cols="30"
								rows="5"
								maxlength="300"
								class="w-full p-4 border-2 rounded-lg resize-none text-subtitle focus:outline-none"
								placeholder="Write down your opinion here..."
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="flex justify-end flex-grow-0 space-x-3">
				<button
					on:click={() => dispatch('close')}
					class="inline-flex items-center px-6 py-2 text-center cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
				>
					Cancel
				</button>
				<button
					class="items-center px-10 py-2 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
					type="submit"
				>
					{#if loadAttMembeshipStatus.loading}
						<SMFBLoading color="white" />
					{:else}
						Submit
					{/if}
				</button>
				{#if !loadAttMembeshipStatus.loading && loadAttMembeshipStatus.errMsg}
					<div class="font-semibold text-center text-subtitle-2">
						{loadAttMembeshipStatus.errMsg}
					</div>
				{/if}
			</div>
		</form>
	</div>
{/if}
