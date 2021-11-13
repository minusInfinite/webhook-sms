import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      serviceCount
      key
      msgTemplate
      serviceList {
        serviceNumber
        lastMessage
        messageCount
        usageCost
      }
    }
  }
`;
