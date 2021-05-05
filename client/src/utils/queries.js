// utils stores all code that isn't necessarily React based
// this file stores graphql query requests

import gql from 'graphql-tag';

// saved this query as query thoughts to query thoughts by username and exported it so we can use it whereever we want in the app
export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
query thought($id: ID!) {
  thought(_id: $id) {
    _id
    thoughtText
    createdAt
    username
    reactionCount
    reactions {
      _id
      createdAt
      username
      reactionBody
    }
  }
}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
      }
    }
  }
`;