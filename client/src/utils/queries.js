import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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

export const LIST_ALL = gql`
  query listUser {
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
`;
