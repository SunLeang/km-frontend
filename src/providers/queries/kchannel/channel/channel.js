import { gql } from '@apollo/client/core';

/**
 *  CHANNEL
 */
export const GET_CHANNELS_QUERY = gql`
	query myChannels {
		myChannels {
			id
			name
			desc
			phone
			email
			website
			profile
		}
	}
`;

export const GET_CHANNEL_QUERY = gql`
	query channel($id: String!) {
		channel(id: $id) {
			id
			name
			desc
			phone
			email
			website
			profile
			bio
			type
		}
	}
`;

export const UPDATE_CHANNEL_MUTATION = gql`
	mutation updateChannel(
		$id: String!
		$name: String!
		$bio: String!
		$profile: JSON!
		$desc: String!
		$website: String!
		$phone: String!
		$email: String!
	) {
		updateChannel(
			params: {
				id: $id
				name: $name
				bio: $bio
				profile: $profile
				desc: $desc
				website: $website
				email: $email
				phone: $phone
			}
		) {
			name
		}
	}
`;

// export const GET_SEARCH_CHANNEL_QUERY = gql`
//  query searchChannels( $currentPage: Float!, $searchText: String! ){
//   searchChannels(
//      param:{
//       currentPage: $currentPage,
//       searchText: $searchText
//      }
//      )
//      {
//       channels {id, name, type, desc, phone, email, website, bio, profile},
//       channelsCount
//      }
//  }
//  `;

// export const GET_CHANNEL_QUERY = gql`
//  query channel( $id: String! ){
//     channel(
//     id: $id,
//      )
//      {
//         id, name, type, desc, phone, email, website, bio, profile
//      }
//  }
//  `;

/**
 * CHANNEL EXTENSION SUBSCRIPTION
 */
export const GET_CHANNEL_EXTENSIONS_SUBSCRIPTION = gql`
	query extensionSubscriptionByChannel($channelId: String!) {
		extensionSubscriptionByChannel(channelId: $channelId) {
			id
			expiredAt
			issuedAt
			deleted
			extension {
				id
				name
				desc
				keyname
			}
		}
	}
`;

/**
 * CHANNEL REMARK
 */

export const CHANNEL_REMARK_BY_CHANNEL_QUERY = gql`
	query channelRemarksByChannel($channelId: String!) {
		channelRemarksByChannel(channelId: $channelId) {
			id
			name
			desc
			isRequired
			isEnable
			validationValues
			channel {
				id
				name
			}
		}
	}
`;

export const CREATE_CHANNEL_REMARK_MUTATION = gql`
	mutation createChannelRemark(
		$name: String!
		$desc: String!
		$channel: String!
		$isRequired: Boolean!
		$isEnable: Boolean!
		$validationValues: [String!]!
	) {
		createChannelRemark(
			params: {
				name: $name
				desc: $desc
				channel: $channel
				isRequired: $isRequired
				isEnable: $isEnable
				validationValues: $validationValues
			}
		) {
			id
			name
			desc
			isRequired
			isEnable
			validationValues
		}
	}
`;

export const UPDATE_CHANNEL_REMARK_MUTATION = gql`
	mutation updateChannelRemark(
		$id: String!
		$name: String!
		$desc: String!
		$channel: String!
		$isRequired: Boolean!
		$isEnable: Boolean!
		$validationValues: [String!]!
	) {
		updateChannelRemark(
			params: {
				id: $id
				name: $name
				desc: $desc
				channel: $channel
				isRequired: $isRequired
				isEnable: $isEnable
				validationValues: $validationValues
			}
		) {
			id
			name
			desc
			isRequired
			validationValues
		}
	}
`;

export const UPDATE_CHANNEL_REMARK_REQUIRED_MUTATION = gql`
	mutation updateChannelRemarkRequired($id: String!, $isRequired: Boolean!) {
		updateChannelRemarkRequired(params: { id: $id, isRequired: $isRequired }) {
			id
			isRequired
		}
	}
`;

export const UPDATE_CHANNEL_REMARK_ENABLE_MUTATION = gql`
	mutation updateChannelRemarkEnable($id: String!, $isEnable: Boolean!) {
		updateChannelRemarkEnable(params: { id: $id, isEnable: $isEnable }) {
			id
			isEnable
		}
	}
`;

export const DELETE_CHANNEL_REMARK_MUTATION = gql`
	mutation deleteChannelRemark($id: String!) {
		deleteChannelRemark(params: { id: $id }) {
			id
			name
			desc
		}
	}
`;

export const GET_CHANNEL_FOLLOWER_REMARKS_QUERY = gql`
	query chfollowerRemarks($follower: String!, $channel: String!) {
		chfollowerRemarks(params: { follower: $follower, channel: $channel }) {
			id
			name
			desc
			isRequired
			isEnable
			validationValues
			followerRemarkField{
					id
					value
			}
		}
	}
`;


export const SET_CHANNEL_FOLLOWER_REMARK_FIELDS_MUTATION = gql`
	mutation setChFollowerRemarkFields($follower: String!, $channel: String!, $remarkFields: [ChFollowerRemarkFieldInput!]!) {
		setChFollowerRemarkFields(params: { follower: $follower, channel: $channel, remarkFields: $remarkFields }) {
			id
			name
			desc
			isRequired
			isEnable
			validationValues
			followerRemarkField{
					id
					value
			}
		}
	}
`;
