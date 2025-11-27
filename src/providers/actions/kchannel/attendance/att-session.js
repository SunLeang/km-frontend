import { APIs } from '$lib/statics/apis';
import { myAttdSessionsStore } from '$providers/stores/kchannel/my-attd-sessions';
import { endpointFetch } from '$providers/actions/utils';
import {
  CREATE_ATTDSESSION_QUERY,
  DELETE_ATTDSESSION_QUERY,
  GET_ATTDSESSIONSBYCARD_QUERY,
  UPDATE_ATTDSESSION_QUERY
} from '$providers/queries/kchannel/attendance/att-session';

/**
 * ATTENDANCE SESSIONCARD
 */

export const getAttdSessionsByCard = {
  load: async ({ card, page = 0 }) => {
    const res = await endpointFetch(
      {
        query: GET_ATTDSESSIONSBYCARD_QUERY,
        variables: { card, page },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['attdSessionsByCard'];
      // set attd sessions into store
      if (page > 0) {
        myAttdSessionsStore.append({ newSessions: res['data'] });
      } else {
        myAttdSessionsStore.update({ attdSessions: res['data'] });
      }
      return res;
    }
    throw res;
  },
};

export const createAttdSession = {
  load: async ({
    name,
    startAt,
    endAt,
    lateAt,
    channel,
    card,
    hasLatetime,
  }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_ATTDSESSION_QUERY,
        variables: { name, startAt, endAt, lateAt, channel, card, hasLatetime },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['createAttdSession'];
      return res;
    }
    throw res;
  },
};

export const updateAttdSession = {
  load: async ({
    id,
    name,
    startAt,
    endAt,
    lateAt,
    channel,
    card,
    hasLatetime,
  }) => {
    const res = await endpointFetch(
      {
        mutation: UPDATE_ATTDSESSION_QUERY,
        variables: {
          id,
          name,
          startAt,
          endAt,
          lateAt,
          channel,
          card,
          hasLatetime,
        },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['updateAttdSession'];
      return res;
    }
    throw res;
  },
};

export const deleteAttdSession = {
  load: async ({ id }) => {
    const res = await endpointFetch(
      {
        mutation: DELETE_ATTDSESSION_QUERY,
        variables: { id },
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['deleteAttdSession'];
      console.log(res);
      myAttdSessionsStore.deleteById({ id: res.data.id });
      return res;
    }
    throw res;
  },
};