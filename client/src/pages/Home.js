import React from 'react';
// hook from Apollos react hooks library
// this allows us to make requests to the gql server we connected to using <ApolloProvider> component in App.js
import { useQuery } from '@apollo/react-hooks';
// import from utils folder so we can query thoughts on the homepage
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import ThoughtList from '../components/ThoughtList'
import FriendsList from '../components/FriendsList';
import ThoughtForm from '../components/ThoughtForm';


const Home = () => {
  // use useQuery hook to make query request
  // When we load home component in app, we'll execute the query for the thought data
  // loading component is provided becuase funciton is async
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // for displaying friends list
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // access data that comes from query's response and access thoughts
  // optional chaining
    // negates the need to check if an object exists before accessing its properties
    // this is saying if data exists store it in thoughts and if not give it an empty array
  const thoughts = data?.thoughts || [];

  // if we're logged in it will be true, if not it will be false
  const loggedIn = Auth.loggedIn()

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
        <div className="col-12 col-lg-3 mb-3">
          <FriendsList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
          />
        </div>
      ) : null}
      </div>
    </main>
  );
};

export default Home;
