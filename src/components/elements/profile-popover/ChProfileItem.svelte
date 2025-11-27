<script>
  import { page } from "$app/stores";
  import CheckSelector from "$components/materials/check-radio/CheckSelector.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let channel;
  let imgLoaded = false;
  $: channelId = $page.params.channelId;
  $: console.log(channel?.profile?.thumbnail?.url);
</script>

<div
  on:click={() => {
    dispatch("select");
  }}
  class="flex items-center px-2 py-2 pr-4 border-2 rounded-lg shadow-sm cursor-pointer border-background-1 bg-background-2 hover:bg-gray-100"
>
  <div class="flex-grow-0 w-10 h-10 rounded-full border">
    <img
      class:hidden={!imgLoaded}
      class=" w-full h-full object-cover border rounded-full"
      src={channel?.profile?.thumbnail?.url}
      alt=""
      on:load={() => (imgLoaded = true)}
    />
  </div>

  <div class=" text-left truncate hover:text-clip flex-grow px-1">
    {channel.name}
  </div>
  <div class=" flex-grow-0">
    <CheckSelector checked={channel.id == channelId} />
  </div>
</div>
