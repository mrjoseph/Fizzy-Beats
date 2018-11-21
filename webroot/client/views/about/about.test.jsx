import React from 'react';
import renderer from 'react-test-renderer';
import About from './about';

const props = {
  location: {
    search: {
      foo: 'bar',
    },
  },
};

describe('<about />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(<About {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});