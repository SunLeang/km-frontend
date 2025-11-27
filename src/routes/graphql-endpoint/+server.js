import { getCookie } from '$lib/utils/cookie.js';
import { api } from '$providers/_api.js'
import { json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
  const params = await request.json();
  const NODE_ENV = process.env.NODE_ENV;
  const isProd = NODE_ENV === 'production';
  if (isProd) {
    params.URLs['csr_uri'] = params.URLs['ssr_uri'] = params.URLs['uri'];
  } else if (NODE_ENV === 'beta') {
    params.URLs['csr_uri'] = params.URLs['ssr_uri'] = params.URLs['betaUri'];
  }

  const res = await api({
    query: params?.query,
    mutation: params?.mutation,
    variables: params?.variables || {}
  }, params.URLs, request, cookies.get('access_token'));

  // Set access token to svelte cookie
  const cookie = res?.headers?.['set-cookie'];
  const token = getCookie(cookie, 'access_token');
  if (cookie && token) {
    cookies.set("access_token", token, { path: '/', httpOnly: false, secure: isProd });
  }

  return json(res)
};