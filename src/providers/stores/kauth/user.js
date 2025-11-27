/**
 * Create stores in svelte
 */

import { writable } from 'svelte/store';

const user = writable({});
const userStore = {
  subscribe: user.subscribe,
  reset: (userData) => user.set(userData)
};

const users = writable([]);
const usersStore = {
  subscribe: users.subscribe,
  reset: (usersData) => users.set(usersData)
};

export { user, userStore, users, usersStore };
