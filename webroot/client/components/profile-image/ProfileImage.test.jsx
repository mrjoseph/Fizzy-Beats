import React from 'react';
import { createUploadLink } from 'apollo-upload-client';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { client } from '../../client';
import ProfileImage from './ProfileImage';
// global.fetch = require('jest-fetch-mock');
describe('ProfileImage', () => {
    it('should', () => {
        expect(1).toEqual(1)
    })
    describe('loading', () => {
        let createUploadLink;
        let component;
        const props = {
            username: 'Tony Stark',
            data: {
                loading: true,
                error: false, 
                profileId: null
            },
            userId: '123456789qwertyu'
        };
        beforeEach(() => {
            component = shallow(<ProfileImage {...props} />)
        });
        it('should render a loading div', () => {
            console.log(component);
        })
    })
    describe('success', () => {
        it('renders correctly', () => {
            const props = {
                username: 'Tony Stark',
                data: {
                    loading: false,
                    error: false, 
                    profileId: '123456789qwertyu'
                },
                userId: '123456789qwertyu'
            };
          const tree = renderer.create(
              <ApolloProvider client={client}>
                    <ProfileImage {...props} />
              </ApolloProvider>
          ).toJSON();
          expect(tree).toMatchSnapshot();
      });
      })
});