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
  mutation CreateForm($param: CreateFormInput!) {
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
  mutation UpdateForm($param: UpdateFormInput!) {
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
  mutation SubmitFormResponse($param: SubmitResponseInput!) {
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
  mutation SubmitBySlug($param: SubmitResponseBySlugInput!) {
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
