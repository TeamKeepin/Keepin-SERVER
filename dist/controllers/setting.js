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
 * @api {delete} /setting/withdrawal 계정삭제
 *
 * @apiVersion 1.0.0
 * @apiName withdrawal
 * @apiGroup Setting
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 *
 * @apiSuccess {String} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "회원탈퇴 성공"
 * }
 *
 * @apiErrorExample Error-Response:
 * -400 유저 유무 확인
 * {
 *  "status": 400,
 *  "message": "유저가 없습니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
//계정삭제
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    try {
        // 유저에서 유저 지우기
        const user = yield services_1.userService.deleteUser({ userIdx });
        if (!user) {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '유저가 없습니다',
            });
        }
        // 키핀 지우기
        yield services_1.keepinService.deleteUserData({ userIdx });
        // 리마인더 지우기
        yield services_1.reminderService.deleteUserData({ userIdx });
        // 친구 지우기
        yield services_1.friendService.deleteUserData({ userIdx });
        res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '회원탈퇴 성공',
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
exports.default = {
    withdraw,
};
//# sourceMappingURL=setting.js.map