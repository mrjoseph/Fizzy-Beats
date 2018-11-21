import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = new HttpLink({
  uri: 'http://localhost:5000/graphql'
});
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

import Routes from './app';
const App = () => <BrowserRouter><Routes /></BrowserRouter>;
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById("root"));