import { writable } from 'svelte/store';

const myCards = writable([]);
const myCardsStore = {
	subscrible: myCards.subscribe,
	reset: () => myCards.set([]),
	update: ({ cards }) =>
		myCards.update((pre) => {
			return cards;
		}),
	updateById: ({ id, card }) => {
		myCards.update((pre) => {
			let cardArr = pre;
			const index = cardArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				cardArr[index] = card;
			}
			return cardArr;
		});
	},
	deleteById: ({ id }) => {
		myCards.update((pre) => {
			let cardArr = pre;
			const index = cardArr.findIndex((ele) => ele.id == id);
			if (index >= 0) {
				cardArr.splice(index, 1);
			}
			return cardArr;
		});
	},
};

export { myCards, myCardsStore };
