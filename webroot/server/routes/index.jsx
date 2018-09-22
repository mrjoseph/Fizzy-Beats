import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app';

const html = root => (`
    <!doctype html>
    <html>
      <head>
        <title>
        Mixdown
        </title>
      </head>
      <body>
        <div id="root">${root}</div>
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
