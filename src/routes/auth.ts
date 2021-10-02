import express from 'express';
import { authController } from '../controllers';
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const router = express();

// 리프레쉬 토큰 발급
router.get('/', authController.reToken);

// health check용 url
router.get('/healthcheck', authController.healthcheck);

// 클라이언트 카카오 로그인 요청
//router.post('/kakao', authController.kakao);

router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/auth');
  }
);

export default router;
