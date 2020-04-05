import React from 'react';
import renderer from 'react-test-renderer';
import { ApolloProvider } from 'react-apollo';
import Upload from './Upload';
import { client } from '../../client';
const props = {
  history: {
    replace: () => {},
    location: {
      search: {
        foo: 'bar',
      },
    },
  },
};

describe('<upload />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(
        <ApolloProvider client={client}>
         <Upload {...props} />
        </ApolloProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
