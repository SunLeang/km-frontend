<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SignOutIcon from "$components/icons/SignOut.svelte";
  import SMFBLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { signOut } from "$providers/actions/kauth/auth";
  import { getChannels } from "$providers/actions/kchannel/channel/channel";
  import { user } from "$providers/stores/kauth/user";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ChProfileItem from "./ChProfileItem.svelte";
  import { mychannels } from "$providers/stores/kchannel/my-channel";
  import ErrorWarningFill from "$components/icons/error-warning/ErrorWarningFill.svelte";
  const dispatch = createEventDispatcher();

  $: channelId = $page.params.channelId;

  $: if (channelId) {
    if (channelId) {
      selectedChannel = $mychannels.find((ch) => ch.id === channelId);
    }
  } else {
    selectedChannel = null;
  }

  let isOpen = false;
  let selectedChannel;
  let element;

  const onSignOut = async () => {
    const data = await signOut.load(fetch);
    if (data.success) goto("/auth");
  };
  let loadChannelState = {
    channels: null,
    loading: false,
    errMsg: "",
    loaded: false,
  };
  const onLoadAChannel = async () => {
    try {
      loadChannelState.errMsg = "";
      loadChannelState.loading = true;
      loadChannelState.loaded = false;
      const res = await getChannels.load();
      loadChannelState.channels = res.data;

      selectedChannel = loadChannelState.channels.find(
        (ch) => ch.id === channelId,
      );

      loadChannelState.loaded = true;
    } catch (err) {
      loadChannelState.errMsg = "Error loading channels";
      console.log("Error loading channels:", err);
    } finally {
      loadChannelState.loading = false;
    }
  };

  onMount(() => {
    onLoadAChannel();
  });

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function selectOption(channel) {
    selectedChannel = channel;
    dispatch("optionSelected", { channel });
    goto(`/dashboard/channel/${channel.id}/`);
  }

  function handleClickOutside(event) {
    if (isOpen && !event.target.closest(".dropdown-container")) {
      toggleDropdown();
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  let imgLoaded = false;
  let channelImgLoaded = false;
</script>

<div class="relative h-full flex justify-end items-center" bind:this={element} >
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class=" flex justify-end items-center text-gray-700 focus:outline-none "
    on:click={toggleDropdown}
  >
    {#if loadChannelState.loaded}
      <button
        in:fade={{ duration: 200 }}
        class="flex items-center justify-end p-1 pl-4 space-x-2 rounded-full dropdown-container bg-white "
      >
        {#if !!selectedChannel}
          <div
            class="truncate hover:text-clip max-w-[230px] text-lg font-medium"
          >
            {selectedChannel?.name || "Choose a channel"}
          </div>
          <div class=" w-10 h-10 rounded-full bg-slate-400">
            <img
              hidden={!channelImgLoaded}
              class=" min-w-[40px] h-10 rounded-full border border-background-2 object-cover"
              src={selectedChannel?.profile?.thumbnail?.url}
              alt=""
              on:load={() => (channelImgLoaded = true)}
            />
          </div>
        {:else}
          <div
            class="truncate hover:text-clip max-w-[230px] text-lg font-medium py-1 px-2"
          >
            {"Choose a channel"}
          </div>
        {/if}
      </button>
    {:else if loadChannelState.loading}
      <div
        in:fade={{ duration: 100 }}
        class="flex items-center justify-center w-40 h-12 rounded-full dropdown-container bg-background-1"
      >
        <SMFBLoading color="gray" />
      </div>
    {:else if !loadChannelState.loaded && loadChannelState.errMsg}
      <div class=" font-semibold text-center text-red-500 ">
        <ErrorWarningFill  />
      </div>
    {/if}
  </div>

  {#if isOpen}
    <div
      class=" w-72 absolute top-0 right-0 z-20 px-2 pt-2 mt-2 border-2 rounded-md shadow-lg dropdown-options bg-background border-background-1"
    >
      <div class="p-4 bg-white rounded-lg">
        <div class="flex items-center pb-4 space-x-4">
          <div class="w-16 h-16 rounded-full bg-slate-400">
            <img
              hidden={!imgLoaded}
              class="object-cover w-16 h-16 border rounded-full"
              src={$user?.photo?.thumbnail?.url}
              alt=""
              on:load={() => (imgLoaded = true)}
            />
          </div>
          <div class="font-medium">
            {$user.firstName + " " + $user.lastName}
            <div class="text-sm text-subtitle-2">
              @{$user.username}
            </div>
          </div>
        </div>
        <div class="w-full space-y-2 overflow-auto max-h-[400px]">
          {#if loadChannelState.loaded}
            {#each $mychannels as channel}
              <ChProfileItem
                bind:channel
                on:select={() => {
                  selectOption(channel);
                }}
              />
            {/each}
          {:else if loadChannelState.loading}
            <div class="flex items-center justify-center w-full h-full">
              <SMFBLoading color="gray" />
            </div>
          {:else if !loadChannelState.loaded && loadChannelState.errMsg}
            <div class="p-5 font-semibold text-center text-subtitle-2">
              {"Unable to load channels"}
            </div>
          {/if}
        </div>
      </div>
      <div class="w-full py-2 m-auto text-center">
        <button on:click={onSignOut}>
          <div class="flex py-2 text-gray-500 hover:text-gray-700">
            <SignOutIcon /> Sign out
          </div>
        </button>
      </div>
    </div>
  {/if}
</div>
