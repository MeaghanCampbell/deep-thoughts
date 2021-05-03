// resolvers are functions we connect to each query or mutation typeDef that performs crud actions that the query or mutation can execute

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello World!'
        }
    }
}

module.exports = resolvers;