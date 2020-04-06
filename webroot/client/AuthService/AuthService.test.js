import decode from 'jwt-decode';
import AuthService from './AuthService';

import 'jest-localstorage-mock';
jest.mock('jwt-decode');

const addUserData = {
    auth: "1234567890qwertyui",
    email: "saffronhavunta@gmail.com",
    status: "SUCCESS",
    username: "saffron",
    __typename: "User",
};

describe('AuthService', () => {
    afterEach(() => {
        localStorage.removeItem(token)
    });
    const token = 'id_token';
    const keyName = 'id_token';
    const keyValue = 'abcdefg';
    describe('logout()', () => {
        it('should logout the user', () => {
            let Auth = new AuthService();
           Auth.logout();
           expect(localStorage.removeItem).toHaveBeenCalled();
        });
    });
    describe('removeToken()', () => {
        it('should remove the the token', () => {
            let Auth = new AuthService();
            Auth.removeToken();
            expect(localStorage.removeItem).toHaveBeenCalled()
        });
    });
    describe('loggedIn()', () => {
        it('should login the user', () => {
            let Auth = new AuthService();
            localStorage.setItem(keyName, keyValue)
            expect(Auth.loggedIn()).toEqual(true);
        });

        it('should return undefined', () => {
            let Auth = new AuthService();
            expect(Auth.loggedIn()).toEqual(undefined);
        });
    });
    describe('getToken()', () => {
        it('should get the token', () => {
            let Auth = new AuthService();
            localStorage.setItem(keyName, keyValue)
            expect(Auth.getToken()).toEqual(keyValue)
        });
    });

    describe('setToken', () => {
        it('should set token to localStorage', () => {
            let Auth = new AuthService();
            Auth.authToken = 'abcd1234';
            expect(localStorage.setItem).toHaveBeenCalledWith(keyName,keyValue)
        });
    });

    describe('isTokenExpired()', () => {
        it('should check if token is expired', () => {
            let Auth = new AuthService();
            localStorage.setItem(keyName, keyValue)
            decode.mockReturnValue('abcdefg');
            expect(Auth.isTokenExpired()).toEqual(false);
        });
    });

    describe('Login', () => {
        describe('Success', () => {
            let client;
            let Auth = new AuthService();
            beforeEach(() => {
                client = {
                    query: jest.fn().mockReturnValue({
                        data: {
                            loginUser: {
                                status: 'SUCCESS',
                                auth: "1234567890qwertyui",
                            }
                        }
                    })
                }
            });
            it('It should login a existing user', async () => {
                const formData = {
                    password: 'password1',
                    email: 'tony.stark.stark-industries.net' 
                }
                const result = await Auth.login(client,formData);
                expect(result).toEqual({"loginUser": {"auth": "1234567890qwertyui", "status": "SUCCESS"}})
            })
        });
        describe('failed', () => {
            let Auth = new AuthService();
            let client;
            beforeEach(() => {
                client = {
                    query: jest.fn().mockReturnValue({
                        data: {
                            loginUser: {
                                status: 'NO_USER_FOUND',
                            }
                        }
                    })
                }
            });
            it('It should not login a existing user because one does not exist', async () => {
                const formData = {
                    password: 'password1',
                    email: 'tony.stark@stark-industries.net' 
                }
                const result = await Auth.login(client,formData);
                expect(result).toEqual({"loginUser": { "status": "NO_USER_FOUND"}})
            })
        });
    })
    describe('Register', () => {
        describe('New user', () => {
            let Auth;
            let addUser;
            beforeEach(() => {
                addUser = jest.fn().mockReturnValue({
                    data: {
                        addUser: addUserData
                    }
                })
                Auth = new AuthService();
            });
            it('It should register a new user', async () => {
                const formData = {
                    username: 'Tony Stark',
                    password: 'password1',
                    email: 'tony.stark@stark-industries.net' 
                }
                const result = await Auth.register(addUser,formData);
                expect(result).toEqual(addUserData)
            })
        });
        describe('User exists', () => {  
            let addUser;
            beforeEach(() => {
                addUser = jest.fn().mockReturnValue({
                    data: {
                        addUser: {
                            status: 'USER_EXISTS'
                        }
                    }
                })
            });
            it('should return a message that the user already existes', async () => {
                const formData = {
                    username: 'Tony Stark',
                    password: 'password1',
                    email: 'tony.stark@stark-industries.net' 
                }
                const Auth = new AuthService();
                const result = await Auth.register(addUser,formData);
                expect(result).toEqual({
                    status: 'USER_EXISTS'
                })
            });
        });
    });

    describe('getProfile', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        describe('with a token', () => {          
            it('should get the user profile object from the token', () => {
                let expectedValue = {
                    "email": "trev_jos@hotmail.com",
                    "exp": 1593876004,
                    "iat": 1562318404,
                    "id": "5d0b9538655a944f04619e09",
                    "profileImage": "/Dosen-t-Gir-look-cute-nukecat316s-31170046-1280-800.jpg",
                    "profileUsername": "/mrjoseph", "username": "Mr Joseph",
                }  

                localStorage.setItem(keyName, keyValue);

                decode.mockReturnValue(expectedValue);

                let Auth = new AuthService();

                expect(Auth.getProfile()).toEqual(expectedValue);
            });
        });
        describe('without a token', () => {
            let Auth;
            let decode;
            let expectedValue = undefined;     
            decode = jest.genMockFromModule('jwt-decode')
            decode.mockReturnValue(expectedValue);
            Auth = new AuthService();
            let token = '';
            const getTokenMock = jest.fn().mockReturnValue(token);
            Auth.getToken = getTokenMock; 
            it('should get the user profile object from the token', () => {
                const result = Auth.getProfile();
                expect(getTokenMock).toHaveBeenCalled()
                expect(result).toEqual(expectedValue);
            });
        });
    });
});