import express from 'express';
import bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import renderHTML from './routes/index';
import schema from './graphql-schema/user/index';

const uri = `mongodb://127.0.0.1:27017/mixdown`;

mongoose.connect(uri);

mongoose.connection.once('open', () => {
  console.log('connection to database');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.use('/', async (req, res) => {
  res.send(await renderHTML(req, res));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/* App set up
* TODO add 404 and 500 pages
* TODO add Redux to handle app state server side
* TODO add redux logger for development build
* TODO Set-up MongoDB and Mongoose models
* TODO set up social media accounts, TW, YouTube, SC, BandCamp
* TODO How do we render content in the header? React helmet
* TODO add pre commit hook
* todo graphql
* TODO Build assets
* TODO SASS / Base css / css modules
* TODO FAVICON
* */

/* Design app
* TODO Design homespage
* TODO Design admin
* */
