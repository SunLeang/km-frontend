import { APIs } from '$lib/statics/apis';
import {
	CHANNEL_REMARK_BY_CHANNEL_QUERY,
	CREATE_CHANNEL_REMARK_MUTATION,
	DELETE_CHANNEL_REMARK_MUTATION,
	GET_CHANNELS_QUERY,
	GET_CHANNEL_EXTENSIONS_SUBSCRIPTION,
	GET_CHANNEL_FOLLOWER_REMARKS_QUERY,
	GET_CHANNEL_QUERY,
	SET_CHANNEL_FOLLOWER_REMARK_FIELDS_MUTATION,
	UPDATE_CHANNEL_MUTATION,
	UPDATE_CHANNEL_REMARK_ENABLE_MUTATION,
	UPDATE_CHANNEL_REMARK_MUTATION,
	UPDATE_CHANNEL_REMARK_REQUIRED_MUTATION
} from '$providers/queries/kchannel/channel/channel';
import { myChannelRemarkStore } from '$providers/stores/kchannel/my-channel-remarks';
import { myExtensionSubscriptionsStore } from '$providers/stores/kchannel/my-extension-subscriptions';
import { endpointFetch } from '$providers/actions/utils';
import { mychannelsStore } from '$providers/stores/kchannel/my-channel';

export const getChannels = {
	load: async () => {
		const res = await endpointFetch(
			{
				query: GET_CHANNELS_QUERY,
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['myChannels'];
			// Set cards into store
			mychannelsStore.update({ channels: res['data'] });
			return res;
		}

		throw res;
	},
};

export const getChannel = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_QUERY,
				variables: { id },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['channel'];
			return res;
		}
		throw res;
	},
};

export const updateChannel = {
	load: async ({ id, email, name, phone, bio, profile, desc, website }) => {
		console.log({ id, email, name, phone, bio, profile, desc, website });
		const res = await endpointFetch(
			{
				query: UPDATE_CHANNEL_MUTATION,
				variables: { id, email, name, phone, bio, profile, desc, website },
			},
			APIs.KCHANNEL
		);
		return res;
	},
};

/**
 * CHANNEL EXTENSION SUBSCRIPTION
 */

export const getChannelExtensionsSubscription = {
	load: async ({ channelId }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_EXTENSIONS_SUBSCRIPTION,
				variables: { channelId },
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['extensionSubscriptionByChannel'];

			// Set extensions into store
			myExtensionSubscriptionsStore.update({ extensions: res['data'] });
			return res;
		}
		throw res;
	},
};

/*
 * CHANNEL REMARK
 */

export const channelRemarksByChannel = {
	load: async ({ channelId }) => {
		const res = await endpointFetch(
			{
				query: CHANNEL_REMARK_BY_CHANNEL_QUERY,
				variables: { channelId },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['channelRemarksByChannel'];
			// set card remarks into store
			myChannelRemarkStore.update({ channelRemarks: res['data'] });
			return res;
		}
		throw res;
	},
};

export const createChannelRemark = {
	load: async ({ name, desc, channel, isRequired, isEnable, validationValues = [] }) => {
		const res = await endpointFetch(
			{
				mutation: CREATE_CHANNEL_REMARK_MUTATION,
				variables: { name, desc, channel, isRequired, validationValues, isEnable },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['createChannelRemark'];
			myChannelRemarkStore.append({ newChannelRemarks: [res['data']] });
			return res;
		}
		throw res;
	},
};

export const updateChannelRemark = {
	load: async ({
		id,
		name,
		desc,
		channel,
		isRequired,
		isEnable,
		validationValues = [],
	}) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_CHANNEL_REMARK_MUTATION,
				variables: { id, name, desc, channel, isRequired, validationValues, isEnable },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['updateChannelRemark'];
			return res;
		}
		throw res;
	},
};

export const updateChannelRemarkRequired = {
	load: async ({ id, isRequired }) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_CHANNEL_REMARK_REQUIRED_MUTATION,
				variables: { id, isRequired },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['updateChannelRemarkRequired'];
			return res;
		}
		throw res;
	},
};

export const updateChannelRemarkEnable = {
	load: async ({ id, isEnable }) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_CHANNEL_REMARK_ENABLE_MUTATION,
				variables: { id, isEnable },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['updateChannelRemarkEnable'];
			return res;
		}
		throw res;
	},
};

export const deleteChannelRemark = {
	load: async ({ id }) => {
		const res = await endpointFetch(
			{
				mutation: DELETE_CHANNEL_REMARK_MUTATION,
				variables: { id },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['deleteChannelRemark'];
			return res;
		}
		throw res;
	},
};

export const getChfollowerRemarks = {
	load: async ({ channelId, followerId }) => {
		const res = await endpointFetch(
			{
				query: GET_CHANNEL_FOLLOWER_REMARKS_QUERY,
				variables: { channel: channelId, follower: followerId },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['chfollowerRemarks'];
			return res;
		}
		throw res;
	},
};

export const setChFollowerRemarkFields = {
	load: async ({ channelId, followerId, remarkFields }) => {
		const res = await endpointFetch(
			{
				mutation: SET_CHANNEL_FOLLOWER_REMARK_FIELDS_MUTATION,
				variables: { channel: channelId, follower: followerId, remarkFields },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['setChFollowerRemarkFields'];
			return res;
		}

		throw res;
	},
};