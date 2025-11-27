import { gql } from '@apollo/client/core';

/**
 * CARDMEMBERSHIP
 */
export const CREATE_CARDMEMBERSHIP_MUTATION = gql`
	mutation createCardMembership(
		$user: String!
		$card: String!
		$expiredAt: String!
		$issuedAt: String!
		$approved: Boolean!
	) {
		createCardMembership(
			params: {
				user: $user
				card: $card
				expiredAt: $expiredAt
				issuedAt: $issuedAt
				approved: $approved
			}
		) {
			id
			expiredAt
			issuedAt
			approved
		}
	}
`;

export const CREATE_MANY_CARDMEMBERSHIPS_MUTATION = gql`
	mutation createManyCardMemberships(
		$users: [String!]!
		$card: String!
		$expiredAt: String!
		$issuedAt: String!
		$approved: Boolean!
	) {
		createManyCardMemberships(
			params: {
				users: $users
				card: $card
				expiredAt: $expiredAt
				issuedAt: $issuedAt
				approved: $approved
			}
		) {
			id
			user {
				id
			}
			card {
				id
				name
			}
			expiredAt
			issuedAt
			approved
		}
	}
`;

export const DELETE_MANY_CARDMEMBERSHIPS_MUTATION = gql`
	mutation deleteManyCardMemberships($users: [String!], $card: String!) {
		deleteManyCardMemberships(params: { users: [$user], card: $card }) {
			id
			user {
				id
			}
			card {
				id
				name
			}
		}
	}
`;

export const GET_CARDSMEMBERSHIPBYCARD_QUERY = gql`
	query cardMembershipsByCard($card: String!, $page: Float!, $filter: String, $sortBy: String) {
		cardMembershipsByCard(params: {card: $card, page: $page, filter: $filter, sortBy: $sortBy}) {
			cardMembership {
				id
				createdAt
				updatedAt
				expiredAt
				issuedAt
				issuedAt
				approved
				card {
					id
					name
					desc
					extensionKeyname
					autoApproved
					deleted
				}
				user {
					id
					firstName
					lastName
					username
					activated
					email
				}
			}
			total
		}
	}
`;

export const GET_APPROVEMEMBERSHIP_QUERY = gql`
	mutation approveMembership($user: String!, $card: String!) {
		approveMembership(params: { user: $user, card: $card }) {
			id
			createdAt
			updatedAt
			expiredAt
			issuedAt
			approved
			card {
				id
			}
			user {
				id
				firstName
				lastName
				username
				activated
				email
			}
		}
	}
`;

export const GET_REJECTMEMBERSHIP_QUERY = gql`
	mutation rejectMembership($user: String!, $card: String!) {
		rejectMembership(params: { user: $user, card: $card }) {
			id
			createdAt
			updatedAt
			expiredAt
			issuedAt
			approved
		}
	}
`;

export const UPDATE_MANY_CARD_MEMBERSHIPS = gql`
	mutation updateManyCardMemberships($users: [String!]!, $card: String!) {
		updateManyCardMemberships(params: { users: $users, card: $card }) {
			id
			createdAt
			updatedAt
			expiredAt
			issuedAt
			approved
			card {
				id
				name
				autoApproved
				deleted
				desc
			}
			user {
				id
				email
				username
				firstName
				lastName
			}
		}
	}
`;

export const MEMBERSHIP_BY_CARD_AND_ATT_SESSION_QUERY = gql`
	query membershipsByCardAndAttSession(
		$card: String!
		$attSess: String!
		$page: Float!
		$filter: String!
		$status: String!
	) {
		membershipsByCardAndAttSession(
			params: {
				card: $card
				attSess: $attSess
				page: $page
				filter: $filter
				status: $status
			}
		) {
			id
			approved
			expiredAt
			issuedAt
			card {
				id
				name
				extensionKeyname
			}
			user {
				id
				email
				username
				firstName
				lastName
				activated
			}
			attendance {
				id
				checkInAt
				checkOutAt
				remark
				status
			}
		}
	}
`;