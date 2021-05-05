const express = require('express');

// import ApolloServer
const { ApolloServer }= require('apollo-server-express')

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')

const path = require('path')

//import connection
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const { authMiddleware } = require('./utils/auth')

// create a new Apollo server and pass in our schema data
// provide typeDefs and resolvers so they know what our API looks like and how it resolves requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // pass context method that's set to return what you want avail to resolvers
  context: authMiddleware
})

// integrate Apollo server with the Eexpress application as middleware
// this creates a special /graphql endpoint for the express.js server that will serve as the main endpoint for accessing the entire API
server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets when in production
// check to see if node enviornment is in production
if (process.env.NODE_ENV === 'production') {
  //if yes, tell express server to server any files in react's build directory
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// wildcard get route for the server
// if we make a get request to any location on the server that doesn't have a route defined, respond with production ready React FE code
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//when we run server, we listen for connection with db.open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
