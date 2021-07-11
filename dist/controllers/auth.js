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
const returnCode_1 = __importDefault(require("../library/returnCode"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
/**
 * @api {get} /retoken 토큰 재발급
 *
 * @apiVersion 1.0.0
 * @apiName retoken
 * @apiGroup token
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 * {
    "status": 200,
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTlhZTJmMjhjYjU1NTkyODQ4N2E3YiIsImVtYWlsIjoiaGVsbG9AbmF2ZXIuY29tIiwiaWF0IjoxNjI1OTMxMjMyfQ.pxjJ4ouhO02fBSZ1U6Rw_00CgDRQWoOBFy43EHRoO1o",
    "message": "새로운 토큰이 발급 성공"
 * }
 *
 * @apiErrorExample Error-Response:
 * -401 헤더 값 확인
 * {
 *  "status": 401,
 *  "message": "refreshToken header 값이 없습니다."
 * }
 * -401 토큰 만료
 * {
 *  "status": 401,
 *  "message": "만료된 토큰입니다. 새로운 토큰을 발급 요청해주세요."
 * }
 * -401 유효하지 않은 값
 * {
 *  "status": 401,
 *  "message": "유효하지 않은 토큰입니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const reToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.header("refreshToken");
        if (!refreshToken) {
            return res.status(401).json({
                status: returnCode_1.default.UNAUTHORIZED,
                message: 'refreshToken header 값이 없습니다.'
            });
        }
        const newToken = yield auth_1.default.refresh(refreshToken);
        if (newToken == TOKEN_EXPIRED) {
            return res.status(401).json({
                status: returnCode_1.default.UNAUTHORIZED,
                message: '만료된 토큰입니다.'
            });
        }
        if (newToken == TOKEN_INVALID) {
            return res.status(401).json({
                status: returnCode_1.default.UNAUTHORIZED,
                message: '유효하지 않은 토큰입니다.'
            });
        }
        res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            jwt: newToken,
            message: '새로운 토큰이 발급 성공'
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
    reToken
};
//# sourceMappingURL=auth.js.map