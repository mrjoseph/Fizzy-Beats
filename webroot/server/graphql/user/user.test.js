// frame works
import { makeExecutableSchema, mockServer } from 'graphql-tools';
import { typeDefs } from '../index';

// const schema = makeExecutableSchema({ typeDefs });

describe('mock server', () => {
  it('should mock the server call', async () => {
    const myMockServer = await mockServer(typeDefs, {
      getProfile: () => ({
        email: 'tony.stark@gmail.com',
      }),
    });
    const query = ` 
    query
    {
      getProfile(email:"tony.stark@gmail.com"){
        username
        email
      }
    }
  `;
    const response = await myMockServer.query(query);
    const expected = {
      data: {
        getProfile: {
          username: 'Hello World',
          email: 'Hello World',
        },
      },
    };
    expect(response).toMatchObject(expected);
  });
});
