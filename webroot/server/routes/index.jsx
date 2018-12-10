import React from 'react';
import { StaticRouter } from 'react-router';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ServerStyleSheet } from 'styled-components';
import fetch from 'node-fetch';
import path from 'path';
import parseHtml from '../../utils/parseHtml';
import App from '../../client/app';
const localStorage = require('localstorage-polyfill');
const htmlTemplate = path.resolve(__dirname, '../../template/index.html');

const renderHTML = async (req) => {
  if (typeof window === 'undefined') global.window = {};
  const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql',
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
      },
      fetch,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache,
  });
  const context = {};
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();
  const title = 'Mixdown v1';

  try {
    const root = await renderToStringWithData(
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>,
    );
    return parseHtml(root, htmlTemplate, styles, title, client);
  } catch (e) {
    console.log(e);
  }
};

export default renderHTML;
