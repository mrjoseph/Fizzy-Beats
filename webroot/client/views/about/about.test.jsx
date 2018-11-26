import React from 'react';
import renderer from 'react-test-renderer';
import About from './about';


describe.skip('<about />', () => {
  describe('snapshot render component', () => {
    it('should console.log component', () => {
      const tree = renderer.create(<About />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
