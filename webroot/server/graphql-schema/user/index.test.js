// frame works
import { mockServer } from 'graphql-tools';
import schema, { UserType } from './index';
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
describe('mock server', () => {
  it('should mock the server call', async () => {
    const myMockServer = mockServer(schema, {
      String: () => 'Hello',
    });
    const response = await myMockServer.query(`{
        users {
          username,
          password,
        }
    }`);
    const expected =  {
      data: {
        users: [
          {
            "username": "Hello"
          },
          {
            "username": "Hello"
          },
        ]
      }
    }
    expect(response).toMatchObject(expected);
  });
});
describe('UserTypes', () => {
  let userTypeFields;
  beforeEach(() => {
   userTypeFields = UserType.getFields();
  });

  it('Should have type of id', () => {
    expect(userTypeFields).toHaveProperty('id');
    expect(userTypeFields.username.type).toMatchObject(GraphQLString);
  });
  it('Should have type of username', () => {
    expect(userTypeFields).toHaveProperty('username');
    expect(userTypeFields.username.type).toMatchObject(GraphQLString);
  });

  it('Should have type of email', () => {
    expect(userTypeFields).toHaveProperty('email');
    expect(userTypeFields.username.type).toMatchObject(GraphQLString);
  });

  it('Should have type of salt', () => {
    expect(userTypeFields).toHaveProperty('salt');
    expect(userTypeFields.username.type).toMatchObject(GraphQLString);
  });
  it('Should have type of password', () => {
    expect(userTypeFields).toHaveProperty('password');
    expect(userTypeFields.username.type).toMatchObject(GraphQLString);
  });
});