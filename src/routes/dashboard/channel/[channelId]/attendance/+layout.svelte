<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import NewGroupCard from "$components/elements/attendance/NewGroupCard.svelte";
  import CardList from "$components/elements/attendance/card-list/CardList.svelte";
  import Modal from "$components/elements/modals/Modal.svelte";
  import NewCard from "$components/elements/modals/extension/attandance/card/index.svelte";
  import { tick } from "svelte";
  let element;

  let selectedCard;
  let addNewCardShown = false;

  $: chId = $page.params?.channelId;
  $: cardId = $page.params?.cid;
</script>

<div class="w-full h-full p-2 overflow-y-auto">
  <div class="max-w-6xl mx-auto">
    <div class="p-4 rounded-lg shadow-sm bg-background-2">
      <div class="text-lg text-subtitle">Granting membership</div>
      <div
        bind:this={element}
        on:wheel={(evt) => {
          evt.preventDefault();
          element.scrollBy({
            left: evt.deltaY < 0 ? -30 : 30,
          });
        }}
        class="flex items-center space-x-4 overflow-x-auto h-36"
      >
        <div class="">
          <NewGroupCard
            on:addNewCard={() => {
              addNewCardShown = true;
            }}
          />
        </div>
        <CardList
          on:select={(evt) => {
            selectedCard = null;
            tick().then(() => {
              selectedCard = evt.detail.card;
              goto(
                `/dashboard/channel/${chId}/attendance/card/${selectedCard.id}`
              );
            });
          }}
          {selectedCard}
        />
      </div>
    </div>
    <div class="w-full">
      <slot />
      {#if !cardId}
        <div class="py-12 text-center text-subtitle-2">No card is selected</div>
      {/if}
    </div>
  </div>
</div>
<div>
  <Modal shown={addNewCardShown}>
    <NewCard
      shown={true}
      on:openNewCard={(evt) => {
        const { newCard } = evt.detail;
        // selectedNewCard = newCard;
      }}
      on:close={() => (addNewCardShown = false)}
      on:created={() => {
        addNewCardShown = false;
      }}
    />
  </Modal>
</div>
