import React from 'react';
// redirect allows us to redirect the user to another route within the app without reloading app
import { Redirect, useParams } from 'react-router-dom';

import ThoughtList from '../components/ThoughtList';
import FriendsList from '../components/FriendsList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ThoughtForm from '../components/ThoughtForm';


const Profile = () => {
  const { username: userParam } = useParams();

  // descturcture mutation function from ADD_FRIEND so we can use it in a click function
  const [addFriend] = useMutation(ADD_FRIEND);

  // if it's our profile, url will not have a value and if it is it will
  // if userparam has a value, we'll run query_user, if not well run query_me
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // block user and send error message when they try to visit '/profile' when not loggedin
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  // handle add friend click
  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
      <h2 className="bg-dark text-secondary p-3 display-inline-block">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>

      {/* Conditionally render add friend button */}
      {userParam && (
        <button className="btn ml-auto" onClick={handleClick}>
          Add Friend
        </button>
      )}

      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendsList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>
    </div>
  );
};

export default Profile;
