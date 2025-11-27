import { endpointFetch } from '$providers/actions/utils';
import { APIs } from '$lib/statics/apis';
import { GET_SCHEDULE_BY_DAY, CREATE_APPOINTMENT_TIME_SLOT, DELETE_APPOINTMENT_TIME_SLOT, UPDATE_APPOINTMENT_TIME_SLOT_STATUS } from '$providers/queries/kchannel/appointment/setting'

export const getScheduleByDay = {
    load: async ({ channel, day }) => {
        const res = await endpointFetch(
            {
                query: GET_SCHEDULE_BY_DAY,
                variables: { channel, day }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const createAppointmentTimeSlot = {
    load: async ({ channel, day, start_time, end_time, is_active }) => {
        const res = await endpointFetch(
            {
                query: CREATE_APPOINTMENT_TIME_SLOT,
                variables: { channel, day, start_time, end_time, is_active }
            },
            APIs.KCHANNEL
        );
        return res;
    }
}

export const deleteAppointmentTimeSlot = {
    load: async ({ id }) => {
        const res = await endpointFetch(
            {
                query: DELETE_APPOINTMENT_TIME_SLOT,
                variables: { id }
            },
            APIs.KCHANNEL
        );
        return res;
    }
}

export const updateAppointmentTimeSlotStatus = {
    load: async ({ id, is_active }) => {
        const res = await endpointFetch(
            {
                query: UPDATE_APPOINTMENT_TIME_SLOT_STATUS,
                variables: { id, is_active }
            },
            APIs.KCHANNEL
        );
        return res;
    }
}