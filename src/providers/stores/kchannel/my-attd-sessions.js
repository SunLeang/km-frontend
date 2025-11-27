import { writable } from 'svelte/store';

const myAttdSessions = writable([]);
const myAttdSessionsStore = {
	subscribe: myAttdSessions.subscribe,
	reset: () => myAttdSessions.set([]),
	update: ({ attdSessions }) =>
		myAttdSessions.update((pre) => {
			return attdSessions;
		}),
	append: ({ newSessions = [] }) => {
		myAttdSessions.update((pre) => {
			return [...pre, ...newSessions];
		});
	},
	deleteById: ({ id }) => {
		myAttdSessions.update((pre) => {
			let attdSessionArr = pre;
			const index = attdSessionArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				attdSessionArr.splice(index, 1);
			}
			return attdSessionArr;
		});
	},
};

export { myAttdSessions, myAttdSessionsStore };
