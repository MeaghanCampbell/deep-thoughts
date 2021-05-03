// typeDefs define every piece of data that the cuient can expect to work with through a query or mutation

// import the gql tagged template function
const { gql } = require('apollo-server-express')

// create our typeDefs
// tagged template funciton
// query data type - instruct query to return array of Thought data
// (username:string) - update query that could receive a parameter if we wanted
// ! after string notitates that data must exist for query to be carried out
const typeDefs = gql`

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
      _id: ID
      username: String
      email: String
      friendCount: Int
      thoughts: [Thought]
      friends: [User]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought 
  }
`;

// export typeDefs
module.exports = typeDefs;