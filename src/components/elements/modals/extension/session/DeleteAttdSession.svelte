<script>
	import ExclamationCircle from "$components/icons/Exclamation/Exclamation-circle.svelte";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import { deleteAttdSession } from "$providers/actions/kchannel/attendance/att-session";
	import { createEventDispatcher } from "svelte";
	export let selectedSession;
	export let shown;
	const dispatch = createEventDispatcher();
	let loadADeleteAttdSessionState = {
		deletedAttdSession: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onLoadADeleteAttdSession = async () => {
		try {
			loadADeleteAttdSessionState.errMsg = "";
			loadADeleteAttdSessionState.loading = true;
			loadADeleteAttdSessionState.loaded = false;
			const res = await deleteAttdSession.load({
				id: selectedSession.id,
			});
			loadADeleteAttdSessionState.deletedAttdSession = res.data;
			loadADeleteAttdSessionState.loaded = true;
			dispatch("deleted", { deletedAttdSession: res.data });
		} catch {
			loadADeleteAttdSessionState.errMsg = err.message;
		} finally {
			loadADeleteAttdSessionState.loading = false;
		}
	};
</script>

{#if shown}
	<div class="flex items-center justify-center w-full h-full">
		<div class=" bg-white w-[420px] h-[240px] rounded-lg">
			<div class="flex flex-col items-center h-full px-5 pt-6">
				<div class="flex flex-col items-center justify-center text-primary-3">
					<ExclamationCircle />
				</div>
				<div class="flex items-center justify-center p-3 text-xl text-gray-500">
					<div class=" text-center h-[62px] line-clamp-2">
						Are you sure you want to delete this Session <span
							class="pr-1 text-primary-3">{selectedSession.name}</span
						>?
					</div>
				</div>
				<div class="flex items-center justify-center w-full space-x-2">
					<button
						on:click={() => {
							onLoadADeleteAttdSession();
						}}
						class=" text-white bg-primary-4 hover:bg-primary-3 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 cursor-pointer"
					>
						{#if loadADeleteAttdSessionState.loading}
							<SMFBLoading color="white" />
						{:else}
							Yea, I'm sure
						{/if}
						{#if !loadADeleteAttdSessionState.loading && loadADeleteAttdSessionState.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadADeleteAttdSessionState.errMsg}
							</div>
						{/if}
					</button>

					<button
						on:click={() => dispatch("close")}
						class=" text-gray-500 bg-background hover:bg-background-1 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 cursor-pointer"
					>
						No, cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
