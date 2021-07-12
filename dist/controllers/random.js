"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const returnCode_1 = __importDefault(require("../library/returnCode"));
/**
 * @api {get} /random 랜덤키핀 조회
 *
 * @apiVersion 1.0.0
 * @apiName getRandom
 * @apiGroup Random
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "랜덤 키핀 조회 성공",
 *   "data": {
 *       "_id": "60e46b35c167c37c296bbf4f",
 *       "title": "햄버거 고마워",
 *       "photo": "ㄹㅇ나룬어룬ㅇㄹㅇㄴ"
 *   }
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getRandom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    try {
        const randoms = yield services_1.randomService.findRandoms({ userIdx });
        const randomNumber = Math.floor(Math.random() * randoms.length);
        const randomId = randoms[randomNumber]._id;
        const dataa = yield services_1.randomService.findRandom({ randomId });
        const data = { _id: dataa._id, title: dataa.title, photo: dataa.photo[0] };
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: "랜덤 키핀 조회 성공",
            data
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
exports.default = {
    getRandom
};
//# sourceMappingURL=random.js.map