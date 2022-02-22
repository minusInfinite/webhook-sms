import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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
