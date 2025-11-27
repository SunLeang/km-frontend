/**
 * Define query nad mutation
 */
import { gql } from '@apollo/client/core/core.cjs';

export const ME_QUERY = gql`
	query me {
		me {
			email
			username
			firstName
			lastName
			role
			id
			serviceRoles
		}
	}
`;

export const GET_USERS_QUERY = gql`
	query users {
		users {
			id
			email
			firstName
			lastName
			username
			email
			phone
			activated
			role
			profile
		}
	}
`;

export const SIGN_IN_MUTATION = gql`
	mutation signIn($email: String, $username: String, $password: String!) {
		signIn(param: { email: $email, username: $username, password: $password }) {
			id
			email
			username
			firstName
			lastName
			role
			phone
		}
	}
`;

export const SIGN_OUT_MUTATION = gql`
	mutation signOut {
		signOut
	}
`;

export const GET_QRCODE_INFO_QUERY = gql`
	query getQrCodeInfo {
		uniqueCode,session
	}
`;

