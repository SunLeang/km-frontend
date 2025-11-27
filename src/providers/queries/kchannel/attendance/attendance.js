import { gql } from '@apollo/client/core';

export const CREATE_ATTENDANCE_MUTATION = gql`
	mutation createAttendance(
		$attdSession: String!
		$cardMembership: String!
		$checkInAt: Float!
		$checkOutAt: Float!
		$status: String!
		$remark: String
	) {
		createAttendance(
			params: {
				attdSession: $attdSession
				cardMembership: $cardMembership
				checkInAt: $checkInAt
				checkOutAt: $checkOutAt
				status: $status
				remark: $remark
			}
		) {
			id
			status
			checkInAt
			checkOutAt
			remark
		}
	}
`;

export const UPDATE_ATTENDANCE_MUTATION = gql`
	mutation updateAttendance(
		$id: String!
		$attdSession: String!
		$cardMembership: String!
		$checkInAt: Float!
		$checkOutAt: Float!
		$status: String!
		$remark: String
	) {
		updateAttendance(
			params: {
				id: $id
				attdSession: $attdSession
				cardMembership: $cardMembership
				checkInAt: $checkInAt
				checkOutAt: $checkOutAt
				status: $status
				remark: $remark
			}
		) {
			id
			status
			remark
			checkInAt
			checkOutAt
		}
	}
`;

/**
 * CARD REMARK
 */

// export const CARD_REMARK_BY_CARD_QUERY = gql`
// 	query cardRemarkByCard($cardId: String!) {
// 		cardRemarkByCard(cardId: $cardId) {
// 			id
// 			name
// 			desc
// 			card {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

// export const CREATE_CARD_REMARK_MUTATION = gql`
// 	mutation createCardRemark($name: String!, $desc: String!, $card: String!){
// 		createCardRemark(params: {name: $name, desc: $desc, card: $card}){
// 			id
// 			name
// 			desc
// 		}
// 	}
// `;

// export const UPDATE_CARD_REMARK_MUTATION = gql`
// 	mutation updateCardRemark($id: String!, $name: String!, $desc: String!, $card: String!){
// 		updateCardRemark(params: {id: $id, name: $name, desc: $desc, card: $card}){
// 			id
// 			name
// 			desc
// 		}
// 	}
// `;
