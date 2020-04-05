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
                global.fetch = jest.fn().mockImplementation(() => 
                Promise.resolve({
                    ok: true, 
                    Id: '123', 
                    json:() => expectedResponse
                }));
             
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

                const data = new FormData();
                Object.keys(fileList).forEach((item) => { data.append('files', fileList[item]); })
                data.append('userId', userId);

                const options = {
                    method: 'POST',
                    body: data
                  };
                await component.instance().uploadAssets(fileList, signedRequest, userId);
                expect(global.fetch).toHaveBeenCalledWith(signedRequest,options);
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
            const event = {
                target: {
                    files: {                    
                        0: {
                            name: "Mr Joseph - Scrappy Do TRAC Remix.mp3",
                            size: 14380667,
                            type: "audio/mp3"
                        },
                        1: {
                            name: "Mr Joseph -  untitled - Remix.mp3",
                            size: 14380667,
                            type: "audio/mp3"
                        }
                    }
                }
            };
            let component;
            const props = {};
            beforeEach(() => {
                global.FileReader = jest.fn().mockImplementation(() => ({
                    readAsDataURL: jest.fn(),
                    onload: jest.fn(),
                    result: 'abcd1234'
                }));
                component = shallow(<Upload {...props} />);
            });
            afterEach(() => {
                jest.restoreAllMocks();
            });
            it('should update the state with the uploaded files', async () => {

                await component.instance().onDrop(event);
                expect(component.state().loadingPreview).toEqual(true);
                expect(component.state().file).toEqual(event.target.files);
                expect(component.state().successMessage).toEqual(null);
                const { files } = event.target;
                Object.keys(files).map((item) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(files[item]);
                    console.log('--->>',files[item]);              
                    console.log(component.state().images);
                    // expect(component.state().images).toEqual([{
                    //     item: 'asdasdasd',
                    //     name: 'Mr Joseph - Scrappy Do TRAC Remix.mp3',
                    //     size: 14601558
                    // }])
                });
            })    
        });
    });
});
