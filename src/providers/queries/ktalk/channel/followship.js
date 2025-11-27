import { gql } from '@apollo/client/core';

export const GET_FOLLOWSHIPS_QUERY = gql`
	query followships($channel: String!, $searchText: String,$page: Float!, $limit: Float!) {
		followships(params: { channel: $channel, searchText: $searchText,page: $page, limit: $limit }) {
			followships {
				id
				createdAt
				updatedAt
				channel {
					id
					name
				}
				user {
					id
					username
					firstName
					lastName
					photo
				}
			}
			page
			total
		}
	}
`;

export const GET_FOLLOWERIDS_QUERY =  gql`
	query followerIds($channelId: String!){
		followerIds(channelId: $channelId)
	}
`;