<script>
	import Modal from '$components/elements/modals/Modal.svelte';
	import PenFill from '$components/icons/Pen/PenFill.svelte';
	import Remark from '$components/icons/Remark/Remark.svelte';
	import Triangle from '$components/icons/Triangle/Triangle.svelte';
	import { myCardMembershipStore } from '$providers/stores/kchannel/my-card-memberships';
	import { createEventDispatcher } from 'svelte';
	import MemberInfo from '$components/elements/modals/extension/member/member-info/MemberInfo.svelte';
    import { getApproveMembership, getRejectMembership } from '$providers/actions/kchannel/card/card-membership';
	const dispatch = createEventDispatcher();
	export let member;
	export let membership;
	export let memberRemarks;
	let selectedMember = 'test';
	let memberInfoModalShown = false;
	const popupSelectStatus = (selectedMember) => {
		memberInfoModalShown = true;
	};
	let loadApproveState = {
		approvedMembership: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};
	let loadARejectState = {
		rejectedMembership: null,
		loading: false,
		loaded: false,
		errMsg: '',
	};

	const onLoadApprove = async () => {
		try {
			loadApproveState.errMsg = '';
			loadApproveState.loading = true;
			loadApproveState.loaded = false;
			//approve
			const res = await getApproveMembership.load({
				user: membership.user.id,
				card: membership.card.id,
			});
			loadApproveState.approvedMembership = res.data;
			loadApproveState.loading = false;
			loadApproveState.loaded = true;
			// todo: store function
			loadApproveState.loading = false;
			loadApproveState.loaded = true;

			myCardMembershipStore.updateById({
				id: loadApproveState.approvedMembership.id,
				membership: loadApproveState.approvedMembership,
			});
		} catch (err) {
			loadApproveState.errMsg = err.message;
		} finally {
			loadApproveState.loading = false;
		}
	};
	const onReject = async () => {
		try {
			loadARejectState.errMsg = '';
			loadARejectState.loading = true;
			loadARejectState.loaded = false;
			//reject
			const res = await getRejectMembership.load({
				user: membership.user.id,
				card: membership.card.id,
			});
			loadARejectState.rejectedMembership = res.data;
			loadARejectState.loading = false;
			loadARejectState.loaded = true;
			myCardMembershipStore.deleteById({
				id: loadARejectState.rejectedMembership.id,
			});
		} catch (err) {
			loadARejectState.errMsg = err.message;
		} finally {
			loadARejectState.loading = false;
		}
	};
</script>

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
					{membership?.user?.firstName}
					{membership?.user?.lastName}
				</div>
				<div class=" text-subtitle-2">{membership?.user?.username}</div>
			</span>
		</div>
		<div class="flex items-center space-x-8">
			<div class="m-auto space-y-3 text-subtitle-2">
				{#if membership?.approved === false}
					<div class="flex space-x-4">
						<div
							on:click={onReject}
							class="w-24 py-2 text-center shadow cursor-pointer hover:bg-background-1 rounded-xl bg-background text-primary-4"
						>
							Reject
						</div>
						<div
							on:click={onLoadApprove}
							class="py-2 text-center text-white shadow cursor-pointer hover:bg-tertiary-2 rounded-xl w-28 bg-tertiary-3"
						>
							Approve
						</div>
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
							<div class=" text-subtitle-1">{member?.info?.studentId}</div>
						</div>
						<div class="px-5 text-left">
							Remark 2 (Student ID):
							<div class=" text-subtitle-1">{member?.info?.phone}</div>
						</div>
						<div class="px-5 text-left">
							Remark 3 (Email):
							<div class=" text-subtitle-1">{member?.info?.email}</div>
						</div>
					</div>
				</div>
				<div
					on:click={() => popupSelectStatus(selectedMember)}
					class="cursor-pointer text-subtitle hover:text-title-1"
				>
					<PenFill />
				</div>
			</div>
		</div>
	</div>
</div>
<Modal shown={!!memberInfoModalShown}>
	<MemberInfo
		shown={!!memberInfoModalShown}
		{membership}
		{memberRemarks}
		on:popupSelectStatus={(evt) => {
			const { selectedMember } = evt.detail;
			dispatch('memberStatus', { member });
		}}
		on:close={() => (memberInfoModalShown = false)}
	/>
</Modal>
