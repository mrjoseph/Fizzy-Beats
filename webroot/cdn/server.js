import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const port = 3003;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname + '/uploads')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./webroot/cdn/uploads/temp`)
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
        console.log(req.files);
        files = req.files.map(({ originalname }) => {
            console.log('originalname', originalname);
            if(originalname) { 
                const origin = path.join(`${__dirname}/uploads/temp/${originalname}`);
                const destination = path.join(`${__dirname}/uploads/${req.body.userId}/${originalname}`);
                fs.renameSync(origin, destination);
            }
            return {'files': originalname };
        });

       
       
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }
        
    res.send({ status: uploadStatus, files });
});

app.post('/create-storage', async (req, res) => {
    const { userId } = req.body;
    console.log(userId)
    const dir =  path.join(__dirname + `/uploads/${userId}`)
    let message;
    let origin = path.join(__dirname + `/uploads/temp/default-profile-pic.jpg`);
    let destination = path.join(__dirname + `/uploads/${userId}/`);

    if (fs.existsSync(dir)) {
        message = 'user directory exists';
        
    } else {
        fs.mkdirSync(dir);
        fs.createReadStream(origin).pipe(fs.createWriteStream(`${destination}/default-profile-pic.jpg`));
        // fs.mkdir(dir, { recursive: true }, (err) => {
        //     if (err) throw err;
        //     //console.log(destination, origin);
        //     //fs.renameSync(origin, destination);
            
        //   });
        message = 'user directory created!';
    }
    res.send(message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))