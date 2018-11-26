import React from 'react';
import renderer from 'react-test-renderer';
import Profile from './Profile';

const props = {
  history: {
    replace: () => {},
  },
  location: {
    search: {
      foo: 'bar',
    },
  },
};

describe('<about />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(<Profile {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
