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
      _id
      username
      email
      serviceListCount
      serviceList {
        _id
        name
        key
        msgTemplate
        serviceCount
        usageCost
      }
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
      _id
      username
      email
      serviceListCount
      isadmin
      serviceList {
        _id
        name
        key
        msgTemplate
      }
    }
  }
`;

export const SAVE_SERVICE = gql`
  mutation saveService($listId: ID!, $serviceNumber: String!) {
    saveService(listId: $listId, serviceNumber: $serviceNumber) {
      _id
      username
      email
      serviceListCount
      serviceList {
        _id
        name
        key
        msgTemplate
        serviceCount
        usageCost
        services {
          _id
          serviceNumber
          lastMessage
          lastStatus
          messageCount
        }
      }
    }
  }
`;

export const REMOVE_SERVICE = gql`
  mutation removeService($listId: ID!, $serviceNumber: String!) {
    removeService(listId: $listId, serviceNumber: $serviceNumber) {
      _id
      username
      email
      serviceListCount
      serviceList {
        _id
        name
        key
        msgTemplate
        serviceCount
        usageCost
        services {
          _id
          serviceNumber
          lastMessage
          lastStatus
          messageCount
        }
      }
    }
  }
`;

export const REMOVE_SERVICE_LIST = gql`
  mutation removeServiceList($listId: ID!) {
    removeServiceList(listId: $listId) {
      _id
      username
      email
      serviceListCount
      serviceList {
        _id
        name
        key
        msgTemplate
        serviceCount
        usageCost
        services {
          _id
          serviceNumber
          lastMessage
          lastStatus
          messageCount
        }
      }
    }
  }
`;
