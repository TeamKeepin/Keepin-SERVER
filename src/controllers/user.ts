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
    const { name, birth, id, password, token } = req.body;
    // 파라미터 확인
    if (!id || !password || !name || !birth || !token) {
        res.status(400).json({
            msg: '필수 정보를 입력하세요.'
        });
        return;
      }
  
    try {
        // 1. 유저가 중복일 경우
        let user = await User.findOne({ id });
        if(user) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                errors: [{ msg: "User already exists" }],
            });

        }
        
        user = new User({
            id,
            password,
            name,
            birth,
            token
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await userService.saveUser({ id, password, name, birth, token });

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
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
    const { id, password } = req.body;
    try {
        let user = await userService.findUser({id});
        if(!user) {
            res.status(400).json({
                errors: [{ msg: "Invalid Credentials" }],
              });
        }

        // Encrpyt password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({
                errors: [{ msg: "Invalid Credentials" }],
            })
        }

        // Return jsonwebtoken
        const payload = {
            user: {
            id: user.id,
            },
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

export default {
    signUp,
    signIn
}