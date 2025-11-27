import { APIs } from '$lib/statics/apis';
import { myCardsStore } from '$providers/stores/kchannel/my-cards';
import { endpointFetch } from '$providers/actions/utils';
import {
  CREATE_CARD_QUERY,
  GET_CARDS_BY_CHANNEL_AND_EXTENSION_QUERY,
  GET_CARD_QUERY,
  UPDATE_CARD_ATTD_QUERY,
  UPDATE_CARD_ATTD_STATUS_QUERY
} from '$providers/queries/kchannel/card/card';

/**
 * CARD
 */

export const getCard = {
  load: async ({ id }) => {
    const res = await endpointFetch(
      {
        query: GET_CARD_QUERY,
        variables: { id },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['card'];
      myCardsStore.updateById({ id, card: res['data'] });
      return res;
    }

    throw res;
  },
};


export const getCardsByChannelAndExtension = {
  load: async ({ channelId, extensionKeyname }) => {
    const res = await endpointFetch(
      {
        query: GET_CARDS_BY_CHANNEL_AND_EXTENSION_QUERY,
        variables: { channelId, extensionKeyname },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['cardsByChannelAndExtension'];
      // Set cards into store
      myCardsStore.update({ cards: res['data'] });
      return res;
    }
    throw res;
  },
};

export const createCard = {
  load: async ({
    name,
    channel,
    desc,
    extensionKeyname,
    autoApproved = true,
    deleted = false,
  }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_CARD_QUERY,
        variables: {
          name,
          channel,
          desc,
          extensionKeyname,
          autoApproved,
          deleted,
        },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['createCard'];
      return res;
    }
    throw res;
  },
};

export const updateCardAttd = {
  load: async ({
    id,
    name,
    channel,
    desc,
    extensionKeyname,
    autoApproved,
    deleted,
  }) => {
    const res = await endpointFetch(
      {
        mutation: UPDATE_CARD_ATTD_QUERY,
        variables: {
          id,
          name,
          channel,
          desc,
          extensionKeyname,
          autoApproved,
          deleted,
        },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['updateCard'];
      myCardsStore.updateById({ id: res.data.id, card: res['data'] });
      return res;
    }
    throw res;
  },
};

export const deleteCardAttd = {
  load: async ({ id, deleted = true }) => {
    const res = await endpointFetch(
      {
        mutation: UPDATE_CARD_ATTD_STATUS_QUERY,
        variables: {
          id,
          deleted,
        },
      },
      APIs.KCHANNEL
    );
    if (res?.success == true) {
      res['data'] = res['data']['updateCardStatus'];
      myCardsStore.deleteById({ id: res.data.id });
      return res;
    }
    throw res;
  },
};
