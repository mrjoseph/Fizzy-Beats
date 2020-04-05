import { mockServer } from 'graphql-tools';

import { typeDefs } from '../index';


describe('mock server', () => {
  it('should mock the server call', async () => {
    const myMockServer = await mockServer(typeDefs, {
      Query: () => ({
        loginUser: () => ({
          email: 'trev_jos@hotmail.com',
          id: '1234567890',
          username: 'Tony Stark',
          auth: 'kjhgfdwertyjhgf',
          status: 'SUCCESS',
        }),
      }),
    });
    const query = ` 
    query
    {
      loginUser(email: "trev_jos@hotmail.com", password:"password1") {
        email
        username
        id
        status
        auth
      }
    }
  `;
    const response = await myMockServer.query(query);
    const expected = {
      data: {
        loginUser: {
          email: 'trev_jos@hotmail.com',
          username: 'Tony Stark',
          id: '1234567890',
          auth: 'kjhgfdwertyjhgf',
          status: 'SUCCESS',
        },
      },
    };
    expect(response).toMatchObject(expected);
  });
});
