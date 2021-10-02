// token check middleware
import jwt from 'jsonwebtoken';
import config from '../config';
import returnCode from '../library/returnCode';
import { userService } from '../services';

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
  checkToken: async (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('jwt');
      // Check if not token
      if (!token) {
        return res.status(401).json({
          status: returnCode.UNAUTHORIZED,
          message: '토큰이 없습니다.',
        });
      }

      // Verify token
      const user = await jwt.verify(token, config.jwtSecret);
      const userIdx = user.id;
      const fcm = user.fcm;

      if (!userIdx) {
        return res.status(401).json({
          status: returnCode.UNAUTHORIZED,
          message: '유효하지 않은 토큰입니다.',
        });
      } else {
        req._id = userIdx;
        req.decode = user;
        req.fcm = fcm;
        next();
      }
    } catch (err) {
      if (err.message === 'jwt expired') {
        return res.status(401).json({
          status: returnCode.UNAUTHORIZED,
          message: '만료된 토큰입니다.',
        });
      } else if (err.message === 'invalid token') {
        return res.status(401).json({
          status: returnCode.UNAUTHORIZED,
          message: '유효하지 않은 토큰입니다.',
        });
      } else {
        return res.status(401).json({
          status: returnCode.UNAUTHORIZED,
          message: '유효하지 않은 토큰입니다.',
        });
      }
    }
  },

  refresh: async (refreshToken) => {
    try {
      const result = await jwt.verify(refreshToken, config.jwtSecret);

      if (result.id === undefined) {
        return TOKEN_INVALID;
      }

      const user = await userService.findUserbyIdx({ userIdx: result.id });
      if (refreshToken !== user.refreshToken) {
        return TOKEN_INVALID;
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      return jwt.sign(payload, config.jwtSecret);
    } catch (err) {
      if (err.message === 'jwt expired') {
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        return TOKEN_INVALID;
      }
    }
  },
};
