
const resolvers = {
    Query: {
        hello: async (parent, args, context) => {
            return "Hello World"
        }
    }
}

export default resolvers