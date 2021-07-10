import multer from 'multer';
const multerS3 = require('multer-s3');
import aws, { SecretsManager } from 'aws-sdk';
import config from "../config";
aws.config.loadFromPath(__dirname + config.s3info);


const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'keepin-bucket',
        acl: 'public-read-write',
        key: function(req, file, cb){
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    })
 });

export default upload
