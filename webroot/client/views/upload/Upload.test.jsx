import React from 'react';
import renderer from 'react-test-renderer';
import Upload from './Upload';

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

describe('<upload />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(<Upload {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
