import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

const port = 3003;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './webroot/cdn/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/upload', upload.array('files', 12), (req, res) => {
    let files;
    if (req.files) {
        console.log('Uploading file...');
        var filename = req.files.originalname;
        files = req.files.map(({ originalname }) => originalname).join(', ');
    
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
        
    res.send({ status: uploadStatus, filename: `Name Of File: ${files}` });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))