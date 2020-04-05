const {defaults} = require('jest-config');

module.exports = {
  transformIgnorePatterns: [
  
  ],
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper:{
   
    ".+\\.(svg|png|jpg)$": "identity-obj-proxy"
},
 
  "setupFiles": ["<rootDir>/setupFile.js"],
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};

