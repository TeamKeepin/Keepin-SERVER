// token check middleware
import jwt from "jsonwebtoken";
import config from "../config";
import { userService } from "../services";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
  checkToken: async (req, res, next) => {
    // Get token from header
    const token = req.header("jwt");
    // Check if not token
    if (!token) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }
  
    // Verify token
    const user = await jwt.verify(token, config.jwtSecret);
    console.log(user)
    if (user === TOKEN_EXPIRED) {
      return res.status(405).json({message: '만료된 토큰입니다.'});
    }
    if (user === TOKEN_INVALID) {
      return res.status(405).json({message: '유효하지 않은 토큰입니다.'});
    }

    const userEmail = user.email;
    const userIdx = user.id;
    
    if (!userEmail) {
      return res.status(405).json({
        message: '유효하지 않은 토큰입니다.(userEmail 값 확인)',
      });
    } else {
      req.email = userEmail;
      req._id = userIdx;
      req.decode = user;
      next();
    }
  },

  refresh: async (refreshToken) => {
    try {
        const result = await jwt.verify(refreshToken, config.jwtSecret);
        
        if (result.id === undefined) {
            return TOKEN_INVALID;
        }
   
        const user = await userService.findUserbyIdx({userIdx: result.id});
        if (refreshToken !== user.refreshToken) {
            console.log('invalid refresh token');
            return TOKEN_INVALID;
        }
        const payload = {
            id: user.id,
            email: user.email
        };
        const dto = {
            token: jwt.sign(payload, config.jwtSecret)
        };
        return dto;
    } catch (err) {
        if (err.message === 'jwt expired') {
            console.log('expired token');
            return TOKEN_EXPIRED;
        } else if (err.message === 'invalid token') {
            console.log('invalid token');
            console.log(TOKEN_INVALID);
            return TOKEN_INVALID;
        } else {
            console.log("invalid token");
            return TOKEN_INVALID;
      }
    }
  }

}