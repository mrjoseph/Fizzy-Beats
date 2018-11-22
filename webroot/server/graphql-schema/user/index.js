import { slatHashPassword } from '../../utils/encription';
const graphql = require('graphql');
const User = require('../../mongoDb-models/user');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    salt: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users:{
      type: new GraphQLList(UserType),
      resolve(parent,args) {
        return User.find({});
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: {type: new GraphQLNonNull(GraphQLString) },
        email: {type: new GraphQLNonNull(GraphQLString) },
        //salt: {type: new GraphQLNonNull(GraphQLString) },
        password: {type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { passwordHash, salt } = slatHashPassword(args.password);
        let user = new User({
          username:args.username,
          email: args.email,
          salt: salt,
          password: passwordHash
        });
        console.log('user', user);
        return user.save();
      }
    },
    removeUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return User.findByIdAndRemove(args.id);
      }
    },
    }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
