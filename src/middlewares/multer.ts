import multer from 'multer';
const multerS3 = require('multer-s3');
import aws from 'aws-sdk';
aws.config.loadFromPath(__dirname + '/../s3config/s3info.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'keepin-bucket',
    acl: 'public-read-write',
    key: function (req, file, cb) {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
    },
  }),
});

export default upload;
