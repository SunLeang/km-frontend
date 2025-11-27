import { APIs } from '$lib/statics/apis';
import {
	CREATE_EXTENSIONSUBSCRIPTION_QUERY,
	CREATE_EXTENSION_REVIEW_QUERY,
	EXTENSION_SUBSCRIPTION_QUERY,
	EXTENSION_UNSUBSCRIPTION_QUERY,
	GET_CHANNELREVIEW_BYUSER_QUERY,
	GET_CHANNELREVIEW_QUERY,
	GET_EXTENSIONS_QUERY,
	GET_EXTENSION_QUERY,
	REMOVE_EXTENSIONSUBSCRIPTION_QUERY,
	UPDATE_EXTENSIONSUBSCRIPTION_QUERY,
	UPDATE_EXTENSION_REVIEW_QUERY
} from '$providers/queries/kchannel/extension';
import { endpointFetch } from '../utils';
/**
 * EXTENSION
 */
export const getExtensions = {
	load: async ({ channel }) => {
		const res = await endpointFetch(
			{
				query: GET_EXTENSIONS_QUERY,
				variables: { channel },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['extensions'];
			return res;
		}
		throw res;
	},
};

export const getExtension = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				query: GET_EXTENSION_QUERY,
				variables: { id },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['extension'];
			return res;
		}
		throw res;
	},
};
/**
 * EXTENSIONSUBSCRIPTION
 */
export const createExtensionSubscription = {
	load: async ({ extension, channel, expiredAt, issuedAt, deleted }) => {
		const res = await endpointFetch(
			{
				mutation: CREATE_EXTENSIONSUBSCRIPTION_QUERY,
				variables: { extension, channel, expiredAt, issuedAt, deleted }
			},
			APIs.KCHANNEL
		);
		if (res?.success == true){
			res['data'] = res['data']['createExtensionSubscription'];
			return res;
		}
		throw res;
	}
}

export const subscribeChannelExtension = {
	load: async ({ extension, channel }) => {
		const res = await endpointFetch(
			{
				mutation: EXTENSION_SUBSCRIPTION_QUERY,
				variables: { extension, channel }
			},
			APIs.KCHANNEL
		);
		if (res?.success == true){
			res['data'] = res['data']['subscribeChannelExtension'];
			return res;
		}
		throw res;
	}
}

export const unsubscribeChannelExtension = {
	load: async ({ extension, channel }) => {
		const res = await endpointFetch(
			{
				mutation: EXTENSION_UNSUBSCRIPTION_QUERY,
				variables: { extension, channel }
			},
			APIs.KCHANNEL
		);
		if (res?.success == true){
			res['data'] = res['data']['unsubscribeChannelExtension'];
			return res;
		}
		throw res;
	}
}

export const upateExtensionSubscription = {
	load: async ({ id, extension, channel, expiredAt, issuedAt, deleted }) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_EXTENSIONSUBSCRIPTION_QUERY,
				variables: { id, extension, channel, expiredAt, issuedAt, deleted }
			},
			APIs.KCHANNEL
		);
		if (res?.success == true){
			res['data'] = res['data']['updateExtensionSubscription'];
			return res;
		}
		throw res;
	}
}


export const removeExtensionSubscription = {
	load: async ({ id, deleted }) => {
		const res = await endpointFetch(
			{
				mutation: REMOVE_EXTENSIONSUBSCRIPTION_QUERY,
				variables: { id, deleted }
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['removeExtensionSubscription'];
			return res;
		}
		throw res;
	}
}

/**
 * EXTENSION REVIEWER
 */

export const getChannelReview = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNELREVIEW_QUERY,
				variables: { id },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['channelReview'];
			return res;
		}
		throw res;
	},
};

export const getChannelReviewByUser = {
	load: async ({ extensionId }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNELREVIEW_BYUSER_QUERY,
				variables: { extensionId },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			rs['data'] = res['data']['channelReviewByUser'];
			return res;
		}
		throw res;
	},
};

export const createChannelReview = {
	load: async ({ extension, feedback, rate }) => {
		const res = await endpointFetch(
			{
				mutation: CREATE_EXTENSION_REVIEW_QUERY,
				variables: { extension, feedback, rate },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['createChannelReview'];
			return res;
		}
		throw res;
	},
};

export const updateChannelReview = {
	load: async ({ id, feedback, rate }) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_EXTENSION_REVIEW_QUERY,
				variables: { id, feedback, rate },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['createChannelReview'];
			return res;
		}
		throw res;
	},
};
