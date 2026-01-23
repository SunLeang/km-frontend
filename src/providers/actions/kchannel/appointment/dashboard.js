import { endpointFetch } from "$providers/actions/utils";
import { APIs } from "$lib/statics/apis";
import {
  GET_ALL_APPOINTMENT_BOOKING,
  GET_ALL_UPCOMING_APPOINTMENT_BOOKING,
  GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING,
  GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING,
  UPDATE_APPOINTMENT_BOOKING_STATUS,
  APPROVE_APPOINTMENT_BOOKING,
  REJECT_APPOINTMENT_BOOKING,
  GET_AVAILABLE_TIME_SLOTS,
  CREATE_APPOINTMENT,
  GET_ANSWERS_BY_BOOKING_ID,
} from "$providers/queries/kchannel/appointment/dashboard";

export const getAllAppointmentBooking = {
  load: async () => {
    const res = await endpointFetch(
      {
        query: GET_ALL_APPOINTMENT_BOOKING,
        variables: {},
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const getAllUpcomingAppointmentBooking = {
  load: async () => {
    const res = await endpointFetch(
      {
        query: GET_ALL_UPCOMING_APPOINTMENT_BOOKING,
        variables: {},
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const getAllUpcomingAcceptedAppointmentBooking = {
  load: async () => {
    const res = await endpointFetch(
      {
        query: GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING,
        variables: {},
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const getAllUpcomingPendingAppointmentBooking = {
  load: async () => {
    const res = await endpointFetch(
      {
        query: GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING,
        variables: {},
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const updateAppointmentBookingStatus = {
  load: async ({ id, status }) => {
    const res = await endpointFetch(
      {
        query: UPDATE_APPOINTMENT_BOOKING_STATUS,
        variables: { id, status },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const approveAppointmentBooking = {
  load: async (id) => {
    const res = await endpointFetch(
      {
        mutation: APPROVE_APPOINTMENT_BOOKING,
        variables: { id },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const rejectAppointmentBooking = {
  load: async ({ id, reason }) => {
    const res = await endpointFetch(
      {
        mutation: REJECT_APPOINTMENT_BOOKING,
        variables: { id, reason },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const getAvailableTimeSlots = {
  load: async ({ appointmentFormId, date }) => {
    const res = await endpointFetch(
      {
        query: GET_AVAILABLE_TIME_SLOTS,
        variables: { appointmentFormId, date },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const createAppointment = {
  load: async ({ appointment_form, date, time_start }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_APPOINTMENT,
        variables: { appointment_form, date, time_start },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};

export const getAnswersByBookingId = {
  load: async (bookingId) => {
    const res = await endpointFetch(
      {
        query: GET_ANSWERS_BY_BOOKING_ID,
        variables: { bookingId },
      },
      APIs.KCHANNEL,
    );
    return res;
  },
};
