import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import * as GQL from "$providers/queries/kchannel/user-appointment/user-appointment";
import {
  appointmentFormsStore,
  formResponsesStore,
} from "$providers/stores/kchannel/my-user-appointments";

export const getAllForms = {
  load: async () => {
    const res = await endpointFetch(
      { query: GQL.GET_ALL_FORMS_QUERY },
      APIs.KCHANNEL
    );

    console.log("DEBUG: Full Response", res);

    if (res?.success) {
      const forms =
        res.data?.appointmentGetAllFormsWithSlug ||
        res.appointmentGetAllFormsWithSlug;

      console.log("DEBUG: Extracted Forms", forms);

      if (forms) {
        appointmentFormsStore.update({ forms });
      }
      return res;
    }
    throw res;
  },
};

export const getMyForms = {
  load: async () => {
    const res = await endpointFetch(
      { query: GQL.GET_MY_FORMS_QUERY },
      APIs.KCHANNEL
    );
    if (res?.success) {
      appointmentFormsStore.update({
        forms: res.data.appointmentGetFormsByUser,
      });
      return res;
    }
    throw res;
  },
};

export const createForm = {
  load: async (param) => {
    const res = await endpointFetch(
      {
        mutation: GQL.CREATE_FORM_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
    if (res?.success) {
      appointmentFormsStore.append({
        newForm: res.data.appointmentCreateFormWithSlug,
      });
    }
    return res;
  },
};

export const updateForm = {
  load: async (param) => {
    const res = await endpointFetch(
      {
        mutation: GQL.UPDATE_FORM_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const getFormBySlug = {
  load: async (slug) => {
    const res = await endpointFetch(
      {
        query: GQL.GET_FORM_BY_SLUG_QUERY,
        variables: { slug },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const getResponses = {
  load: async (formId) => {
    const res = await endpointFetch(
      {
        query: GQL.GET_FORM_RESPONSES_QUERY,
        variables: { formId },
      },
      APIs.KCHANNEL
    );
    if (res?.success) {
      formResponsesStore.set(res.data.appointmentGetResponsesByForm);
    }
    return res;
  },
};

export const submitResponse = {
  load: async (param) => {
    return await endpointFetch(
      {
        mutation: GQL.SUBMIT_RESPONSE_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
  },
};

export const submitBySlug = {
  load: async (param) => {
    return await endpointFetch(
      {
        mutation: GQL.SUBMIT_BY_SLUG_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
  },
};

export const deleteResponse = {
  load: async (id) => {
    const res = await endpointFetch(
      {
        mutation: GQL.DELETE_RESPONSE_MUTATION,
        variables: { id },
      },
      APIs.KCHANNEL
    );
    if (res?.success) {
      formResponsesStore.remove(id);
    }
    return res;
  },
};

export const deleteForm = {
  load: async (param) => {
    const res = await endpointFetch(
      {
        mutation: GQL.DELETE_FORM_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
    if (res?.success) {
      appointmentFormsStore.deleteById({ id: param.id });
    }
    return res;
  },
};

export const getAvailableTimeSlots = {
  load: async ({ appointmentFormId, date }) => {
    const res = await endpointFetch(
      {
        query: GQL.GET_AVAILABLE_TIME_SLOTS_QUERY,
        variables: { appointmentFormId, date },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const getSchedulesByForm = {
  load: async (formId) => {
    const res = await endpointFetch(
      {
        query: GQL.GET_SCHEDULES_BY_FORM_QUERY,
        variables: { formId },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const createSchedule = {
  load: async (param) => {
    const res = await endpointFetch(
      {
        mutation: GQL.CREATE_SCHEDULE_MUTATION,
        variables: { param },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const updateSchedule = {
  load: async (params) => {
    const res = await endpointFetch(
      {
        mutation: GQL.UPDATE_SCHEDULE_MUTATION,
        variables: { params },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};

export const deleteSchedule = {
  load: async (params) => {
    const res = await endpointFetch(
      {
        mutation: GQL.DELETE_SCHEDULE_MUTATION,
        variables: { params },
      },
      APIs.KCHANNEL
    );
    return res;
  },
};
