import express from 'express';
import renderHTML from './routes/index';
const app = express();

app.use('/',(req,res) => {
  res.send(renderHTML(req, res));
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/* App set up
* TODO Add react to render out first page
* TODO Add react router to handle navigation server side
* TODO add Redux to handle app state server side
* TODO add redux logger for development build
* TODO handle build for dev and prod
* TODO Handle client side rendering
* TODO Handle bundling client side assets using webPack
* TODO Set up unit tests
* TODO Set-up MongoDB and Mongoose
* */

/* Design app
* TODO Design homespage
* */