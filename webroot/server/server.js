import express from 'express';
import bodyParser from 'body-parser';
import renderHTML from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use('/', (req, res) => {
  res.send(renderHTML(req, res));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/* App set up
* TODO Add react router to handle navigation server side
* TODO add Redux to handle app state server side
* TODO add redux logger for development build
* TODO handle build for dev and prod
* TODO Handle client side rendering
* TODO Handle bundling client side assets using webPack
* TODO Set-up MongoDB and Mongoose models
* TODO set up social media accounts, TW, YouTube, SC, BandCamp
* TODO How do we render content in the header?
* TODO add pre commit hook
* */

/* Design app
* TODO Design homespage
* */
