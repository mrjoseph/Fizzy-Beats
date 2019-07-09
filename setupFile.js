const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
const { window } = dom;
global.document = window.document;
