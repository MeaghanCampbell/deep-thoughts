import React from 'react';
// hook from Apollos react hooks library
// this allows us to make requests to the gql server we connected to using <ApolloProvider> component in App.js
import { useQuery } from '@apollo/react-hooks';
// import from utils folder so we can query thoughts on the homepage
import { QUERY_THOUGHTS } from '../utils/queries';

import ThoughtList from '../components/ThoughtList'


const Home = () => {
  // use useQuery hook to make query request
  // When we load home component in app, we'll execute the query for the thought data
  // loading component is provided becuase funciton is async
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // access data that comes from query's response and access thoughts
  // optional chaining
    // negates the need to check if an object exists before accessing its properties
    // this is saying if data exists store it in thoughts and if not give it an empty array
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
