import AuthService from './AuthService';
jest.unmock('./AuthService')
const addUserData = {
    auth: "1234567890qwertyui",
    email: "saffronhavunta@gmail.com",
    status: "SUCCESS",
    username: "saffron",
    __typename: "User",
};

describe('AuthService', () => {
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
    describe('Login', () => {
        describe('Success', () => {
            let Auth;
            let client;
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
                Auth = new AuthService();
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
            let Auth;
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
                Auth = new AuthService();
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

    describe('isTokenExpired', () => {
        let expectedValue;
        let decode;
        beforeEach(() => {
            Date.now = jest.fn(() => 1562337274867);
            decode = jest.genMockFromModule('jwt-decode');
            expectedValue = {"email": "trev_jos@hotmail.com", "exp": 1593876004, "iat": 1562318404, "id": "5d0b9538655a944f04619e09", "profileImage": "/Dosen-t-Gir-look-cute-nukecat316s-31170046-1280-800.jpg", "profileUsername": "/mrjoseph", "username": "Mr Joseph"}
            decode.mockReturnValue(expectedValue)
        });
        it('should return false', () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yIEpvc2VwaCIsImlkIjoiNWQwYjk1Mzg2NTVhOTQ0ZjA0NjE5ZTA5IiwiZW1haWwiOiJ0cmV2X2pvc0Bob3RtYWlsLmNvbSIsInByb2ZpbGVVc2VybmFtZSI6Ii9tcmpvc2VwaCIsInByb2ZpbGVJbWFnZSI6Ii9Eb3Nlbi10LUdpci1sb29rLWN1dGUtbnVrZWNhdDMxNnMtMzExNzAwNDYtMTI4MC04MDAuanBnIiwiaWF0IjoxNTYyMzE4NDA0LCJleHAiOjE1OTM4NzYwMDR9.YwU15SqHMh1nO51eSa0YsOK-YLlaCx6ijceOKhZfQZc';
            const Auth = new AuthService();
            const result = Auth.isTokenExpired(token);
            expect(result).toEqual(false);
        });
        it('should return false???..', () => {
            const token = ' ';
            const Auth = new AuthService();
            const result = Auth.isTokenExpired(token);
            try {
                
            } catch (error) {
                expect(result).toEqual(error);
            }
        });
    })
    describe('getProfile', () => {
        describe('with a token', () => {
            let Auth;
            let decode;
            let expectedValue = {
                "email": "trev_jos@hotmail.com",
                "exp": 1593876004,
                "iat": 1562318404,
                "id": "5d0b9538655a944f04619e09",
                "profileImage": "/Dosen-t-Gir-look-cute-nukecat316s-31170046-1280-800.jpg",
                "profileUsername": "/mrjoseph", "username": "Mr Joseph",
            }     
            decode = jest.genMockFromModule('jwt-decode')
            decode.mockReturnValue(expectedValue);
            Auth = new AuthService();
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yIEpvc2VwaCIsImlkIjoiNWQwYjk1Mzg2NTVhOTQ0ZjA0NjE5ZTA5IiwiZW1haWwiOiJ0cmV2X2pvc0Bob3RtYWlsLmNvbSIsInByb2ZpbGVVc2VybmFtZSI6Ii9tcmpvc2VwaCIsInByb2ZpbGVJbWFnZSI6Ii9Eb3Nlbi10LUdpci1sb29rLWN1dGUtbnVrZWNhdDMxNnMtMzExNzAwNDYtMTI4MC04MDAuanBnIiwiaWF0IjoxNTYyMzE4NDA0LCJleHAiOjE1OTM4NzYwMDR9.YwU15SqHMh1nO51eSa0YsOK-YLlaCx6ijceOKhZfQZc';
            const getTokenMock = jest.fn().mockReturnValue(token);
            Auth.getToken = getTokenMock; 
            it('should get the user profile object from the token', () => {
                const result = Auth.getProfile();
                expect(getTokenMock).toHaveBeenCalledWith()
                expect(result).toEqual(expectedValue);
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
    describe('loggedIn', () => {
        const Auth = new AuthService();
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yIEpvc2VwaCIsImlkIjoiNWQwYjk1Mzg2NTVhOTQ0ZjA0NjE5ZTA5IiwiZW1haWwiOiJ0cmV2X2pvc0Bob3RtYWlsLmNvbSIsInByb2ZpbGVVc2VybmFtZSI6Ii9tcmpvc2VwaCIsInByb2ZpbGVJbWFnZSI6Ii9Eb3Nlbi10LUdpci1sb29rLWN1dGUtbnVrZWNhdDMxNnMtMzExNzAwNDYtMTI4MC04MDAuanBnIiwiaWF0IjoxNTYyMzE4NDA0LCJleHAiOjE1OTM4NzYwMDR9.YwU15SqHMh1nO51eSa0YsOK-YLlaCx6ijceOKhZfQZc';
        const getTokenMock = jest.fn().mockReturnValue(token);
        const isTokenExpiredMock = jest.fn().mockReturnValue(token);
        Auth.getToken = getTokenMock;
        Auth.isTokenExpired = isTokenExpiredMock;

        it('should return a token', () => {
            Auth.loggedIn();
            expect(getTokenMock).toHaveBeenCalled();
            expect(isTokenExpiredMock).toHaveBeenCalled();
        })
    });
    describe('logout', () => {
        const Auth = new AuthService();
        beforeEach(() => {
            jest.spyOn(Storage.prototype, 'removeItem')
          })
       
        it('should logout the user', () => {
            Auth.logout();
            expect(localStorage.removeItem).toHaveBeenCalled()
        });
    });

    describe('getItem', () => {
        const Auth = new AuthService();
        beforeEach(() => {
            jest.spyOn(Storage.prototype, 'getItem')
          })
       
        it('should get the token', () => {
            Auth.getToken();
            expect(localStorage.getItem).toHaveBeenCalled()
        });
    });
    describe('setToken', () => {
        const Auth = new AuthService();
        beforeEach(() => {
            jest.spyOn(Storage.prototype, 'setItem')
            Auth.authToken = null;
          })
        it('should set the auth token', () => {
            Auth.setToken();
            expect(localStorage.setItem).not.toHaveBeenCalled()
        });
    });
});