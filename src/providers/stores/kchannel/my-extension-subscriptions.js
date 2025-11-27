import { writable } from 'svelte/store';

const myExtensionSubscriptions = writable([]);
const myExtensionSubscriptionsStore = {
	subscribe: myExtensionSubscriptions.subscribe,
	reset: () => myExtensionSubscriptions.set([]),
	update: ({ extensions }) => myExtensionSubscriptions.update((pre) => {
		return extensions;
	}),
};

export { myExtensionSubscriptions, myExtensionSubscriptionsStore };
