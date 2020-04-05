import fs from 'fs';
import { inspect } from 'util';
const parseHtml = (root, htmlTemplate, styles, title, client) => {
  const reformattedHtml = fs.readFileSync(htmlTemplate);
  let data = reformattedHtml.toString();
  data = data.replace('<title>Mixdown</title>', ` ${styles}<link rel="stylesheet" href="/assets/css/main.css"><title>${title}</title>`);
  data = data.replace('<div id="root"></div>', `<div id="root">${root}</div> <script src="/assets/js/bundle.js"></script>`);
  data = data.replace('<script></script>', `<script> window.__APOLLO_STATE__ = ${JSON.stringify(inspect(client))};</script>`);
  return data;
}

export default parseHtml;
