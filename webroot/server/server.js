import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import renderHTML from './routes/index';
import server from './graphql';


const uri = `${process.env.MONGODBURI}/${process.env.DB}`;
mongoose.connect(uri);

mongoose.connection.once('open', () => {
  console.log('connection to database');
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

server.applyMiddleware({ app });
app.use('/', async (req, res) => {
  const html = await renderHTML(req, res);
  res.send(html);
});


app.listen({ port: 5000 }, () => console.log(`🚀 Server ready at ${process.env.GQL_SERVER}/${server.graphqlPath}`));

