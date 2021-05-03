// resolvers are functions we connect to each query or mutation typeDef that performs crud actions that the query or mutation can execute

// import Thought & User models
const { User, Thought } = require('../models')

const resolvers = {
    // query thoughts and perform a find () on the tought model
    Query: {
        // get all thoughts or get all thoughts attached to a specific username
        // pass parent as a placeholder param - need something in the first spot so we can access username in second spot
        thoughts: async (parent, { username }) => {
            // ternary operator to see if username exists, if it does set params to an object with username key to that value set, if not return empty object
            const params = username ? { username } : {};
            // pass object with or without data into find and if there's data lookup by a username
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // get thought by id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id })
        },
        //get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
        // get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        }
    }
}

module.exports = resolvers;