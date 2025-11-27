import { APIs } from '$lib/statics/apis';
import { endpointFetch } from '$providers/actions/utils';
import { GET_FOLLOWERIDS_QUERY, GET_FOLLOWSHIPS_QUERY } from '$providers/queries/ktalk/channel/followship';

export const getFollowships = {
   load: async ({ channel, page, limit, searchText }) => {
      const res = await endpointFetch(
        {
         query: GET_FOLLOWSHIPS_QUERY,
         variables: { channel, page, limit, searchText },
        },
        APIs.KTALK
      );

      if ( res?.success == true) {
         res['data'] = res['data']['followships']
         return res;
      }
      throw res;
   }
}

export const getFollowerIds = {
   load: async ({ channelId }) => {
      const res = await endpointFetch(
         {
            query: GET_FOLLOWERIDS_QUERY,
            variables: { channelId }
         },
         APIs.KTALK
      );

      if (res?.success == true) {
         res['data'] = res['data']['followerIds']
         return res
      }
      throw res;
   }
}