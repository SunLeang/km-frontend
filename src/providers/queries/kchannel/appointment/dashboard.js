import { gql } from "@apollo/client/core";

export const GET_ALL_APPOINTMENT_BOOKING = gql`
  query {
    getAllAppointmentBooking {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const GET_ALL_UPCOMING_APPOINTMENT_BOOKING = gql`
  query {
    getAllUpcomingAppointmentBooking {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING = gql`
  query {
    getAllUpcomingAcceptedAppointmentBooking {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING = gql`
  query {
    getAllUpcomingPendingAppointmentBooking {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const UPDATE_APPOINTMENT_BOOKING_STATUS = gql`
  mutation UpdateAppointmentBooking($id: String!, $status: String!) {
    updateAppointmentBooking(params: { id: $id, status: $status }) {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const APPROVE_APPOINTMENT_BOOKING = gql`
  mutation ApproveAppointmentBooking($id: String!) {
    approveAppointmentBooking(param: { id: $id }) {
      id
      user {
        id
        username
        firstName
        lastName
      }
      appointment_form {
        id
        name
        description
      }
      date
      time_start
      status
    }
  }
`;

export const REJECT_APPOINTMENT_BOOKING = gql`
  mutation RejectAppointmentBooking($id: String!, $reason: String) {
    rejectAppointmentBooking(param: { id: $id, reason: $reason }) {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const GET_AVAILABLE_TIME_SLOTS = gql`
  query GetAvailableTimeSlots($appointmentFormId: String!, $date: Float!) {
    getAvailableTimeSlots(
      param: { appointmentFormId: $appointmentFormId, date: $date }
    )
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $appointment_form: String!
    $date: Float!
    $time_start: Float!
  ) {
    CreateAppointment(
      param: {
        appointment_form: $appointment_form
        date: $date
        time_start: $time_start
      }
    ) {
      id
      user {
        id
        username
        firstName
        lastName
      }
      date
      time_start
      status
    }
  }
`;

export const GET_ANSWERS_BY_BOOKING_ID = gql`
  query GetAnswersByBookingId($bookingId: String!) {
    getAnswersByBookingId(bookingId: $bookingId) {
      id
      type
      answer
      appointment_question {
        id
        question
        type
        is_required
        answer
      }
    }
  }
`;
