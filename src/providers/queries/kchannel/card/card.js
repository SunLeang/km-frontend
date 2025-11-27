import { gql } from '@apollo/client/core';

/**
 * CARD
 */
export const GET_CARD_QUERY = gql`
	query card($id: String!) {
		card(params: { id: $id }) {
			id
			name
			desc
			createdAt
			updatedAt
			autoApproved
			extensionKeyname
			memberTotal
			deleted
		}
	}
`;

export const GET_CARDS_BY_CHANNEL_AND_EXTENSION_QUERY = gql`
	query cardsByChannelAndExtension(
		$channelId: String!
		$extensionKeyname: String!
	) {
		cardsByChannelAndExtension(
			params: { channelId: $channelId, extensionKeyname: $extensionKeyname }
		) {
			id
			name
			desc
			createdAt
			updatedAt
			autoApproved
			extensionKeyname
			memberTotal
			deleted
		}
	}
`;

export const CREATE_CARD_QUERY = gql`
	mutation createCard(
		$name: String!
		$channel: String!
		$desc: String!
		$extensionKeyname: String!
		$autoApproved: Boolean!
		$deleted: Boolean!
	) {
		createCard(
			params: {
				name: $name
				channel: $channel
				desc: $desc
				extensionKeyname: $extensionKeyname
				autoApproved: $autoApproved
				deleted: $deleted
			}
		) {
			id
			name
			desc
			extensionKeyname
			autoApproved
			memberTotal
			deleted
		}
	}
`;

export const UPDATE_CARD_ATTD_QUERY = gql`
	mutation updateCard(
		$id: String!
		$name: String!
		$channel: String!
		$desc: String!
		$extensionKeyname: String!
		$autoApproved: Boolean!
		$deleted: Boolean!
	) {
		updateCard(
			params: {
				id: $id
				name: $name
				channel: $channel
				desc: $desc
				extensionKeyname: $extensionKeyname
				autoApproved: $autoApproved
				deleted: $deleted
			}
		) {
			id
			name
			desc
			extensionKeyname
			autoApproved
			deleted
			createdAt
			updatedAt
			memberTotal
		}
	}
`;

export const UPDATE_CARD_ATTD_STATUS_QUERY = gql`
	mutation updateCardStatus($id: String!, $deleted: Boolean!) {
		updateCardStatus(params: { id: $id, deleted: $deleted }) {
			id
			name
			desc
			extensionKeyname
			autoApproved
			deleted
			createdAt
			updatedAt
		}
	}
`;
