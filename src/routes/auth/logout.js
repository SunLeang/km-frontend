import { api } from '$providers/_api'
import { SIGN_OUT_MUTATION } from '$providers/queries/auth'
import { APIs } from '$lib/statics/apis'

export const post = async ({ request }) => {
  return await api({
    mutation: SIGN_OUT_MUTATION,
  }, APIs.KAUTH, request)
};