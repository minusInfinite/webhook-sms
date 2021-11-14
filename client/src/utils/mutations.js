import { gql } from "@apollo/client/";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        serviceCount
        key
        msgTemplate
        serviceList {
          serviceNumber
          lastMessage
          lastStatus
          messageCount
          usageCost
        }
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
        serviceCount
        key
        msgTemplate
        serviceList {
          serviceNumber
          lastMessage
          lastStatus
          messageCount
          usageCost
        }
      }
    }
  }
`;

export const SET_MSG_TEMPLATE = gql`
  mutation addMsgTemplate($template: String!) {
    addMsgTemplate(template: $template) {
      _id
      username
      email
      serviceCount
      key
      msgTemplate
    }
  }
`;

export const SAVE_SERVICE = gql`
  mutation saveService($service: ServiceInput!) {
    saveBook(service: $service) {
      _id
      username
      email
      serviceCount
      key
      msgTemplate
      serviceList {
        serviceNumber
        lastMessage
        lastStatus
        messageCount
        usageCost
      }
    }
  }
`;

export const REMOVE_SERVICE = gql`
  mutation removeService($serviceNumber: String!) {
    removeService(serviceNumber: $serviceNumber) {
      _id
      username
      email
      serviceCount
      key
      msgTemplate
      serviceList {
        serviceNumber
        lastMessage
        lastStatus
        messageCount
        usageCost
      }
    }
  }
`;
