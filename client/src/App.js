import React from 'react';

// use to provide data to all other components
import { ApolloProvider } from '@apollo/react-hooks'
//to get that data when we are ready to use it
import ApolloClient from 'apollo-boost'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// import browser router and route components from the React Router library 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// establish new connection to the graphQL server using Apollo
// React runs on 3000 and GraphQL runs on 3001
const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    // pass client variable in for the value of the client prop in the provider
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            {/* wrapped all route components in switch to render no match if the route isn't any of the proceeding paths */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
