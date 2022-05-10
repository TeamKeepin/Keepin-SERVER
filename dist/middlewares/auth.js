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
// token check middleware
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
const services_1 = require("../services");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
exports.default = {
    checkToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Get token from header
            const token = req.header('jwt');
            // Check if not token
            if (!token) {
                return res.status(401).json({
                    status: returnCode_1.default.UNAUTHORIZED,
                    message: '토큰이 없습니다.',
                });
            }
            // Verify token
            const user = yield jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            const userIdx = user.id;
            const fcm = user.fcm;
            if (!userIdx) {
                return res.status(401).json({
                    status: returnCode_1.default.UNAUTHORIZED,
                    message: '유효하지 않은 토큰입니다.',
                });
            }
            else {
                req._id = userIdx;
                req.decode = user;
                req.fcm = fcm;
                next();
            }
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                return res.status(401).json({
                    status: returnCode_1.default.UNAUTHORIZED,
                    message: '만료된 토큰입니다.',
                });
            }
            else if (err.message === 'invalid token') {
                return res.status(401).json({
                    status: returnCode_1.default.UNAUTHORIZED,
                    message: '유효하지 않은 토큰입니다.',
                });
            }
            else {
                return res.status(401).json({
                    status: returnCode_1.default.UNAUTHORIZED,
                    message: '유효하지 않은 토큰입니다.',
                });
            }
        }
    }),
    refresh: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield jsonwebtoken_1.default.verify(refreshToken, config_1.default.jwtSecret);
            if (result.id === undefined) {
                return TOKEN_INVALID;
            }
            const user = yield services_1.userService.findUserbyIdx({ userIdx: result.id });
            if (refreshToken !== user.refreshToken) {
                return TOKEN_INVALID;
            }
            const payload = {
                id: user.id,
                email: user.email,
            };
            return jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret);
        }
        catch (err) {
            if (err.message === 'jwt expired') {
                return TOKEN_EXPIRED;
            }
            else if (err.message === 'invalid token') {
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            }
            else {
                return TOKEN_INVALID;
            }
        }
    }),
};
//# sourceMappingURL=auth.js.map