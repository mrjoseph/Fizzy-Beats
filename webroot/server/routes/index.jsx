import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ServerStyleSheet } from 'styled-components';
import fetch from 'node-fetch';
import parseHtml from '../../utils/parseHtml';
const htmlTemplate = path.resolve(__dirname, '../../template/index.html');
import App from '../../client/app';
import path from 'path';

const renderHTML = (req, res) => {
  if(typeof window === 'undefined')  global.window = {};
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      fetch: fetch,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });
  const context = {};
  const sheet = new ServerStyleSheet();
  const styles = sheet.getStyleTags();
  const title = 'Mixdown v1';
  const root = ReactDomServer.renderToString(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>,
  );
  return parseHtml(root,htmlTemplate, styles, title, client);
};

export default renderHTML;
