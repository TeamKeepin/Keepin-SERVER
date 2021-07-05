import { Request, Response } from "express";
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config"
import { check, validationResult } from "express-validator"
import { userService } from "../services";
import { keepinService } from "../services";
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
 *  "message":    ,
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
            status: returnCode.BAD_REQUEST,
            message: '필수 정보를 입력하세요.'
        });
        return;
      }
  
    try {
        // 1. 유저가 중복일 경우
        let user = await userService.findUser({email});
        if(user) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                msg: "유저가 이미 있습니다."
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
                    status: returnCode.OK,
                    message: "회원가입 성공",
                    data: {
                        "jwt": jwt
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}


const signIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({
            status: returnCode.BAD_REQUEST,
            message: "요청바디가 없습니다."
        });
    }
    const { email, password } = req.body;
    try {
        let user = await userService.findUser({email});
        // console.log(user)
        // console.log(user._id)
        // console.log(user.email)
        if(!user) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                message: "유저가 없습니다."
              });
        }

        // Encrpyt password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                message: "비밀번호가 일치하지 않습니다."
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
              res.json({
                status: returnCode.OK,
                message: "로그인 성공",
                data: {
                    "jwt": jwt
                }
            });
            }
          );
        } catch (err) {
            console.error(err.message);
            res.status(returnCode.INTERNAL_SERVER_ERROR).json({
                status: returnCode.INTERNAL_SERVER_ERROR,
                message: err.message,
            });
            return;
        }
}

//프로필 조회 
const getProfile = async(req,res) => {
    const userIdx = req._id;
    // console.log(userIdx);
    try{
        const data = await userService.findUserProfile({userIdx});

        // const users = await User.find();
        // console.log(users[1]);
        
        if(!data) {
            res.status(400).json({
                status: 400,
                message: "User data 없음" 
              });
        }
       
        return res.status(200).json({
            status: returnCode.OK,
            msg: '프로필 조회 성공',
            data  //이름, 이메일, 비밀번호, 생일 
        });
    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

const editProfile = async(req,res) => {
    const userIdx = req._id;
    const {name} = req.body;
    // console.log(req.body.name);
    try{
        const user = await userService.findUserbyIdx({userIdx});
        if(!user) {
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "User data 없음" 
              });
        }
        user.name = name;
        await user.save();

        return res.status(200).json({
            status: returnCode.OK,
            message: '이름수정 성공'
        });
    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

// 비밀번호 변경 
const editPassword = async(req,res) => {
    const userIdx = req._id;
    try{
        const user = await userService.findUserbyIdx({userIdx});
        const {currentPassword, newPassword} = req.body;

        if(!user) {
            return res.status(400).json({
                status: 400,
                message: "User data 없음" 
              });
        }

        // Encrpyt password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if(!isMatch){
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "기존 비밀번호 일치하지 않음" 
              });
        }

        if(newPassword.length<6){
            return res.status(400).json({
                status: 400,
                message: "6자리 이상의 비밀번호로 설정해 주세요" 
              });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(newPassword, salt);

        user.password = hashPwd;
        await user.save();
        
        return res.status(200).json({
            status: returnCode.OK,
            msg: '비밀번호 수정 성공'
        });
    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

//유저이름, 받은 선물 수, 준 선물 수 return 
const getKeepinCount = async(req,res) => {
    const userIdx = req._id;
    try{
        const user = await userService.findUserbyIdx({userIdx});
        if(!user) {
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "User data 없음" 
              });
        }
        const name = user.name;
        const {total, taken, given} = await keepinService.findKeepinCount(userIdx);
        // console.log(total);
        // console.log(taken);
        // console.log(given);
        const data = {name, total, taken, given};
        return res.status(200).json({
            status: returnCode.OK,
            message: '선물 수 조회 성공',
            data  
        });

    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

export default {
    signUp,
    signIn,
    getProfile,
    editProfile,
    editPassword,
    getKeepinCount
}