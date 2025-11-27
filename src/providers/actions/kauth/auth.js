/**
 * Create HTTP requests
 */
import { APIs } from '$lib/statics/apis';
import { GET_USERS_QUERY, ME_QUERY, SIGN_IN_MUTATION, SIGN_OUT_MUTATION } from '$providers/queries/kauth';
import { userStore } from '$providers/stores/kauth';
import { endpointFetch } from '../utils';

export const me = {
  load: async () => {
    const res = await endpointFetch({
      query: ME_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['me'];
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const getAllUsers = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_USERS_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['users'];
      return res;
    }
  }
}

export const signIn = {
  load: async ({ email, password }) => {
    const res = await endpointFetch({
      mutation: SIGN_IN_MUTATION,
      variables: { email, password }
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['signIn']
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const signOut = {
  load: async () => {
    const res = await endpointFetch({
      mutation: SIGN_OUT_MUTATION,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['signOut']
      userStore.reset({})
      return res;
    }

    throw res;
  }
}

export const getQrCodeInfo = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_QRCODE_INFO_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data'];
      return res;
    }
  }
}
