import { APIs } from '$lib/statics/apis';
import { myAttdMembeshipStore } from '$providers/stores/kchannel/my-attd-membership';
import { myCardMembershipStore } from '$providers/stores/kchannel/my-card-memberships';
import { endpointFetch } from '$providers/actions/utils';
import { CREATE_ATTDSESSION_QUERY } from '$providers/queries/kchannel/attendance/att-session';
import {
  CREATE_MANY_CARDMEMBERSHIPS_MUTATION,
  DELETE_MANY_CARDMEMBERSHIPS_MUTATION,
  GET_APPROVEMEMBERSHIP_QUERY,
  GET_CARDSMEMBERSHIPBYCARD_QUERY,
  GET_REJECTMEMBERSHIP_QUERY,
  MEMBERSHIP_BY_CARD_AND_ATT_SESSION_QUERY,
  UPDATE_MANY_CARD_MEMBERSHIPS
} from '$providers/queries/kchannel/card/card-membership';

/**
 * CARDMEMBERSHIPS
 */
export const createCardMembership = {
  load: async ({ user, card, expiredAt, issuedAt, approved }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_ATTDSESSION_QUERY,
        variables: { user, card, expiredAt, issuedAt, approved },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['createCardMembership'];
      return res;
    }
    throw res;
  },
};

export const createManyCardMemberships = {
  load: async ({ users = [], card, expiredAt, issuedAt, approved }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_MANY_CARDMEMBERSHIPS_MUTATION,
        variables: { users, card, expiredAt, issuedAt, approved },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['createManyCardMemberships'];
      return res;
    }
    throw res;
  },
};

export const deleteManyCardMemberships = {
  load: async ({ users = [], card }) => {
    const res = await endpointFetch(
      {
        mutation: DELETE_MANY_CARDMEMBERSHIPS_MUTATION,
        variables: { users, card },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['deleteManyCardMemberships'];
      return res;
    }
    throw res;
  },
};

export const getCardMembershipByCard = {
  load: async ({ card, page, filter, sortBy }) => {
    const res = await endpointFetch(
      {
        query: GET_CARDSMEMBERSHIPBYCARD_QUERY,
        variables: { card, page, filter, sortBy },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['cardMembershipsByCard'];

      // Set memberships into store
      myCardMembershipStore.update({ memberships: res['data'] });
      return res;
    }
    throw res;
  },
};

export const getApproveMembership = {
  load: async ({ user, card }) => {
    const res = await endpointFetch(
      {
        mutation: GET_APPROVEMEMBERSHIP_QUERY,
        variables: { card, user },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['approveMembership'];
      return res;
    }
    throw res;
  },
};

export const getRejectMembership = {
  load: async ({ user, card }) => {
    const res = await endpointFetch(
      {
        mutation: GET_REJECTMEMBERSHIP_QUERY,
        variables: { card, user },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['rejectMembership'];
      return res;
    }
    throw res;
  },
};

export const updateManyCardMemberships = {
  load: async ({ users = [], card }) => {
    const res = await endpointFetch(
      {
        mutation: UPDATE_MANY_CARD_MEMBERSHIPS,
        variables: { users, card },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['updateManyCardMemberships'];
      return res;
    }
    throw res;
  },
};

export const membershipByCardAndAttSession = {
  load: async ({ card, attSess, page, filter, status }) => {
    const res = await endpointFetch(
      {
        query: MEMBERSHIP_BY_CARD_AND_ATT_SESSION_QUERY,
        variables: { card, attSess, page, filter, status },
      },
      APIs.KCHANNEL
    );
    if (res?.success == true) {
      res['data'] = res['data']['membershipsByCardAndAttSession'];
      // set attd sessions into store
      if (page > 0) {
        myAttdMembeshipStore.append({ newAttMembership: res['data'] });
      } else {
        myAttdMembeshipStore.update({ attdMemberships: res['data'] });
      }
      return res;
    }
    throw res;
  },
};
