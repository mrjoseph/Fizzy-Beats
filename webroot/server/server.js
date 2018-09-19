import express from 'express';
import renderHTML from './routes/index';
const app = express();

app.use('/',(req,res) => {
  res.send(renderHTML());
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});