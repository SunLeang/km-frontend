import { api } from '$providers/_api'
import { SIGN_IN_MUTATION } from '$providers/queries/auth'
import { APIs } from '$lib/statics/apis'

export const post = async ({ request }) => {
  const params = await request.json()
  return await api({
    mutation: SIGN_IN_MUTATION,
    variables: { ...params }
  }, APIs.KAUTH, request)
};