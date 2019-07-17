import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import Routes from './app';
import { client } from './client';

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

