import { gql } from "@apollo/client/core";

export const GET_ALL_FORMS_QUERY = gql`
  query GetAllForms {
    appointmentGetAllFormsWithSlug {
      id
      title
      description
      slug
      createdAt
      channel {
        id
        name
        kind
        bio
        desc
        phone
        email
        website
        profile
        cover
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_MY_FORMS_QUERY = gql`
  query GetMyForms {
    appointmentGetFormsByUser {
      id
      title
      slug
      createdAt
      channel {
        name
      }
    }
  }
`;

export const GET_FORM_BY_SLUG_QUERY = gql`
  query GetFormBySlug($slug: String!) {
    appointmentGetFormBySlug(param: { slug: $slug }) {
      id
      title
      description
      published
      slug
      questions {
        _id
        type
        label
        description
        required
        options
        scaleMin
        scaleMax
      }
      channel {
        id
        name
      }
    }
  }
`;

export const GET_FORM_BY_ID_QUERY = gql`
  query GetFormById($id: String!) {
    appointmentGetFormWithSlugById(id: $id) {
      id
      title
      questions {
        _id
        type
        label
        options
      }
      channel {
        id
        name
      }
    }
  }
`;

export const GET_FORM_RESPONSES_QUERY = gql`
  query GetFormResponses($formId: String!) {
    appointmentGetResponsesByForm(param: { formId: $formId }) {
      id
      createdAt
      submittedBy {
        id
        username
        firstName
        lastName
      }
      answers {
        questionId
        value
      }
    }
  }
`;

export const CREATE_FORM_MUTATION = gql`
  mutation CreateForm($param: AppointmentCreateFormInput!) {
    appointmentCreateFormWithSlug(param: $param) {
      id
      title
      slug
      channel {
        id
        name
      }
    }
  }
`;

export const UPDATE_FORM_MUTATION = gql`
  mutation UpdateForm($param: AppointmentUpdateFormInput!) {
    appointmentUpdateFormWithSlug(param: $param) {
      id
      title
      slug
      updatedAt
      questions {
        _id
        label
        type
        required
      }
    }
  }
`;

export const SUBMIT_RESPONSE_MUTATION = gql`
  mutation SubmitFormResponse($param: AppointmentSubmitResponseInput!) {
    appointmentSubmitResponse(param: $param) {
      id
      createdAt
      submittedBy {
        username
      }
      answers {
        questionId
        value
      }
    }
  }
`;

export const SUBMIT_BY_SLUG_MUTATION = gql`
  mutation SubmitBySlug($param: AppointmentSubmitResponseBySlugInput!) {
    appointmentSubmitResponseBySlug(param: $param) {
      id
      createdAt
      formId {
        title
        slug
      }
    }
  }
`;

export const DELETE_RESPONSE_MUTATION = gql`
  mutation DeleteResponse($id: String!) {
    appointmentDeleteResponse(param: { id: $id }) {
      id
    }
  }
`;

export const DELETE_FORM_MUTATION = gql`
  mutation DeleteForm($param: AppointmentDeleteFormInput!) {
    appointmentDeleteFormWithSlug(param: $param) {
      id
      slug
    }
  }
`;

export const GET_AVAILABLE_TIME_SLOTS_QUERY = gql`
  query GetAvailableTimeSlots($appointmentFormId: String!, $date: Float!) {
    getAvailableTimeSlots(
      param: { appointmentFormId: $appointmentFormId, date: $date }
    )
  }
`;

export const GET_SCHEDULES_BY_FORM_QUERY = gql`
  query GetSchedulesByForm($formId: String!) {
    getAppointmentSchedulesByForm(formId: $formId) {
      id
      day
      start_time
      end_time
      is_active
      appointment_form {
        id
      }
    }
  }
`;

export const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateSchedule($param: CreateAppointmentScheduleInput!) {
    createAppointmentSchedule(param: $param) {
      id
      day
      start_time
      end_time
      is_active
    }
  }
`;

export const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateSchedule($params: UpdateAppointmentScheduleInput!) {
    updateAppointmentSchedule(params: $params) {
      id
      day
      start_time
      end_time
      is_active
    }
  }
`;

export const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteSchedule($params: DeleteAppointmentScheduleInput!) {
    deleteAppointmentSchedule(params: $params) {
      id
    }
  }
`;
