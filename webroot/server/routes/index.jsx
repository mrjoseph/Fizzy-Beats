import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../../client/app';
const html = root => (`
    <!doctype html>
    <html>
      <head>
      <link rel="stylesheet" href="/css/main.css">
        <title>
        Mixdown
        </title>
      </head>
      <body>
        <div id="root">${root}</div>
        <script src="/js/bundle.js"></script>
      </body>
    </html>
  `);

const renderHTML = (req, res) => {
  const context = {};
  const root = ReactDomServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );
  return html(root);
};

export default renderHTML;
