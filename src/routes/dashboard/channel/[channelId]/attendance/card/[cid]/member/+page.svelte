<script>
  import { page } from "$app/stores";
  import CardMembers from "$components/elements/attendance/card-detail/CardMembers.svelte";
  import { getCardMembershipByCard } from "$providers/actions/kchannel/card/card-membership";
  import { onMount } from "svelte";

  const cardId = $page.params?.cid;

  let loadCardMemberByCardState = {
    cardMembers: [],
    loading: false,
    errMsg: "",
    loaded: false,
    searchText: "",
    sortByText: "",
    hasMore: true,
    page: 0,
  };

  const onLoadCardMembers = async (reset = false) => {
    try {
      if (reset) {
        loadCardMemberByCardState.page = 0;
        loadCardMemberByCardState.hasMore = true;
        loadCardMemberByCardState.cardMembers = [];
      }
      if (loadCardMemberByCardState.loading) {
        return;
      }
      loadCardMemberByCardState.errMsg = "";
      loadCardMemberByCardState.loading = true;
      loadCardMemberByCardState.loaded = false;
      const res = await getCardMembershipByCard.load({
        card: cardId,
        page: loadCardMemberByCardState.page,
        filter: loadCardMemberByCardState.searchText,
        sortBy: loadCardMemberByCardState.sortByText,
      });
      if (res.data?.total > 0) {
        loadCardMemberByCardState.cardMembers = [
          ...loadCardMemberByCardState.cardMembers,
          ...res.data.cardMembership,
        ];
        loadCardMemberByCardState.page++;
      } else {
        loadCardMemberByCardState.hasMore = false;
      }

      loadCardMemberByCardState.loaded = true;
      loadCardMemberByCardState.loading = false;
    } catch (err) {
      loadCardMemberByCardState.errMsg = err.message;
    } finally {
      loadCardMemberByCardState.loading = false;
    }
  };

  onMount(() => {
    onLoadCardMembers(true);
  });
</script>

<div class="w-full h-full py-4">
  <CardMembers
    bind:memberships={loadCardMemberByCardState.cardMembers}
    bind:hasMore={loadCardMemberByCardState.hasMore}
    on:reloadMemberships={(evt) => {
      onLoadCardMembers();
    }}
    on:search={(evt) => {
      const { searchText } = evt.detail;
      loadCardMemberByCardState.searchText = searchText;
      onLoadCardMembers();
    }}
    on:sortBy={(evt) => {
      const { sortByText } = evt.detail;
      loadCardMemberByCardState.sortByText = sortByText;
      onLoadCardMembers();
    }}
    on:morePage={(evt) => {
      const { loadMore } = evt.detail;
      console.log("Hi lalalassdsdsdsd", loadCardMemberByCardState.hasMore);
      onLoadCardMembers();
    }}
  />
</div>
