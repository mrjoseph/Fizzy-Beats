import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Routes from './app';

const link = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
const App = () => <Router><Routes /></Router>;
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
