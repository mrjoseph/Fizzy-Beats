import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import renderHTML from './routes/index';
import schema from './graphql-schema/user/index';

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

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.use('/', async (req, res) => {
  const html = await renderHTML(req, res);
  res.send(html);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

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
