// collect resolvers and typeDefs and export them

const typeDefs = require('./typeDefs')

const resolvers = require('./resolvers')

module.exports = { typeDefs, resolvers }