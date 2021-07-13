import { randomService } from '../services';
import returnCode from '../library/returnCode';

/**
 * @api {get} /random 랜덤키핀 조회
 *
 * @apiVersion 1.0.0
 * @apiName getRandom
 * @apiGroup Random
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "랜덤 키핀 조회 성공",
 *   "data": {
 *       "_id": "60e46b35c167c37c296bbf4f",
 *       "title": "햄버거 고마워",
 *       "photo": "ㄹㅇ나룬어룬ㅇㄹㅇㄴ"
 *   }
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */

const getRandom = async (req, res) => {
  const userIdx = req._id;
  try {
    const randoms = await randomService.findRandoms({ userIdx });
    const randomNumber = Math.floor(Math.random() * randoms.length);
    const randomId = randoms[randomNumber]._id;
    const dataa = await randomService.findRandom({ randomId });

    const data = { _id: dataa._id, title: dataa.title, photo: dataa.photo[0] };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '랜덤 키핀 조회 성공',
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

export default {
  getRandom,
};
