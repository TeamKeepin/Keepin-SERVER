"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
// const passport = require('passport');
// const KakaoStrategy = require('passport-kakao').Strategy;
const router = (0, express_1.default)();
// 리프레쉬 토큰 발급
router.get('/', controllers_1.authController.reToken);
// health check용 url
router.get('/healthcheck', controllers_1.authController.healthcheck);
// 클라이언트 카카오 로그인 요청
//router.post('/kakao', authController.kakao);
// router.get('/kakao', passport.authenticate('kakao'));
// router.get(
//   '/kakao/callback',
//   passport.authenticate('kakao', {
//     failureRedirect: '/',
//   }),
//   (req, res) => {
//     res.redirect('/auth');
//   }
// );
exports.default = router;
//# sourceMappingURL=auth.js.map