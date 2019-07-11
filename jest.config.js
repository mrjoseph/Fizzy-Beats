const {defaults} = require('jest-config');

module.exports = {
  modulePathIgnorePatterns: ["<rootDir>/webroot/client/assets/images/rings.svg"],
  "setupFiles": ["<rootDir>/setupFile.js"],
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};