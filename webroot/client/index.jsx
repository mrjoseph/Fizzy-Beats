import React from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';

import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { defaults } from './graphql/defaults/defaults';
import { resolvers } from './graphql/resolvers/resolvers';
import Routes from './app';

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage,
});


const stateLink = withClientState({
  defaults,
  resolvers, 
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const link = ApolloLink.from([stateLink, uploadLink]);


const client = new ApolloClient({
  link,
  cache,
});

const App = () => {
  return (
      <Router>
        <Routes />
      </Router>
  )
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
