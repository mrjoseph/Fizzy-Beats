import React from 'react';
import ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import parseHtml from '../../utils/parseHtml';
const htmlTemplate = path.resolve(__dirname, '../../template/index.html');
import App from '../../client/app';
import path from 'path'

const renderHTML = (req, res) => {
  const context = {};
  const root = ReactDomServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );
  return parseHtml(root,htmlTemplate);
};

export default renderHTML;
