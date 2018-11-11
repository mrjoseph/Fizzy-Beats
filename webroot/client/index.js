import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql'
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

import Routes from './app';
const App = () => <BrowserRouter><Routes /></BrowserRouter>;
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById("root"));