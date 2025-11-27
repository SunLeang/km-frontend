import { gql } from '@apollo/client/core';

/**
 * EXTENSION
 */

export const GET_EXTENSIONS_QUERY = gql`
	query extensions($channel: String!) {
		extensions(params: { channel: $channel }) {
			id
			name
			desc
			keyname
			review {
				id
				feedback
				rate
			}
			subscription {
				id
				issuedAt
				expiredAt
				deleted
			}
		}
	}
`;

export const GET_EXTENSION_QUERY = gql`
	query extension($id: String!) {
		extension(id: $id) {
			id
			name
			desc
			keyname
		}
	}
`;
/**
 * EXTENSION SUBSCRIPTION
 */
export const CREATE_EXTENSIONSUBSCRIPTION_QUERY = gql`
	mutation createExtensionSubscription(
		$extension: String!
		$channel: String!
		$expiredAt: Float!
		$issuedAt: Float!
		$deleted: Boolean!
	) {
		createExtensionSubscription(
			params: {
				extension: $extension
				channel: $channel
				expiredAt: $expiredAt
				issuedAt: $issuedAt
				deleted: $deleted
			}
		) {
			id
			expiredAt
			issuedAt
			deleted
		}
	}
`;


export const EXTENSION_SUBSCRIPTION_QUERY = gql`
	mutation subscribeChannelExtension(
		$extension: String!
		$channel: String!
	) {
		subscribeChannelExtension(
			params: {
				extension: $extension
				channel: $channel
			}
		) {
			id
			expiredAt
			issuedAt
			deleted
		}
	}
`;

export const EXTENSION_UNSUBSCRIPTION_QUERY = gql`
	mutation unsubscribeChannelExtension(
		$extension: String!
		$channel: String!
	) {
		unsubscribeChannelExtension(
			params: {
				extension: $extension
				channel: $channel
			}
		) {
			id
			expiredAt
			issuedAt
			deleted
		}
	}
`;


export const UPDATE_EXTENSIONSUBSCRIPTION_QUERY = gql`
	mutation updateExtensionSubscription(
		$id: String!
		$extension: String!
		$channel: String!
		$expiredAt: Float!
		$issuedAt: Float!
		$deleted: Boolean!
	) {
		updateExtensionSubscription(
			params: {
				id: $id
				extension: $extension
				channel: $channel
				expiredAt: $expiredAt
				issuedAt: $issuedAt
				deleted: $deleted
			}
		) {
			id
			expiredAt
			issuedAt
			deleted
		}
	}
`;

export const REMOVE_EXTENSIONSUBSCRIPTION_QUERY = gql`
	mutation removeExtensionSubscription($id: String!, $deleted: Boolean!) {
		removeExtensionSubscription(params: { id: $id, deleted: $deleted }) {
			id
			expiredAt
			issuedAt
			deleted
		}
	}
`;

/**
 * EXTENSION REVIEWER
 */
export const GET_CHANNELREVIEW_QUERY = gql`
	query chnnelReview($id: String!) {
		channelReview(params: { id: $id }) {
			id
			feedback
			rate
		}
	}
`;

export const GET_CHANNELREVIEW_BYUSER_QUERY = gql`
	query channelReviewByUser($extensionId: String!) {
		channelReviewByUser(extensionId: $extensionId) {
			id
			feedback
			rate
			createdBy {
				id
				firstName
				lastName
			}
		}
	}
`;

export const CREATE_EXTENSION_REVIEW_QUERY = gql`
	mutation createChannelReview(
		$extension: String!
		$feedback: String!
		$rate: Float!
	) {
		createChannelReview(
			params: { extension: $extension, feedback: $feedback, rate: $rate }
		) {
			id
			feedback
			rate
			createdBy {
				id
				firstName
				lastName
			}
		}
	}
`;

export const UPDATE_EXTENSION_REVIEW_QUERY = gql`
	mutation updateChannelReview(
		$id: String!
		$feedback: String!
		$rate: Float!
	) {
		updateChannelReview(params: { id: $id, feedback: $feedback, rate: $rate }) {
			id
			feedback
			rate
		}
	}
`;
