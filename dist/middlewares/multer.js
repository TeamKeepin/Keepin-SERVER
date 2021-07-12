"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multerS3 = require('multer-s3');
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.loadFromPath(__dirname + '/../s3config/s3info.json');
const s3 = new aws_sdk_1.default.S3();
const upload = multer_1.default({
    storage: multerS3({
        s3: s3,
        bucket: 'keepin-bucket',
        acl: 'public-read-write',
        key: function (req, file, cb) {
            cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        },
    }),
});
exports.default = upload;
//# sourceMappingURL=multer.js.map