import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import router from './router';
const port = 3003;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname + '/uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/upload', router);

app.use('/create-storage', router)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

 export default app;