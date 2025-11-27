import { endpointFetch } from '$providers/actions/utils';
import { APIs } from '$lib/statics/apis';
import { GET_ALL_APPOINTMENT_BOOKING,
    GET_ALL_UPCOMING_APPOINTMENT_BOOKING,
    GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING,
    GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING,
    UPDATE_APPOINTMENT_BOOKING_STATUS,
} from "$providers/queries/kchannel/appointment/dashboard"

export const getAllAppointmentBooking = {
    load: async () => {
        const res = await endpointFetch(
            {
                query: GET_ALL_APPOINTMENT_BOOKING,
                variables: { }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const getAllUpcomingAppointmentBooking = {
    load: async () => {
        const res = await endpointFetch(
            {
                query: GET_ALL_UPCOMING_APPOINTMENT_BOOKING,
                variables: { }
            },
            APIs.KCHANNEL
        );
        return res;
    },
}

export const getAllUpcomingAcceptedAppointmentBooking = {
    load: async () => {
        const res = await endpointFetch(
            {
                query: GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING,
                variables: { }
            },
            APIs.KCHANNEL
        );
        return res;
    }
}

export const getAllUpcomingPendingAppointmentBooking = {
    load: async () => {
        const res = await endpointFetch(
            {
                query: GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING,
                variables: { }
            },
            APIs.KCHANNEL
        );
        return res;
    }
}

export const updateAppointmentBookingStatus = {
    load: async ({id, status}) => {
        const res = await endpointFetch(
            {
                query: UPDATE_APPOINTMENT_BOOKING_STATUS,
                variables: {id, status}
            },
            APIs.KCHANNEL
        );
        return res;
    }
}