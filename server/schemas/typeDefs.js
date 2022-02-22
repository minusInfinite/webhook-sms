import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Service {
    _id: ID!
    serviceNumber: String!
    lastMessage: String
    lastStatus: String
    messageCount: Int
    isadmin: Boolean
  }

  type ServiceList {
    _id: ID!
    key: String
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
    makeAdmin(username: String!): User
    addServiceList: User
    saveServiceList(listId: ID!, changeKey: Boolean, template: String): User
    saveService(listId: ID!, serviceNumber: String!): User
    removeService(listId: ID!, serviceNumber: String!): User
  }
`;

export default typeDefs;
