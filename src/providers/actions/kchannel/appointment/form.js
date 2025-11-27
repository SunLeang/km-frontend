import { endpointFetch } from '$providers/actions/utils';
import { APIs } from '$lib/statics/apis';
import { GET_FORM_QUESTIONS, GET_FORM_BY_CHANNEL_ID, CREATE_FORM_QUESTION, DELETE_FORM_QUESTION, UPDATE_FORM_QUESTION } from "$providers/queries/kchannel/appointment/form"

export const createFormQuestion = {
    load: async ({ appointmentForm, question, type, answer, is_required, index }) => {
        const res = await endpointFetch(
            {
                query: CREATE_FORM_QUESTION,
                variables: { appointmentForm, question, type, answer, is_required, index }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const getAllAppointmentQuestions = {
    load: async ({ id }) => {
        console.log(id);
        const res = await endpointFetch(
            {
                query: GET_FORM_QUESTIONS,
                variables: { id }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const getFormByChannelId = {
    load: async ({ channel}) => {
        const res = await endpointFetch(
            {
                query: GET_FORM_BY_CHANNEL_ID,
                variables: { channel }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const deleteAppointmentQuestion = {
    load: async ({ id }) => {
        const res = await endpointFetch(
            {
                query: DELETE_FORM_QUESTION,
                variables: { id },
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const updateAppointmentQuestion = {
    load: async ({ id, question, type, is_required, answer, index }) => {
        const res = await endpointFetch(
            {
                query: UPDATE_FORM_QUESTION,
                variables: { id, question, type, is_required, answer, index },
            },
            APIs.KCHANNEL
        );
        console.log(res);
        return res;
    },
}