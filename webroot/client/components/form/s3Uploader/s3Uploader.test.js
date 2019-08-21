import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Upload from './s3Uploader';
import { UPLOADER } from '../formConfig/formConfig';

describe('s3Uploader', () => {
    describe('uploadAssets', () => {
        let component;
        beforeEach(() => {
            component = shallow(<Upload {...props} />);
        })
    })
    describe('submit', () => {
        describe('submit success', () => {
            let component;
            const props = {
                addAssets: jest.fn().mockImplementation(() => Promise.resolve({
                    data: {
                        addAssets: {
                            message: 'SUCCESS'
                        }
                    }
                })),
            };
            beforeEach(() => {
                component = shallow(<Upload {...props} />);
            })
            it('should call uploadAssets', async () => {
                const state = {
                    file: [
                        {
                            name: 'foo.mp3',
                            size: '1234567',
                            type: 'mp3',
                        }
                    ]
                }
                component.setState(state);
                component.instance().uploadAssets = jest.fn();
                const form = component.find('#form');
                form.simulate('submit', { preventDefault() {} });
                expect(await component.instance().uploadAssets).toHaveBeenCalled();
    
               
            })
        });

        describe('Call fetch', () => {
            let component;
            const expectedResponse = { 
                status: 'File Uploaded Successfully', 
                files: [{ 
                    files: 'Mr Joseph - Scrappy Do TRAC Remix.mp3'
                }]
            };

            const props = {};
            beforeEach(() => {
                global.fetch = jest.fn().mockImplementation(() => {
                var p = new Promise((resolve, reject) => {
                        resolve({
                            ok: true, 
                            Id: '123', 
                            json:() => expectedResponse
                        });
                    });
                    return p;
          
                });
                component = shallow(<Upload {...props} />);
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });
            it('shouold call fetch and return response', async () => {
                const fileList = {
                    0: {
                        name: "Mr Joseph - Scrappy Do TRAC Remix.mp3",
                        size: 14380667,
                        type: "audio/mp3"
                    }
                };
                component.setState({ file: fileList });
                const signedRequest = 'http://localhost:3003/upload';
                const userId = '123456789abcdefg';
                const response = await component.instance().uploadAssets(fileList, signedRequest, userId);
                expect(response).toEqual(expectedResponse)
                
            })
        });

        describe('submit fail', () => {
            let component;
            const props = {
                addAssets: jest.fn().mockImplementation(() => Promise.reject({
                    message: 'error'
                })),
            };
            beforeEach(() => {
                component = shallow(<Upload {...props} />);
            })
            it('should call uploadAssets', async () => {
                const state = {
                    file: [
                        {
                            name: 'foo.mp3',
                            size: '1234567',
                            type: 'mp3',
                        }
                    ]
                }
                try {
                    component.setState(state);
                    component.instance().uploadAssets = jest.fn();
                    const form = component.find('#form');
                    form.simulate('submit', { preventDefault() {} });
                    expect(await component.instance().uploadAssets).toHaveBeenCalled(); 
                } catch (error) {
                    console.log(error);
                    expect(error).toEqual('error')
                }
            })
        })
        describe('onDrop', () => {
            let component;
            const props = {};
            beforeEach(() => {
                component = shallow(<Upload {...props} />);
            })
        it('should update the state with the uploaded files', async () => {
            const event = {
                target: {
                    files: {                    
                        0: {
                            name: "Mr Joseph - Scrappy Do TRAC Remix.mp3",
                            size: 14380667,
                            type: "audio/mp3"
                        }
                    }
                }
            }
            await component.instance().onDrop(event);
        })    
        });
    });
});
