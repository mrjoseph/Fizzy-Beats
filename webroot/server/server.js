import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import renderHTML from './routes/index';
// import { typeDefs as usersTypes, resolvers as userResolvers } from './graphql/user/user';
// const { ApolloServer } = require('apollo-server-express');
import server from './graphql';

const uri = 'mongodb://127.0.0.1:27017/mixdown';

mongoose.connect(uri);

mongoose.connection.once('open', () => {
  console.log('connection to database');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// const server = new ApolloServer({ typeDefs: [usersTypes], resolvers: [userResolvers] });
server.applyMiddleware({ app });
app.use('/', async (req, res) => {
  const html = await renderHTML(req, res);
  res.send(html);
});


app.listen({ port: 5000 }, () => console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`));

/* App set up
* TODO and 500 pages
* TODO add environment variables
* TODO add Redux to handle app state server side
* TODO add redux logger for development build
* TODO set up social media accounts, TW, YouTube, SC, BandCamp
* TODO How do we render content in the header? React helmet
* TODO add pre commit hook
* TODO Build assets
* TODO FAVICON
* */

/* Design app
* TODO Design homespage
* TODO Design admin
* */
