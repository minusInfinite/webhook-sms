import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        serviceListCount
        isadmin
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        serviceListCount
        isadmin
      }
    }
  }
`;

export const ADD_SERVICE_LIST = gql`
  mutation addServiceList($listName: String!) {
    addServiceList(listName: $listName) {
      id
      success
    }
  }
`;

export const SAVE_SERVICE_LIST = gql`
  mutation saveServiceList(
    $listId: ID!
    $changeKey: Boolean
    $template: String
    $newName: String
  ) {
    saveServiceList(
      listId: $listId
      changeKey: $changeKey
      template: $template
      newName: $newName
    ) {
      id
      success
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation addService($listId: ID!, $serviceNumber: String!) {
    addService(listId: $listId, serviceNumber: $serviceNumber) {
      id
      success
    }
  }
`;

export const REMOVE_SERVICE = gql`
  mutation removeService($listId: ID!, $serviceNumber: String!) {
    removeService(listId: $listId, serviceNumber: $serviceNumber) {
      id
      success
    }
  }
`;

export const REMOVE_SERVICE_LIST = gql`
  mutation removeServiceList($listId: ID!) {
    removeServiceList(listId: $listId) {
      id
      success
    }
  }
`;
