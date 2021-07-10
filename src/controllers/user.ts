import { Request, Response } from "express";
import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config"
import { check, validationResult } from "express-validator"
import { userService } from "../services";
import { keepinService } from "../services";
import returnCode from "../library/returnCode";

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
 *  "name": "유키핀",
 *  "birth": "19970627",
 *  "phone": "01012345678",
 *    
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

/**
 * @api {post} /user/signin 로그인
 * 
 * @apiVersion 1.0.0
 * @apiName SignIn
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
 * }
 *
 * @apiSuccess {String} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "로그인 성공"   ,
 *  "data": {
 *    "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 *  }
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 아이디 확인
 * {
 *  "status": 400,
 *  "message": "유저가 없습니다."
 * }
 * 400 비밀번호 확인
 * {
 *  "status": 400,
 *  "message": "비밀번호가 일치하지 않습니다."
 * }
 */
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

        if(!user) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                message: "이메일/비밀번호를 다시 확인해주세요."
              });
        }
        // Encrpyt password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                message: "이메일/비밀번호를 다시 확인해주세요."
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

/**
 * @api {get} /my/profile 프로필 조회 
 * 
 * @apiVersion 1.0.0
 * @apiName getProfile
 * @apiGroup My 
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *   "status": 200,
 *   "msg": "프로필 조회 성공",
 *   "data": {
 *       "_id": "60e349893460ec398ea1dc45",
 *       "email": "fbduddn97@naver.com",
 *       "password": "$2a$10$svbqi40QZQcWkRc2Jx8clOcoY5Q/urnAvdfcr0eVnIKk6M8.R9iRm",
 *       "name": "yboy",
 *       "birth": "19970322",
 *       "phone": "01012345678"
 *   }
 *}
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
const getProfile = async(req,res) => {
    const userIdx = req._id;
    console.log(userIdx);
    try{
        const data = await userService.findUserProfile({userIdx});
        
        if(!data) {
            res.status(400).json({
                status: 400,
                message: "유저가 없습니다." 
              });
        }

        const year = data.birth.substring(0,4);
        const month = data.birth.substring(4,6);
        const day = data.birth.substring(6,8);
        const tunedBirth = year+'.'+month+'.'+day;
        data.birth=tunedBirth;
       
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

/**
 * @api {put} /my/profile 프로필 편집
 * 
 * @apiVersion 1.0.0
 * @apiName editProfile
 * @apiGroup My
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "name": "유키핀"
 * } 
 * @apiSuccessExample {json} Success-Response:
 * -201 OK
 *{
 *   "status": 201,
 *   "msg": "프로필 수정 성공",
 *}
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
const editProfile = async(req,res) => {
    const userIdx = req._id;
    const {name} = req.body;
    // console.log(req.body.name);
    try{
        const user = await userService.findUserbyIdx({userIdx});
        if(!user) {
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "유저가 없습니다." 
              });
        }
        user.name = name;
        await user.save();

        return res.status(200).json({
            status: returnCode.OK,
            message: '프로필 수정 성공'
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

/**
 * @api {put} /my/profile 비밀번호 수정
 * 
 * @apiVersion 1.0.0
 * @apiName editProfile
 * @apiGroup My 
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *  "currentPassword": "1234567",
 *  "newPassword": "123456"
 * }
 *  
 * @apiSuccessExample {json} Success-Response:
 * -201 OK
 *{
 *   "status": 201,
 *   "msg": "비밀번호 수정 성공",
 *}
 *  
 * @apiErrorExample Error-Response:
 * -400 유저 유무 확인 
 * {
 *  "status": 400,
 *  "message": "유저가 없습니다."
 * }
 * -400 비밀번호 확인 
 * {
 *  "status": 400,
 *  "message": "기존 비밀번호 일치하지 않습니다."
 * }
  * -400 변경할 비밀번호 자리수 확인 
 * {
 *  "status": 400,
 *  "message": "6자리 이상의 비밀번호로 설정해 주세요."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const editPassword = async(req,res) => {
    const userIdx = req._id;
    try{
        const user = await userService.findUserbyIdx({userIdx});
        const {currentPassword, newPassword} = req.body;

        if(!user) {
            return res.status(400).json({
                status: 400,
                message: "유저가 없습니다." 
              });
        }

        // Encrpyt password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if(!isMatch){
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "기존 비밀번호 일치하지 않습니다." 
              });
        }

        if(newPassword.length<6){
            return res.status(400).json({
                status: 400,
                message: "6자리 이상의 비밀번호로 설정해 주세요." 
              });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPwd = await bcrypt.hash(newPassword, salt);

        user.password = hashPwd;
        await user.save();
        
        return res.status(201).json({
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

/**
 * @api {get} /my 유저별 keepin 수 조회
 * 
 * @apiVersion 1.0.0
 * @apiName editProfile
 * @apiGroup My 
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTYyMjg4NywiZXhwIjoxNjI1NjU4ODg3fQ.fgXLnokOo1HhPSInL25m35Bx5tLSha7XeH1vWIQ2dmA"
 * }
 * x
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *   "status": 200,
 *   "msg": "키핀 수 조회 성공",
 *   "data": {
 *       "name": "유키핀",
 *       "total": 17,
 *       "taken": 16,
 *       "given": 1
 *   }
 *}
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
const getKeepinCount = async(req,res) => {
    const userIdx = req._id;
    try{
        const user = await userService.findUserbyIdx({userIdx});
        if(!user) {
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "유저가 없습니다." 
              });
        }
        const name = user.name;
        const myKeepins = await keepinService.findkeepinByUserIdx({userIdx});
        const total = myKeepins.length;
        let taken = 0;
        let given = 0; 
        for(const keepin of myKeepins){
            if(keepin.taken==false){
                given++;
            }else{
                taken++;
            }
        }
        const data = {name, total, taken, given};
        return res.status(200).json({
            status: returnCode.OK,
            message: 'keepin 수 조회 성공',
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