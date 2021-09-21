import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { check, validationResult } from 'express-validator';
import { userService } from '../services';
import { keepinService } from '../services';
import returnCode from '../library/returnCode';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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
    "email": "android@naver.com",
    "password": "1234567",
    "name": "android",
    "birth": "1997-12-22",
    "phoneToken": "cvkmjS2aTkrdqHrguqdlO4:APA91bG5SOTKPBc_Z_EL5_aQdKlXPF1Y5-Ujvo8gFYVn3i8Q--rlFfrruIoc41qqy7NZcXcPUSXo7oGbhA8HtOpaabI8ISbhmHkWX0btVJVhFAJkHrbObkcTWJ829rT8juvTvBD-izZC" ,
    "phone": "010-1234-5678"
 * }
 *
 * @apiSuccess {String} jwt
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "회원가입 성공"
 * }
 *
 */
const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      errors: [{ msg: '요청바디가 없습니다.' }],
    });
  }
  const { name, birth, email, password, phoneToken, phone } = req.body;

  // 파라미터 확인
  if (!email || !password || !name || !birth || !phoneToken || !phone) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.',
    });
    return;
  }

  try {
    let user = new User({
      email,
      password,
      name,
      birth,
      phoneToken,
      phone,
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    await userService.saveUser({ email, password: hashPwd, name, birth, phoneToken, phone });

    res.json({
      status: returnCode.OK,
      message: '회원가입 성공',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
 *  "email": "android@naver.com",
 *  "password": "1234567",
 * }
 *
 * @apiSuccess {String} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
    "status": 200,
    "message": "로그인 성공",
    "data": {
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI",
        "name": "android"
    }
 * }
 *
 * @apiErrorExample Error-Response:
 * 
 * 400 이메일이 틀렸거나 비밀번호 틀릴 때
 * {
    "status": 400,
    "message": "이메일/비밀번호를 다시 확인해주세요."
 * }
 */
const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }
  const { email, password } = req.body;
  try {
    const user = await userService.findUser({ email });

    if (!user) {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '이메일/비밀번호를 다시 확인해주세요.',
      });
    }
    // Encrpyt password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '이메일/비밀번호를 다시 확인해주세요.',
      });
    }

    // Return jsonwebtoken
    const payload = {
      id: user._id,
      fcm: user.phoneToken,
    };

    const result = {
      accessToken: jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' }),
      refreshToken: jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' }),
    };

    // refreshToken을 DB에 저장
    const userInfo = await userService.saveRefreshToken({ id: payload.id, refreshToken: result.refreshToken });

    res.json({
      status: returnCode.OK,
      message: '로그인 성공',
      data: {
        jwt: result.accessToken,
        refreshToken: result.refreshToken,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {post} /user/email/check 이메일 중복 체크
 * 
 * @apiVersion 1.0.0
 * @apiName Emailcheck
 * @apiGroup User
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
    "email": "whatisthis@naver.com"
 * }
 *
 * @apiSuccess {String} message
 * 
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "이메일이 중복되지 않음"
 * }
 * 
 * @apiErrorExample Error-Response:
 * 400 이메일 중복
 * {
 *  "status": 400,
 *  "message": "이미 사용 중인 이메일입니다."
 * }
 */
const emailCheck = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      errors: [{ msg: '요청바디가 없습니다.' }],
    });
  }
  const { email } = req.body;

  // 파라미터 확인
  if (!email) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.',
    });
    return;
  }

  try {
    // 1. 유저가 중복일 경우
    const user = await userService.findUser({ email });
    if (user) {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '이미 사용 중인 이메일입니다.',
      });
      return;
    }

    res.json({
      status: returnCode.OK,
      message: '이메일이 중복되지 않음',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
    "status": 200,
    "message": "프로필 조회 성공",
    "data": {
        "email": "android@naver.com",
        "password": "$2a$10$9jnZL3niYDd5kk3TtoySBeA6dX7eKPv9CfcqViuYSU4ZmvxWJnpje",
        "name": "android",
        "birth": "1997.12.22",
        "phone": "010-1234-5678"
    }
 * }
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
const getProfile = async (req, res) => {
  const userIdx = req._id;

  try {
    const data = await userService.findUserProfile({ userIdx });

    if (!data) {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다.',
      });
    }

    const year = data.birth.substring(0, 4);
    const month = data.birth.substring(5, 7);
    const day = data.birth.substring(8, 10);
    const tunedBirth = year + '.' + month + '.' + day;
    data.birth = tunedBirth;

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '프로필 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
const editProfile = async (req, res) => {
  const userIdx = req._id;
  const { name } = req.body;
  try {
    const user = await userService.findUserbyIdx({ userIdx });
    if (!user) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다.',
      });
    }

    await userService.editUser({ userIdx, name });

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '프로필 수정 성공',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {put} /my/edit/password 비밀번호 수정
 *
 * @apiVersion 1.0.0
 * @apiName editPassword
 * @apiGroup My
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
 *   "status": 200,
 *   "message": "비밀번호 수정 성공",
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
const editPassword = async (req, res) => {
  const userIdx = req._id;
  try {
    const user = await userService.findUserbyIdx({ userIdx });
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다.',
      });
    }

    // Encrpyt password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '기존 비밀번호 일치하지 않습니다.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '6자리 이상의 비밀번호로 설정해 주세요.',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(newPassword, salt);

    await userService.editPassword({ userIdx, password: hashPwd });

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '비밀번호 수정 성공',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {post} /my/find/email 이메일 찾기
 *
 * @apiVersion 1.0.0
 * @apiName findEmail
 * @apiGroup My
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * @apiParamExample {json} Request-Example:
 * {
 *  "name": "iOS",
 *  "birth": "1997-12-22",
 *  "phone": "010-1234-5678"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *   "status": 200,
 *   "email" : "iOS@naver.com"
 *   "message": "이메일 찾기 성공"
 *}
 *
 * @apiErrorExample Error-Response:
 * -400 필수 정보 확인
 * {
 *  "status": 400,
 *  "message": "필수 정보를 입력하세요"
 * }
 * -400 이름 최대 5글자 확인
 * {
 *  "status": 400,
 *  "message": "이름은 최대 5자 까지 입력 가능합니다"
 * }
 * -400 이메일 유뮤 확인
 * {
 *  "status": 400,
 *  "message": "일치하는 이메일이 없습니다"
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const findEmail = async (req, res) => {
  const { name, birth, phone } = req.body;
  try {
    if (!name || !birth || !phone) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '필수 정보를 입력하세요',
      });
    }

    if (name.length > 5) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '이름은 최대 5자 까지 입력 가능합니다',
      });
    }

    // name, birth, Phone 일치 하는 것 찾고 email return
    const user = await userService.findUserEmail({ name, birth, phone });
    if (!user) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '일치하는 이메일이 없습니다',
      });
    }

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      email: user.email,
      message: '이메일 찾기 성공',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {post} /my/find/password 비밀번호 찾기
 *
 * @apiVersion 1.0.0
 * @apiName findPassword
 * @apiGroup My
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 * }
 * @apiParamExample {json} Request-Example:
 * {
 *  "email": "fuckOff@naver.com"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *   "status": 200,
 *   "message": "임시 비밀번호 전송 성공",
 *   "tempPassword": "a4059b8490eb3756f586"
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
const findPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userService.findUserbyEmail({ email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: '유저가 없습니다.',
      });
    }

    const tempPassword = crypto.randomBytes(10).toString('hex');

    const transporter = nodemailer.createTransport({
      // 사용하고자 하는 서비스, gmail계정으로 전송할 예정이기에 'gmail'
      service: 'gmail',
      // host를 gmail로 설정
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        // 이메일을 보낼 계정 데이터 입력
        user: 'officialkeepin@gmail.com',
        pass: config.keepinPassword,
      },
    });

    const emailOptions = {
      from: 'officialkeepin@gmail.com',
      to: email,
      subject: '[Keepin]임시 비밀번호 관련 이메일입니다.',
      html:
        '<h1 >Keepin에서 임시 비밀번호를 알려드립니다.</h1> <h2> password : ' +
        tempPassword +
        '</h2>' +
        '<img style="border: 1px solid black !important; " src="https://user-images.githubusercontent.com/37949197/125971169-54c2fa76-6519-44df-840a-9804f6a13063.png" width="600px" />',
    };
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });

    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(tempPassword, salt);
    user.password = hashPwd;
    user.save();

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '임시 비밀번호 전송 성공',
      tempPassword: tempPassword,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
