import { Request, Response } from "express";
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config"
import { check, validationResult } from "express-validator"
import { userService } from "../services";
const returnCode = require('../library/returnCode');


/**
 * @api {post} /user/signup 회원가입
 * 
 * @apiVersion 1.0.0
 * @apiName SignUp
 * @apiGroup User
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "keepin@gmail.com",
 *  "password": "1234abcd",
 *  // ...
 * }
 *
 * @apiSuccess {String} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "data": {
 *    "jwt":""
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 아이디 중복
 * {
 *  "status": 400,
 *  "message": "이미 사용 중인 아이디입니다."
 * }
 */

const signUp = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            status: returnCode.BAD_REQUEST,
            errors: [{ msg: "요청바디가 없습니다." }],
        });
    }
    const { name, birth, email, password, token, phone } = req.body;
    // 파라미터 확인
    if (!email || !password || !name || !birth || !token || !phone ) {
        res.status(400).json({
            msg: '필수 정보를 입력하세요.'
        });
        return;
      }
  
    try {
        // 1. 유저가 중복일 경우
        let user = await User.findOne({ email });
        if(user) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                errors: [{ msg: "User already exists" }],
            });

        }
        user = new User({
            email,
            password,
            name,
            birth,
            token,
            phone
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(password, salt);
        await userService.saveUser({ email, password: hashPwd, name, birth, token, phone });

        //Return jsonwebtoken
        const payload = {
            email: email
        };
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, jwt) => {
                if(err) throw err;
                res.json({
                    jwt
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: err.message }],
        });
    }
}


const signIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({
            status: returnCode.BAD_REQUEST,
            errors: [{ msg: "요청바디가 없습니다." }],
        });
    }
    const { email, password } = req.body;
    try {
        let user = await userService.findUser({email});
        console.log(user)
        console.log(user._id)
        console.log(user.email)
        if(!user) {
            res.status(400).json({
                errors: [{ msg: "User data 없음" }],
              });
        }

        // Encrpyt password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({
                errors: [{ msg: "비밀번호 일치하지 않음" }],
            });
        }

        // Return jsonwebtoken
        const payload = {
            id: user._id,
            email: user.email
        };
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, jwt) => {
              if (err) throw err;
              res.json({ jwt });
            }
          );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

const getProfile = async(req,res) => {
    const userIdx = req._id;
    try{
        const data = await userService.findUserProfile({userIdx});

        return res.status(200).json({
            status: 200,
            msg: '프로필 조회 성공',
            data  //이름, 이메일, 비밀번호, 생일 
        });
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: err.message }],
        });
    }
}

export default {
    signUp,
    signIn,
    getProfile
}