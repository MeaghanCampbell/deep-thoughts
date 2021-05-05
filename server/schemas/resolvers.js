// resolvers are functions we connect to each query or mutation typeDef that performs crud actions that the query or mutation can execute

// import Thought & User models
const { User, Thought } = require('../models')

// import built in from graphql to handle errors
const { AuthenticationError } = require('apollo-server-express')

// import from auth
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');

const resolvers = {
    // query thoughts and perform a find () on the tought model
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');
      
            return userData;

            }

            throw new AuthenticationError('Not logged in')
        },

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
    },
    Mutation: {
        // mongoose creates a new user with whatever is passed in as args
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user)
            return { token, user }
        },
        addThought: async (parent, args, context) => {
            // if user is logged in - check for existance of context.user
            if (context.user) {
              const thought = await Thought.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { thoughts: thought._id } },
                // tells mongo to return updated object not original
                { new: true }
              );
          
              return thought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                // reactions are stored as arrays on the thought model so use $push operator
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedThought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          },
          addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                // look for incoming friendId and add that to the current user's friends array
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
          
    }
}

module.exports = resolvers;