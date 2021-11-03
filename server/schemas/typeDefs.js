import { gql } from "apollo-server-core";

const typeDefs = gql`
    type Greeting {
        _id: ID
        message: String
    }

    type Query {
        hello: Greeting
    }
`

export default typeDefs