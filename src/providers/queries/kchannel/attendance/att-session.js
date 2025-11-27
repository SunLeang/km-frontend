import { gql } from '@apollo/client/core';

export const GET_ATTDSESSIONSBYCARD_QUERY = gql`
	query attdSessionsByCard($card: String!, $page: Float!) {
		attdSessionsByCard(param: { card: $card, page: $page }) {
			id
			name
			startAt
			endAt
			lateAt
			createdAt
			updatedAt
			hasLatetime
			card {
				id
				name
			}
			channel {
				id
				name
			}
		}
	}
`;

export const CREATE_ATTDSESSION_QUERY = gql`
	mutation createAttdSession(
		$name: String!
		$startAt: Float!
		$endAt: Float!
		$lateAt: Float!
		$hasLatetime: Boolean!
		$channel: String!
		$card: String!
	) {
		createAttdSession(
			params: {
				name: $name
				startAt: $startAt
				endAt: $endAt
				lateAt: $lateAt
				hasLatetime: $hasLatetime
				channel: $channel
				card: $card
			}
		) {
			id
			name
			startAt
			endAt
			hasLatetime
			lateAt
		}
	}
`;

export const UPDATE_ATTDSESSION_QUERY = gql`
	mutation createAttdSession(
		$id: String!
		$name: String!
		$startAt: Float!
		$endAt: Float!
		$lateAt: Float!
		$hasLatetime: Boolean!
		$channel: String!
		$card: String!
	) {
		createAttdSession(
			params: {
				id: $id
				name: $name
				startAt: $startAt
				endAt: $endAt
				lateAt: $lateAt
				hasLatetime: $hasLatetime
				channel: $channel
				card: $card
			}
		) {
			id
			name
			startAt
			endAt
			lateAt
			hasLatetime
		}
	}
`;

export const DELETE_ATTDSESSION_QUERY = gql`
	mutation deleteAttdSession($id: String!) {
		deleteAttdSession(params: { id: $id }) {
			id
			name
		}
	}
`;

export const ATTD_BY_ATTENDANCE_SESSION_QUERY = gql`
	query attByAttdSession($attdSessionId: String!) {
		attByAttdSession(params: { attdSessionId: $attdSessionId }) {
			id
			status
			checkInAt
			checkOutAt
			remark
			attdSession {
				id
				name
				startAt
				endAt
				lateAt
			}
			cardMembership {
				id
				approved
				expiredAt
				issuedAt
				user {
					id
					username
					firstName
					lastName
					email
				}
			}
		}
	}
`;