const getKeepinCount = async (req, res) => {
  const userIdx = req._id;
  try {
    const user = await userService.findUserbyIdx({ userIdx });
    if (!user) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다.',
      });
    }
    const name = user.name;
    const myKeepins = await keepinService.findkeepinByUserIdx({ userIdx });
    const total = myKeepins.length;
    let taken = 0;
    let given = 0;
    for (const keepin of myKeepins) {
      if (keepin.taken == false) {
        given++;
      } else {
        taken++;
      }
    }
    const data = { name, total, taken, given };
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: 'keepin 수 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {put} /my/phone 전화번호 수정
 * @apiVersion 1.0.0
 * @apiName editPhone
 * @apiGroup My
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
 * "phone": "010-1234-1234"
 * }
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 * {
 *   "status": 200,
 *   "message": "전화번호 수정 성공"
 * }
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
const editPhone = async (req, res) => {
  const userIdx = req._id;
  const { phone } = req.body;

  try {
    const user = await userService.findUserbyIdx({ userIdx });
    if (!user) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다.',
      });
    }

    await userService.editPhone({ userIdx, phone });

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '전화번호 수정 성공',
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

export default {
  signUp,
  signIn,
  getProfile,
  editProfile,
  editPassword,
  editPhone,
  findPassword,
  findEmail,
  getKeepinCount,
  emailCheck,
};
