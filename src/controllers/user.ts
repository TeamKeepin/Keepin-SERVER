import { Request, Response } from "express";
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config"
import { check, validationResult } from "express-validator"
import { userService } from "../services";
const returnCode = require('../library/returnCode');


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
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message
        });
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
        console.log(user)
        console.log(user._id)
        console.log(user.email)
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
        res.status(500).send("Server Error");
    }
}

export default {
    signUp,
    signIn
}