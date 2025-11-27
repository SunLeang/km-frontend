import { gql } from '@apollo/client/core';

export const GET_SCHEDULE_BY_DAY = gql`
query GetAppointmentSchedulesByChannelAndDay(
    $channel: String!,
    $day: Float!
) {
    getAppointmentSchedulesByChannelAndDay(params: {
      channel: $channel,
      day: $day
    }) {
      id
      day
      start_time
      end_time
      is_active
    }
  }
`

export const CREATE_APPOINTMENT_TIME_SLOT = gql`
mutation CreateAppointmentSchedule(
    $channel: String!,
    $day: Float!,
    $start_time: Float!,
    $end_time: Float!,
    $is_active: Boolean!
) {
  createAppointmentSchedule(param: {
    channel: $channel,
    day: $day,
    start_time: $start_time,
    end_time: $end_time,
    is_active: $is_active
  }){
    id
    day
    start_time
    end_time
    is_active
  }
}
`

export const DELETE_APPOINTMENT_TIME_SLOT = gql`
mutation DeleteAppointmentSchedule (
    $id: String!
) {
  deleteAppointmentSchedule(params: {
    id: $id
  }) {
    id
  }
}
`

export const UPDATE_APPOINTMENT_TIME_SLOT_STATUS = gql`
mutation UpdateAppointmentSchedule(
    $id: String!,
    $is_active: Boolean!
) {
  updateAppointmentSchedule(params: {
    id: $id,
    is_active: $is_active
  }){
    id
    day
    start_time
    end_time
    is_active
  }
}
`