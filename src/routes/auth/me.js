import { api } from '$providers/_api'
import { ME_QUERY } from '$providers/queries/auth'
import { APIs } from '$lib/statics/apis'

export async function post({ request }) {
  return await api({
    query: ME_QUERY,
  }, APIs.KAUTH, request)
}