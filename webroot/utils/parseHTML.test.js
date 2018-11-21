import parseHTML from './parseHtml';
import path from "path";
import fs from 'fs';

jest.mock('fs', () => ({
  readFileSync: jest.fn()
}));

describe('../utils/parseHTML()', () => {
  let htmlTemplate;
  beforeEach(() => {
    htmlTemplate = path.resolve(__dirname, '../../template/index.html');
  });
  describe('When passed a html template, root component, styles, title and client', () => {
    it('Should render a html template server side',  () => {

      const htmlTemplate = path.resolve(__dirname, '../../template/index.html');
      const root = () => <div>Hello world</div>
      const styles = () => <style>{`div: { background: red}`}</style>
      const title = 'Mixdown';
      const client = {foo: 'bar'};
      const markup = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    function styles() {
    return React.createElement("style", null, "div: { background: red}");
  }<link rel="stylesheet" href="/css/main.css"> function styles() {
    return React.createElement("style", null, "div: { background: red}\\");
  }
    <style>div: { background: red}</style>
  </head>
    <body>
    <div id="root">function root() {
      return React.createElement("div", null, "Hello world");
    }</div> <script src="/js/bundle.js"></script>
    <script> window.__APOLLO_STATE__ = {"foo":"bar"};</script>
      </body>
  </html>`;

      fs.readFileSync.mockReturnValue(markup);
      const result = parseHTML(root, htmlTemplate, styles, title, client);
      expect(result).toEqual(markup);
    });
  });
});