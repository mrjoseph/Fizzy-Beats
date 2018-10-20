import fs from 'fs'

const parseHtml = (root, htmlTemplate) => {
  const reformattedHtml = fs.readFileSync(htmlTemplate);
  let data = reformattedHtml.toString();
  data = data.replace('<title>Mixdown</title>', `<link rel="stylesheet" href="/css/main.css"><title>Mixdown</title>`);
  data = data.replace('<div id="root"></div>', `<div id="root">${root}</div> <script src="/js/bundle.js"></script>`);
  return data;
}

export default parseHtml;