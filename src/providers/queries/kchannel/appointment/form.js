import { gql } from '@apollo/client/core';

export const CREATE_FORM_QUESTION = gql`
  mutation CreateAppointmentQuestion(
    $appointmentForm: String!
    $question: String!
    $type: String!
    $is_required: Boolean!
    $answer: JSON!
    $index: Float!
  ) {
    createAppointmentQuestion(param: {
        appointmentForm: $appointmentForm
        question: $question
        type: $type
        is_required: $is_required
        answer: $answer
        index: $index
    }) {
      id
      question
      type
      is_required
      answer
    }
  }
`;

export const GET_FORM_QUESTIONS = gql`
  query FindAppoitmentQuestionByAppointmentFormId (
    $id: String!
  ) {
    findAppoitmentQuestionByAppointmentFormId(id: $id) {
      id
      question
      type
      answer
      is_required
      index
    }
  }
`;

export const GET_FORM_BY_CHANNEL_ID = gql`
  query GetAppointmentFormsByChannel($channel: String!) {
    getAppointmentFormsByChannel(params:{channel: $channel}) {
      id
      name
    }
  }
`;

export const DELETE_FORM_QUESTION = gql`
  mutation DeleteAppointmentQuestion($id: String!) {
    deleteAppointmentQuestion(params: {id: $id}){
      id
      question
      type
      is_required
      answer
    }
  }
`;

export const UPDATE_FORM_QUESTION = gql`
  mutation UpdateAppointmentQuestion(
    $id: String!
    $appointmentForm: String
    $question: String
    $type: String
    $is_required: Boolean
    $answer: JSON
    $index: Float
  ) {
    updateAppointmentQuestion(params: {
        id: $id
        appointmentForm: $appointmentForm
        question: $question
        type: $type
        is_required: $is_required
        answer: $answer
        index: $index
    }) {
      id
      question
      type
      is_required
      answer
    }
  }
`