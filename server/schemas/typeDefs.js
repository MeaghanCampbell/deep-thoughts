// typeDefs define every piece of data that the cuient can expect to work with through a query or mutation

// import the gql tagged template function
const { gql } = require('apollo-server-express')

// create our typeDefs
// tagged template funciton
// query data type - query name is helloWorld and data type is a string
const typeDefs = gql`
type Query {
    helloWorld: String
}
`;

// export typeDefs
module.exports = typeDefs;