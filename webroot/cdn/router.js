import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./webroot/cdn/uploads/temp`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })

router.post('/create-storage', async (req, res) => {
    const { userId } = req.body;
    const dir =  path.join(__dirname + `/uploads/${userId}`)
    const src = path.join(`${__dirname}/uploads/temp/default-profile-pic.jpg`);
    const dist = path.join(__dirname + `/uploads/${userId}/default-profile-pic.jpg`)
    let message;
    if (fs.existsSync(dir)) {
        message = 'user directory exists';
    } else {
        await fs.mkdirSync(dir);
        await fs.copyFileSync(src, dist);
        message = 'user directory created!';
    }
    return res.send(message);
});


router.post('/upload', upload.array('files', 12), (req, res) => {
    let files;
    let uploadStatus;
    if (req.files) {
        files = req.files.map(({ originalname }) => {
            if(originalname) { 
                const origin = path.join(`${__dirname}/uploads/temp/${originalname}`);
                const destination = path.join(`${__dirname}/uploads/${req.body.userId}/${originalname}`);
                fs.renameSync(origin, destination);
            }
            return {'files': originalname };
        });     
        uploadStatus = 'File Uploaded Successfully';
    } else {
        uploadStatus = 'File Upload Failed';
    }
        
    res.send({ status: uploadStatus, files });
});

export default router;