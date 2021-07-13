import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { userService, keepinService, reminderService, friendService } from '../services';
import returnCode from '../library/returnCode';

/**
 * @api {delete} /setting/withdrawal 계정삭제
 *
 * @apiVersion 1.0.0
 * @apiName withdrawal
 * @apiGroup Setting
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json"
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 *
 * @apiSuccess {String} jwt
 *
 * @apiSuccessExample {json} Success-Response:
 * 200 OK
 * {
 *  "status": 200,
 *  "message": "회원탈퇴 성공"
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

//계정삭제
const withdraw = async (req, res) => {
  const userIdx = req._id;
  try {
    // 유저에서 유저 지우기
    const user = await userService.deleteUser({ userIdx });
    if (!user) {
      res.status(400).json({
        status: returnCode.BAD_REQUEST,
        message: '유저가 없습니다',
      });
    }
    // 키핀 지우기
    await keepinService.deleteUserData({ userIdx });
    // 리마인더 지우기
    await reminderService.deleteUserData({ userIdx });
    // 친구 지우기
    await friendService.deleteUserData({ userIdx });

    res.status(200).json({
      status: returnCode.OK,
      message: '회원탈퇴 성공',
    });
  } catch (err) {
    res.status(500).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

export default {
  withdraw,
};
