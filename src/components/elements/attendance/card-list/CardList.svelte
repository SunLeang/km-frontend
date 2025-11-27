<script>
	import { page } from "$app/stores";
	import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
	import { myCards } from "$providers/stores/kchannel/my-cards";
	import { createEventDispatcher, onMount } from "svelte";
	import CardListItem from "./CardListItem.svelte";
	import { getAttdSessionsByCard } from "$providers/actions/kchannel/attendance/att-session";
	import { getCardsByChannelAndExtension } from "$providers/actions/kchannel/card/card";
	const dispatch = createEventDispatcher();
	$: channelId = $page.params.channelId;
	$: if (channelId) {
		onLoadACard();
	}
	export let selectedCard;
	let loadCardState = {
		cards: null,
		loading: false,
		errMsg: "",
		loaded: false,
	};
	const onReloadMyAttdSession = async (card) => {
		if (!card || typeof card !== "object" || !card.id) {
			console.error("Invalid card data:", card);
			return;
		}
		getAttdSessionsByCard.load({
			card: card.id,
		});
	};

	const onLoadACard = async () => {
		try {
			loadCardState.errMsg = "";
			loadCardState.loading = true;
			loadCardState.loaded = false;
			const res = await getCardsByChannelAndExtension.load({
				channelId: $page.params.channelId,
				extensionKeyname: $page.route.id.split("/")[4],
			});
			loadCardState.cards = res.data;
			loadCardState.loaded = true;
			loadCardState.loading = false;
		} catch (err) {
			loadCardState.errMsg = err.message;
		} finally {
			loadCardState.loading = false;
		}
	};
	onMount(async () => {
		await onLoadACard();
	});
</script>

{#if loadCardState.loaded}
	{#each $myCards as card}
		<CardListItem
			active={card.id == selectedCard?.id}
			{card}
			on:select={(evt) => {
				const card = evt.detail.card;
				onReloadMyAttdSession(card);
				// onReloadACardMember(card);
				dispatch("select", { card });
			}}
		/>
	{/each}
{:else if loadCardState.loading}
	<div class="flex items-center justify-center w-full h-full">
		<SMFBLoading color="gray" />
	</div>
{/if}
{#if !loadCardState.loading && loadCardState.errMsg}
	<div class="p-5 font-semibold text-center text-subtitle-2">
		{loadCardState.errMsg}
	</div>
{/if}
