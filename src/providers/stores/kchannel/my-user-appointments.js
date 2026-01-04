import { writable } from "svelte/store";

const appointmentForms = writable([]);
const appointmentFormsStore = {
  subscribe: appointmentForms.subscribe,
  reset: () => appointmentForms.set([]),
  update: ({ forms }) =>
    appointmentForms.update(() => {
      return forms;
    }),
  append: ({ newForm }) => {
    appointmentForms.update((pre) => [newForm, ...pre]);
  },
  deleteById: ({ id }) => {
    appointmentForms.update((pre) => pre.filter((f) => f.id !== id));
  },
};

const formResponses = writable([]);
const formResponsesStore = {
  subscribe: formResponses.subscribe,
  set: (data) => formResponses.set(data),
  remove: (id) => formResponses.update((pre) => pre.filter((r) => r.id !== id)),
};

export { appointmentForms, appointmentFormsStore, formResponsesStore };
