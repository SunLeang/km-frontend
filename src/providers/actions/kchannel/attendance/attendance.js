import { APIs } from '$lib/statics/apis';
import { myAttdMembeshipStore } from '$providers/stores/kchannel/my-attd-membership';
import { endpointFetch } from '$providers/actions/utils';
import { ATTD_BY_ATTENDANCE_SESSION_QUERY } from '$providers/queries/kchannel/attendance/att-session';
import { CREATE_ATTENDANCE_MUTATION, UPDATE_ATTENDANCE_MUTATION } from '$providers/queries/kchannel/attendance/attendance';

export const getAttdByAttdSession = {
	load: async ({ attdSessionId }) => {
		const res = await endpointFetch(
			{
				query: ATTD_BY_ATTENDANCE_SESSION_QUERY,
				variables: { attdSessionId },
			},
			APIs.KCHANNEL
		);

		if (res?.success == true) {
			res['data'] = res['data']['attByAttdSession'];
			console.log(res);
			return res;
		}
		throw res;
	},
};

export const createAttendance = {
	load: async ({
		attdSession,
		cardMembership,
		checkInAt,
		checkOutAt,
		status,
		remark,
	}) => {
		const res = await endpointFetch(
			{
				mutation: CREATE_ATTENDANCE_MUTATION,
				variables: {
					attdSession,
					cardMembership,
					checkInAt,
					checkOutAt,
					status,
					remark,
				},
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['createAttendance'];

			myAttdMembeshipStore.updateAttendaceByCardMembershipId({
				cardMembershipId: cardMembership,
				attendace: res['data'],
			});
			return res;
		}
		throw res;
	},
};

export const updateAttendance = {
	load: async ({
		id,
		attdSession,
		cardMembership,
		checkInAt,
		checkOutAt,
		status,
		remark,
	}) => {
		const res = await endpointFetch(
			{
				mutation: UPDATE_ATTENDANCE_MUTATION,
				variables: {
					id,
					attdSession,
					cardMembership,
					checkInAt,
					checkOutAt,
					status,
					remark,
				},
			},
			APIs.KCHANNEL
		);
		if (res?.success == true) {
			res['data'] = res['data']['updateAttendance'];
			myAttdMembeshipStore.updateAttendaceByCardMembershipId({
				cardMembershipId: cardMembership,
				attendace: res['data'],
			});
			console.log(res);
			return res;
		}
		throw res;
	},
};

/*
 * CARD REMARK
 */

// export const cardRemarkByCard = {
// 	load: async ({ cardId }) => {
// 		const res = await endpointFetch(
// 			{
// 				query: CARD_REMARK_BY_CARD_QUERY,
// 				variables: { cardId },
// 			},
// 			APIs.KCHANNEL
// 		);

// 		if (res?.success == true) {
// 			res['data'] = res['data']['cardRemarkByCard'];
// 			// set card remarks into store
// 			myCardRemarkStore.update({ cardRemarks: res['data'] });
// 			return res;
// 		}
// 		throw res;
// 	},
// };

// export const createCardRemark = {
// 	load: async ({ name, desc, card }) => {
// 		const res = await endpointFetch(
// 			{
// 				mutation: CREATE_CARD_REMARK_MUTATION,
// 				variables: { name, desc, card },
// 			},
// 			APIs.KCHANNEL
// 		);

// 		if (res?.success == true) {
// 			res['data'] = res['data']['createCardRemark'];
// 			return res;
// 		}
// 		throw res;
// 	},
// };

// export const updateCardRemark = {
// 	load: async ({ id, name, desc, card }) => {
// 		const res = await endpointFetch(
// 			{
// 				mutation: UPDATE_CARD_REMARK_MUTATION,
// 				variables: { id, name, desc, card },
// 			},
// 			APIs.KCHANNEL
// 		);

// 		if (res?.success == true) {
// 			res['data'] = res['data']['updateCardRemark'];
// 			return res;
// 		}
// 		throw res;
// 	},
// };
