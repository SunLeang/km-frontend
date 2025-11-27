<script>
	import Modal from '$components/elements/modals/Modal.svelte';
	import MemberStatus from '$components/elements/modals/extension/session/MemberStatus.svelte';
	import ChevronDownSmall from '$components/icons/Chevron/ChevronDownSmall.svelte';
	import PenFill from '$components/icons/Pen/PenFill.svelte';
	import Remark from '$components/icons/Remark/Remark.svelte';
	import Triangle from '$components/icons/Triangle/Triangle.svelte';
	import SMFBLoading from '$components/materials/spinners/fbLoading/SMFBLoading.svelte';
	import { formatHours } from '$lib/utils/date.js';
	import { myAttdMemberships } from '$providers/stores/kchannel/my-attd-membership';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let member;
	export let memberCheckStatus;
	export let loadMembershipByCardAndAttSession;
	export let selectedSession;
	let selectedMembershipsStatus;
	// let memberStatusModalShown = false;
	const popupSelectStatus = (membership) => {
		selectedMembershipsStatus = membership;
	};
	
	
</script>

{#if loadMembershipByCardAndAttSession.loaded}
	{#each $myAttdMemberships as membership}
		<div
			on:click={() => {
				dispatch('select', { membership });
			}}
			class="w-full pl-2"
		>
			<div
				class="flex items-center justify-between w-full p-2 px-4 bg-white border-2 border-background-1 rounded-xl"
			>
				<div class="flex items-center">
					<img
						class="w-16 h-16 rounded-full shadow-sm"
						src="https://www.lothianbuses.com/wp-content/uploads/2022/08/Student-icon.png"
						alt=""
					/>
					<span class="ml-4 text-left text-title-1"
						><div class="font-medium">
							{membership.user?.firstName}
							{membership.user?.lastName}
						</div>
						<div class=" text-subtitle-2">{membership.user?.username}</div>
						<div class="flex">
							<div class="flex items-center text-sm text-subtitle-2">
								<div class=" text-tertiary-3"><ChevronDownSmall /></div>
								{#if membership.attendance?.checkInAt === undefined || membership.attendance?.checkInAt === ''}
									<div class="w-10 px-1 text-left">--:--</div>
								{:else}
									<div class="pr-2">
										{formatHours(membership.attendance?.checkInAt)}
									</div>
								{/if}

								<div class="rotate-180 text-secondary-3">
									<ChevronDownSmall />
								</div>
								{#if membership.attendance?.checkOutAt === undefined || membership.attendance?.checkOutAt === ''}
									<div class="w-10 px-1 text-left">--:--</div>
								{:else}
									<div>{formatHours(membership.attendance?.checkOutAt)}</div>
								{/if}
							</div>
						</div>
					</span>
				</div>
				<div class="flex items-center space-x-8">
					<div class="w-40 m-auto space-y-3 text-subtitle-2">
						{#if membership.attendance?.status === 'Present'}
							<div
								class="w-20 m-auto rounded-md shadow bg-tertiary-5 text-tertiary-4"
							>
								{membership.attendance?.status}
							</div>
						{:else if membership.attendance?.status === 'Excuse'}
							<div
								class=" w-20 m-auto bg-[#E9E9FF] rounded-md text-[#4C3100] shadow"
							>
								{membership.attendance?.status}
							</div>
						{:else if membership.attendance?.status === 'Absent'}
							<div
								class="w-20 m-auto rounded-md shadow bg-primary-5 text-primary-4"
							>
								{membership.attendance?.status}
							</div>
						{:else if membership.attendance?.status === 'Late'}
							<div
								class="w-20 m-auto rounded-md shadow bg-secondary-5 text-secondary-4"
							>
								{membership.attendance?.status}
							</div>
						{/if}

						{#if membership.attendance?.remark !== undefined && membership.attendance?.remark !== ''}
							<div class="text-xs line-clamp-2">
								{membership.attendance?.remark}
							</div>
						{/if}
					</div>
					<div class="flex items-center">
						<div class="relative">
							<button class="px-5 py-2 peer text-subtitle-2">
								<Remark />
							</button>

							<div
								class="absolute z-50 flex-col hidden h-48 py-3 space-y-2 text-white shadow-sm bg-title-1 rounded-xl w-72 top-14 -right-10 peer-hover:flex hover:flex drop-shadow-lg"
							>
								<div class=" text-title-1 absolute -top-5 right-[61px]">
									<Triangle />
								</div>

								<div class="px-5 text-left">
									Remark 1 (Student ID):
									<div class=" text-subtitle-1">e20237890</div>
								</div>
								<div class="px-5 text-left">
									Remark 2 (Student ID):
									<div class=" text-subtitle-1">+855 12 3456789</div>
								</div>
								<div class="px-5 text-left">
									Remark 3 (Email):
									<div class=" text-subtitle-1">hok.tin@itc.edu.kh</div>
								</div>
							</div>
						</div>
						<div
							on:click={() => popupSelectStatus(membership)}
							class="cursor-pointer text-subtitle hover:text-title-1"
						>
							<PenFill />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
{:else if loadMembershipByCardAndAttSession.loading}
	<div class="flex items-end justify-center w-full h-full">
		<SMFBLoading color="gray" />
	</div>
{/if}
{#if !loadMembershipByCardAndAttSession.loading && loadMembershipByCardAndAttSession.errMsg}
	<div class="p-5 font-semibold text-center text-subtitle-2">
		{loadMembershipByCardAndAttSession.errMsg}
	</div>
{/if}

<Modal shown={!!selectedMembershipsStatus}>
	<MemberStatus
		shown={true}
		{memberCheckStatus}
		{selectedSession}
		membership = {selectedMembershipsStatus}
		
		on:popupSelectStatus={(evt) => {
			const { membership } = evt.detail;
			selectedMembershipsStatus = membership;
		}}
		on:close={() => (selectedMembershipsStatus = null)}
		on:done={(evt) => {
			selectedMembershipsStatus= null
			const newAttMembership = evt.detail.newAttendance;
		}}
	/>
</Modal>
