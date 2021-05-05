import React from 'react';

// use to provide data to all other components
import { ApolloProvider } from '@apollo/react-hooks'
//to get that data when we are ready to use it
import ApolloClient from 'apollo-boost'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish new connection to the graphQL server using Apollo
// React runs on 3000 and GraphQL runs on 3001
const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  return (
    // pass client variable in for the value of the client prop in the provider
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
