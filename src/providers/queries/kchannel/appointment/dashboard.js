import { gql } from '@apollo/client/core';

export const GET_ALL_APPOINTMENT_BOOKING = gql `
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
`

export const GET_ALL_UPCOMING_APPOINTMENT_BOOKING = gql `
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
`

export const GET_ALL_UPCOMING_ACCEPTED_APPOINTMENT_BOOKING = gql `
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
`

export const GET_ALL_UPCOMING_PENDING_APPOINTMENT_BOOKING = gql `
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
`

export const UPDATE_APPOINTMENT_BOOKING_STATUS = gql `
mutation UpdateAppointmentBooking (
    $id: String!
    $status: String!
) { 
    updateAppointmentBooking(params: { 
      id: $id, 
      status: $status
    }) { 
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
`