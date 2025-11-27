<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let ready = false;
  const checkCardId = () => {
    const chId = $page.params?.channelId;
    const cardId = $page.params?.cid;
    if (!cardId) return goto(`/dashboard/channel/${chId}/attendance`);
    ready = true;
  };
  
  onMount(() => {
    checkCardId();
  });
</script>

{#if ready}
  <slot />
{/if}
