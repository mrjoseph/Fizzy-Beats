import fs from 'fs'

const parseHtml = (root, htmlTemplate, styles, title) => {
  const reformattedHtml = fs.readFileSync(htmlTemplate);
  let data = reformattedHtml.toString();
  data = data.replace('<title>Mixdown</title>', ` ${styles}<link rel="stylesheet" href="/css/main.css"><title>${title}</title>`);
  data = data.replace('<div id="root"></div>', `<div id="root">${root}</div> <script src="/js/bundle.js"></script>`);
  return data;
}

export default parseHtml;