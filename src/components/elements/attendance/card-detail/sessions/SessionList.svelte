<script>
	import Modal from "$components/elements/modals/Modal.svelte";
	import NewSession from "$components/elements/modals/extension/session/NewSession.svelte";
	import {
		myAttdSessions,
		myAttdSessionsStore,
	} from "$providers/stores/kchannel/my-attd-sessions";
	import { createEventDispatcher } from "svelte";
	import SMFBLoading from "../../../../materials/spinners/fbLoading/SMFBLoading.svelte";
	import SessionListItem from "./SessionListItem.svelte";
	const dispatch = createEventDispatcher();
	let addNewSessionModalShown = false;

	export let loadAttdSessionsState;
	export let cardId;
	export let selectedSession;
</script>

<div class="pr-2 space-y-2 bg-white w-80">
	{#each $myAttdSessions as session}
		<SessionListItem
			checked={selectedSession?.id == session?.id}
			{session}
			on:select={(evt) => {
				dispatch("select", { session });
			}}
		/>
	{/each}
	{#if loadAttdSessionsState.loading}
		<div class="flex items-center justify-center">
			<SMFBLoading color="gray" />
		</div>
	{/if}
	{#if !loadAttdSessionsState.loading && loadAttdSessionsState.errMsg}
		<div class="m-auto">{loadAttdSessionsState.errMsg}</div>
	{/if}

	<div class="py-4 m-auto w-max">
		<div
			on:click={() => (addNewSessionModalShown = true)}
			class="p-2 px-4 text-center border-2 rounded-full cursor-pointer text-tertiary-2 bg-background hover:bg-background-1 border-background-1"
		>
			Add new session
		</div>
	</div>
</div>
<div>
	<Modal shown={addNewSessionModalShown}>
		<NewSession
			{cardId}
			shown={true}
			on:close={() => (addNewSessionModalShown = false)}
			on:created={(evt) => {
				const newSession = evt.detail.newSession;
				myAttdSessionsStore.update({ cardRemarks: [newSession] });

				addNewSessionModalShown = false;
			}}
		/>
	</Modal>
</div>
