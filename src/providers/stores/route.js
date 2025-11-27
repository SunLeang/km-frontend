import { writable } from 'svelte/store';
const defaultModal = { modal: '', props: null }

const modalRoute = writable({...defaultModal});
const modalRouteStore = {
  subscribe: modalRoute.subscribe,
  reset: () => modalRoute.set({...defaultModal}),
  update: ({ modal = '', props = null }) => modalRoute.update(() => ({ modal, props }))
};

export { modalRoute, modalRouteStore };
