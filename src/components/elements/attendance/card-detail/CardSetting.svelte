<script>
	import Trash from "$components/icons/Trash/Trash.svelte";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import { createEventDispatcher } from "svelte";
	import SettingCard from "./setting/SettingCard.svelte";
	import { deleteCardAttd } from "$providers/actions/kchannel/card/card";
	const dispatch = createEventDispatcher();

	export let card;
	let loadDeleteCardAttdState = {
		deleteCardAttd: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onDeleteCardAttd = async () => {
		try {
			loadDeleteCardAttdState.loading = true;
			loadDeleteCardAttdState.errMsg = "";
			loadDeleteCardAttdState.loaded = false;
			const res = await deleteCardAttd.load({
				id: card.id,
			});
			loadDeleteCardAttdState.deleteCardAttd = res.data;
			loadDeleteCardAttdState.loaded = true;
			dispatch("cardDeleted", { card: res.data });
		} catch (err) {
			loadDeleteCardAttdState.errMsg = err.message;
		} finally {
			loadDeleteCardAttdState.loading = false;
		}
	};
</script>

{#if card}
	<div class="flex flex-col items-center w-full h-full bg-white">
		<div class="flex flex-col w-[700px] h-full">
			<SettingCard bind:card />

			<div class="flex flex-col flex-grow-0 space-y-4">
				<div class="flex flex-col flex-grow pt-6 space-y-4">
					<div class="flex-grow-0">Advance settings</div>
				</div>
				<div
					class="flex flex-grow p-2 border-l-4 bg-primary-6 border-primary-4"
				>
					<div class="flex-grow text-subtitle">
						<div class="font-semibold">Delete this card</div>
						<div class="text-sm truncate">
							This action deletes "{card?.name || ""}" and everything this card
							contains. There is no going back
						</div>
					</div>
					<div class="flex-grow-0 my-auto">
						<button
							on:click={onDeleteCardAttd}
							class="flex items-center justify-center py-2 space-x-2 text-center text-white rounded-md shadow cursor-pointer px-3 hover:bg-primary-3 bg-primary-4"
						>
							{#if loadDeleteCardAttdState.loading}
								<SMFBLoading color="white" />
							{:else}
								<div class="text-white"><Trash /></div>
								<div>Delete card</div>
							{/if}
							{#if !loadDeleteCardAttdState.loading && loadDeleteCardAttdState.errMsg}
								<div class="p-5 font-semibold text-center text-subtitle-2">
									{loadDeleteCardAttdState.errMsg}
								</div>
							{/if}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
