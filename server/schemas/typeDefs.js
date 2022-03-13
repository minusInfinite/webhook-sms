import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Service {
    _id: ID!
    serviceNumber: String!
    lastMessage: String
    lastStatus: String
    messageCount: Int
  }

  type ServiceList {
    _id: ID!
    name: String!
    key: String!
    msgTemplate: String
    serviceCount: Int
    usageCost: Float
    services: [Service]
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    serviceList: [ServiceList]
    serviceListCount: Int
    isadmin: Boolean!
  }

  type Status {
    id: ID!
    success: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    listUsers: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    makeAdmin(username: String!): Status
    addServiceList(listName: String!): Status
    saveServiceList(
      listId: ID!
      changeKey: Boolean
      template: String
      newName: String
    ): Status
    removeServiceList(listId: ID!): Status
    addService(listId: ID!, serviceNumber: String!): Status
    removeService(listId: ID!, serviceNumber: String!): Status
  }
`;

export default typeDefs;
