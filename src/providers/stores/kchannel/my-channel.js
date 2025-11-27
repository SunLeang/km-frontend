import { writable } from 'svelte/store';

const mychannels = writable([]);
const mychannelsStore = {
	subscrible: mychannels.subscribe,
	reset: () => mychannels.set([]),
	update: ({ channels }) =>
		mychannels.update((pre) => {
			return channels;
		}),
	updateById: ({ id }) => {
		mychannels.update((pre) => {
			let channelArr = pre;
			const index = channelArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				channelArr[index] = card;
			}
			return channelArr;
		});
	},
	deleteById: ({ id }) => {
		mychannels.update((pre) => {
			let channelArr = pre;
			const index = channelArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				channelArr.splice(index, 1);
			}
			return channelArr;
		});
	},
};

export { mychannels, mychannelsStore };
