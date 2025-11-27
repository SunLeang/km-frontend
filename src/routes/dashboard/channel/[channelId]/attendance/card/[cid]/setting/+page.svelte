<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import CardSetting from "$components/elements/attendance/card-detail/CardSetting.svelte";
  import { getCard } from "$providers/actions/kchannel/card/card";
  import { onMount } from "svelte";

  $: cardId = $page.params?.cid;
  $: chId = $page.params?.channelId;

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
      console.log({ error });
      loadCardState.errMsg = error?.message;
    }
  };

  onMount(() => {
    onLoadCard();
  });
</script>

{#if loadCardState.loaded}
  <div class="w-full h-full py-4">
    <CardSetting
      bind:card={loadCardState.card}
      on:cardDeleted={(evt) => {
        goto(`/dashboard/channel/${chId}/attendance`);
      }}
    />
  </div>
{/if}
