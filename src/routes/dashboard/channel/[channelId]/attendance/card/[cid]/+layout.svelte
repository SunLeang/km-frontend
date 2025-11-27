<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import CardDetail from "$components/elements/attendance/card-detail/CardDetail.svelte";
  import CardSessions from "$components/elements/attendance/card-detail/CardSessions.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { getCard } from "$providers/actions/kchannel/card/card";
  import { onMount } from "svelte";

  $: cardId = $page.params?.cid;
  $: if (cardId) {
    onLoadCard();
  }

  let loadCardState = {
    card: null,
    loading: false,
    loaded: true,
    errMsg: "",
  };

  const onLoadCard = async () => {
    try {
      loadCardState.errMsg = "";
      loadCardState.loading = true;
      loadCardState.loaded = false;
      const res = await getCard.load({ id: cardId });
      loadCardState.card = res.data;
      loadCardState.loaded = true;
    } catch (error) {
      loadCardState.errMsg = error?.message;
    } finally {
      loadCardState.loading = false;
    }
  };
</script>

<div class=" w-full h-full pt-2 overflow-y-auto">
  {#if loadCardState.loaded}
    <CardDetail
      bind:selectedCard={loadCardState.card}
      on:cardDeleted={(evt) => {
        const chId = $page.params?.channelId;
        goto(`/dashboard/channel/${chId}/attendance`);
      }}
    >
      <div class="w-full h-full">
        <slot />
      </div>
    </CardDetail>
  {/if}
  {#if !loadCardState.loading && loadCardState.errMsg}
    <div class="m-auto">{loadCardState.errMsg}</div>
  {/if}
  {#if loadCardState.loading}
    <div class=" w-full flex justify-center">
      <SmfbLoading color="gray" />
    </div>
  {/if}
</div>
