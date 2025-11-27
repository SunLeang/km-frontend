import { writable } from 'svelte/store';

const myCardMemberships = writable([]);
const myCardMembershipStore = {
	subscrible: myCardMemberships.subscribe,
	reset: () => myCardMemberships.set([]),
	update: ({ memberships }) =>
		myCardMemberships.update((pre) => {
			return memberships;
		}),

	append: ({ newCardMemberships = [] }) => {
		myCardMemberships.update((pre) => {
			return [...pre, ...newCardMemberships];
		});
	},
	updateById: ({ id, membership }) =>
		myCardMemberships.update((preData) => {
			let membershipArr = preData['cardMembership'];
			const index = membershipArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				console.log('indexL, ', index);
				membershipArr[index] = membership;
			}

			preData['cardMembership'] = membershipArr;

			return preData;
		}),

	deleteById: ({ id }) => {
		myCardMemberships.update((preData) => {
			let membershipArr = preData['cardMembership'];
			const index = membershipArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				membershipArr.splice(index, 1);
			}
			preData['cardMembership'] = membershipArr;
			return preData;
		});
	},
};

export { myCardMembershipStore, myCardMemberships };
