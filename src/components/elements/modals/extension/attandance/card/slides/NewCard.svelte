<script>
	import { page } from "$app/stores";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import {
		createCard,
		getCardsByChannelAndExtension,
	} from "$providers/actions/kchannel/card/card";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	$: channelId = $page.params.channelId;
	export let newCard;
	export let shown;
	let name;
	let desc;
	let loadCardState = {
		createCard: null,
		loading: false,
		loaded: false,
		errMsg: "",
	};
	let loadAllUsersState = {
		allUsers: [],
		loading: false,
		loaded: false,
		errMsg: "",
	};

	const onReloadMyCards = async () => {
		getCardsByChannelAndExtension.load({
			channelId: channelId,
			extensionKeyname: $page.route.id.split("/")[4],
		});
	};
	const onLoadACardData = async () => {
		try {
			loadCardState.errMsg = "";
			loadCardState.loading = true;
			loadCardState.loaded = false;
			const res = await createCard.load({
				name: name,
				channel: $page.params.channelId,
				extensionKeyname: $page.route.id.split("/")[4],
				autoApproved: true,
				desc: desc,
			});
			loadCardState.createCard = res.data;
			loadCardState.loaded = true;
			onReloadMyCards();
			dispatch("next", { getNewCard: loadCardState.createCard });
			console.log(loadCardState.createCard);
		} catch (err) {
			loadCardState.errMsg = err.message;
		} finally {
			loadCardState.loading = false;
		}
	};
</script>

{#if shown}
	<div
		class="  flex flex-col relative bg-white z-50 w-full max-w-sm rounded-lg shadow-md"
	>
		<div class="flex justify-center flex-grow-0 pt-4 text-2xl">New card</div>

		<form
			on:submit|preventDefault={onLoadACardData}
			class="flex flex-col flex-grow p-7"
		>
			<div class="flex flex-col flex-grow w-full h-full space-y-4">
				<div class="flex-grow-0 space-y-2">
					<div for="" class="pl-2">Card Name:</div>
					<div>
						<input
							name="text"
							bind:value={name}
							required
							type="text"
							class="w-full h-12 px-2 text-gray-600 transition duration-100 ease-in-out bg-white border-2 border-gray-200 rounded-lg cursor-pointer focus:outline-none"
							placeholder="ឈ្មោះ"
						/>
					</div>
				</div>
				<div class="flex-grow space-y-2">
					<div for="message" class="pl-2">Description</div>
					<textarea
						name="feedback"
						id="feedback"
						bind:value={desc}
						cols="30"
						rows="10"
						maxlength="500"
						class="w-full h-64 p-4 border-2 rounded-lg resize-none text-subtitle focus:outline-none"
						placeholder="Write..."
					/>
				</div>
			</div>
			<div class="flex-grow-0">
				<div class="flex justify-end w-full space-x-3">
					<button
						on:click={() => dispatch("close")}
						class="inline-flex items-center px-6 py-2 text-center outline-none cursor-pointer text-subtitle bg-background hover:bg-background-1 focus:ring-4 focus:outline-none rounded-xl"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex items-center px-10 py-2 space-x-3 text-center text-white cursor-pointer bg-tertiary-3 hover:bg-tertiary-2 focus:ring-4 focus:outline-none rounded-xl"
					>
						{#if loadCardState.loading}
							<SMFBLoading color="white" />
						{:else}
							Create
						{/if}
						{#if !loadCardState.loading && loadCardState.errMsg}
							<div class="p-5 font-semibold text-center text-subtitle-2">
								{loadCardState.errMsg}
							</div>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
{/if}
