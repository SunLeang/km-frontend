import { writable } from 'svelte/store';

const myAttdMemberships = writable([]);
const myAttdMembeshipStore = {
	subscribe: myAttdMemberships.subscribe,
	reset: () => myAttdMemberships.set([]),
	update: ({ attdMemberships }) => {
		myAttdMemberships.update((pre) => {
			return attdMemberships;
		});
	},
	updateAttendaceByCardMembershipId: ({ cardMembershipId, attendace }) => {
		myAttdMemberships.update((preData) => {
			let attMembershipArr = preData;
			const index = attMembershipArr.findIndex(
				(ele) => ele.id == cardMembershipId
			);
			if (index >= 0) {
				attMembershipArr[index]['attendance'] = attendace;
			}
			return attMembershipArr;
		});
	},
	append: ({ newAttMembership = [] }) => {
		myAttdMemberships.update((pre) => {
			return [...pre, ...newAttMembership];
		});
	},
};

export { myAttdMemberships, myAttdMembeshipStore };
