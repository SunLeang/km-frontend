import { client } from "$lib/apollo-client/apollo-client.js";
export async function api({ query = null, mutation = null, variables = {} }, URIs = null, request = null, accessToken = '') {
  // request must have at least one query or mutation
  if (!query && !mutation) {
    throw new Error('Query is undefined!');
  }

  try {
    let res
    if (query) {
      res = await client(URIs, request, accessToken).query({
        query,
        variables,
        fetchPolicy: "no-cache"
      });
    } else {
      res = await client(URIs, request, accessToken).mutate({
        mutation,
        variables,
        fetchPolicy: "no-cache"
      });
    }

    return res.data
  } catch (err) {
    console.log("APIErr:", err);
    let errorObj = null
    if (err.graphQLErrors && err.graphQLErrors.length) {
      errorObj = {
        code: err.graphQLErrors[0]['extensions']['code'],
        ...err.graphQLErrors[0]['extensions']['response']
      }
    } else if (err.networkError && err.networkError.result && err.networkError.result.errors.length) {
      // "No network"
      console.error("NetworkError:", err.networkError.result.errors[0]);
    } else if (err.networkError && err.networkError.response) {
      // "No connection with server"
      console.error(err.networkError.name);
    } else {
      // console.error(err);
    }

    return {
      status: errorObj?.statusCode || 500,
      success: false,
      ...errorObj
    }
  }
}
