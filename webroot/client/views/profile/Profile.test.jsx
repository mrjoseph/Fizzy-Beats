import React from 'react';
import { ApolloProvider } from 'react-apollo';
import renderer from 'react-test-renderer';
import Profile from './Profile';
import { client } from '../../client';

const props = {
  history: {
    replace: () => {},
    location: {
      pathname: '/my-account',
      search: {
        foo: 'bar',
      },
    },
  },
};

describe('<about />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(
        <ApolloProvider client={client}>
          <Profile {...props} />
        </ApolloProvider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
