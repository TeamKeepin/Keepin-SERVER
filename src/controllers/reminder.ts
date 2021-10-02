import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { reminderService } from '../services';
import moment from 'moment';
import returnCode from '../library/returnCode';

/**
 * @api {post} /reminder 리마인더 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청
 * * isImportant : 중요 여부(true/false)
 * * daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전) -> String으로 요청
 * 
 * - 알람 받는 경우, daysAgo 값 요청
 * {
    "title": "아빠생일♥♥🍰",
    "date": "2021-08-22",
    "isAlarm": true,
    "daysAgo": "2",
    "isImportant": true
 * }
 * 
 * - 알람 받지 않는 경우
 * {
    "title": "여자친구 생일",
    "date": "2021-08-02",
    "isAlarm": false,
    "isImportant": false
 * }
 *
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 *{
    "status": 200,
    "message": "리마인더 생성 성공",
    "data": {
        "sendDate": "2021-08-20",
        "isAlarm": true,
        "isImportant": true,
        "_id": "60edbf347cd20b065409869b",
        "title": "아빠생일♥♥🍰",
        "date": "2021-08-22",
        "userIdx": "60ed9c404b360576d0805b7c",
        "year": "2021",
        "month": "08",
        "daysAgo": "2",
        "__v": 0
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(title, date, isAlarm, isImportant)를 입력하세요."
 * }
 * 
 * - 400 daysAgo이 없거나, 유효하지 않은 값 
 * {
    "status": 400,
    "message": "daysAgo 값(0,1,2,3,7)이 유효하지 않습니다."
 * }
 */
const createReminder = async (req, res) => {
  const userId = req._id;
  const fcm = req.fcm;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  let { title, date, daysAgo, isAlarm, isImportant } = req.body;
  // 파라미터 확인
  if (!title || !date || isAlarm == undefined || isImportant == undefined) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보(title, date, isAlarm, isImportant)를 입력하세요.',
    });
    return;
  }

  // date를 년과 월 분할
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  const customDate = year + month + day;

  // important가 1일 경우: sendDate도 필수적으로 값을 받아야함
  if (isAlarm == true) {
    if (daysAgo === '0' || daysAgo == '1' || daysAgo == '2' || daysAgo == '3' || daysAgo == '7') {
      // realDate = date - daysAgo
      var realDate = moment(customDate).subtract(daysAgo, 'd').format('YYYY-MM-DD');
    } else {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: 'daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.',
      });
      return;
    }
  }

  // 오늘 기준으로 지났는지 안지났는지, 체크하는 함수

  var today = moment().format('YYYY-MM-DD');

  if (date < today) {
    var ispassed = true;
  } else {
    var ispassed = false;
  }

  try {
    var result;
    if (isAlarm == false) {
      // alarm 안받을 거면, daysAgo 값은 없음.
      result = await reminderService.saveReminder({
        title,
        date,
        sendDate: realDate,
        isAlarm,
        isImportant,
        userIdx: userId,
        year,
        month,
        fcm,
        isPassed: ispassed,
      });
    } else {
      // alarm 받을 거면, daysAgo 값이 있음.
      result = await reminderService.saveReminderWithDaysAgo({
        title,
        date,
        sendDate: realDate,
        isAlarm,
        isImportant,
        userIdx: userId,
        year,
        month,
        daysAgo,
        fcm,
        isPassed: ispassed,
      });
    }

    // for res
    const data = result;

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 생성 성공', data });
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
 * @api {get} /reminder 리마인더 모든 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getDetailReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "리마인더 목록 조회 성공",
    "data": {
        "reminders": [
            {
                "sendDate": "2021-05-01",
                "isAlarm": true,
                "isImportant": false,
                "_id": "60edbaa0ce001e7a245596b7",
                "title": "오랜만에 챈니🧡 보는 날",
                "date": "2021-05-02",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "05",
                "daysAgo": "1",
                "__v": 0
            },
            {
                "sendDate": "0",
                "isAlarm": false,
                "isImportant": false,
                "_id": "60edbdf27cd20b065409868f",
                "title": "스승의날 (이채은교수님)",
                "date": "2021-05-15",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "05",
                "__v": 0
            },
            {
                "sendDate": "2021-06-20",
                "isAlarm": true,
                "isImportant": false,
                "_id": "60edbe167cd20b0654098691",
                "title": "유영우유 생일 🍰",
                "date": "2021-06-27",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "06",
                "daysAgo": "7",
                "__v": 0
            },
            {
                "sendDate": "0",
                "isAlarm": false,
                "isImportant": true,
                "_id": "60edbe5e7cd20b0654098693",
                "title": "아요 합숙 시작일🏠",
                "date": "2021-07-07",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "07",
                "__v": 0
            },
            {
                "sendDate": "2021-07-10",
                "isAlarm": true,
                "isImportant": false,
                "_id": "60edbed97cd20b0654098695",
                "title": "민지언니 결혼식 👰🏻",
                "date": "2021-07-10",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "07",
                "daysAgo": "0",
                "__v": 0
            },
            {
                "sendDate": "2021-07-26",
                "isAlarm": true,
                "isImportant": true,
                "_id": "60edbef67cd20b0654098697",
                "title": "서현생일 🍰",
                "date": "2021-07-29",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "07",
                "daysAgo": "3",
                "__v": 0
            },
            {
                "sendDate": "0",
                "isAlarm": false,
                "isImportant": true,
                "_id": "60edbf1a7cd20b0654098699",
                "title": "영민쓰 생일 🍰",
                "date": "2021-08-11",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "08",
                "__v": 0
            },
            {
                "sendDate": "2021-08-20",
                "isAlarm": true,
                "isImportant": true,
                "_id": "60edbf347cd20b065409869b",
                "title": "아빠생일♥♥🍰",
                "date": "2021-08-22",
                "userIdx": "60ed9c404b360576d0805b7c",
                "year": "2021",
                "month": "08",
                "daysAgo": "2",
                "__v": 0
            }
        ]
    }
 * }
 * 
 *
 */
// 리마인더 모든 목록 조회
const getAllReminder = async (req, res) => {
  const userId = req._id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  try {
    const resultArray = await reminderService.findReminder({ userIdx: userId });

    const data = { reminders: resultArray };
    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 목록 조회 성공', data });
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
 * @api {get} /reminder/detail/:reminderId 리마인더 상세 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getDetailReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/60e5bdc46c3cdb135f1da1dc
 * * reminderId : 리마인더 Id
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "리마인더 상세 조회 성공",
    "data": {
        "isAlarm": true,
        "isImportant": true,
        "_id": "60e651b32821d6242df8291a",
        "title": "더미데이터4",
        "date": "2021.05.01",
        "daysAgo": "2"
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "파라미터(reminderId)를 입력하세요."
 * }
 *
 */
// 리마인더 상세 조회
const getDetailReminder = async (req, res) => {
  const userId = req._id;
  const reminderId = req.params.reminderId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  if (!reminderId || reminderId == undefined) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '파라미터(reminderId)를 입력하세요.',
    });
  }

  try {
    const result = await reminderService.findDetailReminder({ reminderIdx: reminderId });

    // if (result.length == 0) {
    //   res.status(returnCode.BAD_REQUEST).json({
    //     status: returnCode.BAD_REQUEST,
    //     message: '등록된 리마인더가 없습니다.',
    //   });
    //   return;
    // }

    const year = result[0].date.substring(0, 4); //2021-05-01
    const month = result[0].date.substring(5, 7);
    const day = result[0].date.substring(8, 10);
    const date_day = year + '.' + month + '.' + day;
    result[0].date = date_day;
    const data = result[0];

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 상세 조회 성공', data });
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
 * @api {get} /reminder/year?year=2021 리마인더 연도별 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getYearReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/year?year=2021
 * * year : 조회 연도
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "연도별 목록 조회 성공",
    "data": {
        "reminders": [
            [],
            [],
            [],
            [],
            [
                {
                    "isAlarm": true,
                    "isImportant": false,
                    "isPassed": true,
                    "_id": "60f186490c589a08c05865f2",
                    "title": "챈니🧡 보는 날",
                    "date": "05.02",
                    "month": "05"
                },
                {
                    "isAlarm": false,
                    "isImportant": false,
                    "isPassed": true,
                    "_id": "60f1867d0c589a08c05865f4",
                    "title": "스승의 날 🎁",
                    "date": "05.15",
                    "month": "05"
                }
            ],
            [
                {
                    "isAlarm": true,
                    "isImportant": false,
                    "isPassed": true,
                    "_id": "60f186920c589a08c05865f6",
                    "title": "유영우유 생일 🍰",
                    "date": "06.27",
                    "month": "06"
                }
            ],
            [
                {
                    "isAlarm": false,
                    "isImportant": true,
                    "isPassed": true,
                    "_id": "60f186b00c589a08c05865f8",
                    "title": "아요 합숙 시작일🏠",
                    "date": "07.07",
                    "month": "07"
                },
                {
                    "isAlarm": false,
                    "isImportant": false,
                    "isPassed": true,
                    "_id": "60f186f70c589a08c05865fc",
                    "title": "민지 결혼식👰🏻",
                    "date": "07.17",
                    "month": "07"
                },
                {
                    "isAlarm": true,
                    "isImportant": true,
                    "isPassed": true,
                    "_id": "60f1871e0c589a08c05865fe",
                    "title": "서현 생일 🍰",
                    "date": "07.17",
                    "month": "07"
                },
                {
                    "isAlarm": true,
                    "isImportant": false,
                    "isPassed": true,
                    "_id": "60f25a066b1f1128386d77b4",
                    "title": "데모데이",
                    "date": "07.17",
                    "month": "07"
                }
            ],
            [
                {
                    "isAlarm": false,
                    "isImportant": true,
                    "isPassed": true,
                    "_id": "60f187550c589a08c0586601",
                    "title": "영민쓰 생일 🍰",
                    "date": "08.11",
                    "month": "08"
                },
                {
                    "isAlarm": true,
                    "isImportant": true,
                    "isPassed": true,
                    "_id": "60f187710c589a08c0586603",
                    "title": "아빠생일♥♥🍰",
                    "date": "08.22",
                    "month": "08"
                }
            ],
            [],
            [],
            [],
            []
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "쿼리(year)를 입력하세요."
 * }
 *
 * - 400 QUERY 형식이 맞지 않음
 * {
    "status": 400,
    "message": "쿼리(year) 형식을 맞춰주세요."
 * }
 */
// 리마인더 연도별 목록 조회
const getYearReminder = async (req, res) => {
  const userId = req._id;
  const year = req.query.year;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  if (year.length != 4) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '쿼리(year) 형식을 맞춰주세요.',
    });
  }

  if (!year) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '쿼리(year)를 입력하세요.',
    });
  }

  try {
    const resultArray = await reminderService.findYearReminder({ userIdx: userId, year: year });

    var reminders = [];

    var janArray = [];
    var febArray = [];
    var marArray = [];
    var aprArray = [];
    var mayArray = [];
    var junArray = [];
    var julArray = [];
    var augArray = [];
    var sepArray = [];
    var octArray = [];
    var novArray = [];
    var decArray = [];

    // date 형식 예쁘게 만들기
    for (var result of resultArray) {
      const month = result.date.substring(5, 7);
      const day = result.date.substring(8, 10);
      const date_day = month + '.' + day;
      result.date = date_day;

      switch (month) {
        case '01':
          janArray.push(result);
          break;
        case '02':
          febArray.push(result);
          break;
        case '03':
          marArray.push(result);
          break;
        case '04':
          aprArray.push(result);
          break;
        case '05':
          mayArray.push(result);
          break;
        case '06':
          junArray.push(result);
          break;
        case '07':
          julArray.push(result);
          break;
        case '08':
          augArray.push(result);
          break;
        case '09':
          sepArray.push(result);
          break;
        case '10':
          octArray.push(result);
          break;
        case '11':
          novArray.push(result);
          break;
        case '12':
          decArray.push(result);
          break;
        default:
          break;
      }
    }

    reminders.push(janArray);
    reminders.push(febArray);
    reminders.push(marArray);
    reminders.push(aprArray);
    reminders.push(mayArray);
    reminders.push(junArray);
    reminders.push(julArray);
    reminders.push(augArray);
    reminders.push(sepArray);
    reminders.push(octArray);
    reminders.push(novArray);
    reminders.push(decArray);

    const data = { reminders };

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '연도별 목록 조회 성공', data });
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
 * @api {get} /reminder/date?year=2021&month=05 리마인더 월별 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getMonthReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/date?year=2021&month=06
 * * year : 조회 연도
 * * month: 조회 달
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "월별 목록 조회 성공",
    "data": {
        "reminders": [
            {
                "isAlarm": false,
                "isImportant": true,
                "isPassed": true,
                "_id": "60f186b00c589a08c05865f8",
                "title": "아요 합숙 시작일🏠",
                "date": "07.07"
            },
            {
                "isAlarm": false,
                "isImportant": false,
                "isPassed": true,
                "_id": "60f186f70c589a08c05865fc",
                "title": "민지 결혼식👰🏻",
                "date": "07.17"
            },
            {
                "isAlarm": true,
                "isImportant": true,
                "isPassed": true,
                "_id": "60f1871e0c589a08c05865fe",
                "title": "서현 생일 🍰",
                "date": "07.17"
            },
            {
                "isAlarm": true,
                "isImportant": false,
                "isPassed": true,
                "_id": "60f25a066b1f1128386d77b4",
                "title": "데모데이",
                "date": "07.17"
            }
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "쿼리(year, month)를 입력하세요."
 * }
 *
 * - 400 QUERY 형식이 맞지 않음
 * {
    "status": 400,
    "message": "쿼리(year, month) 형식을 맞춰주세요."
 * }
 */
// 리마인더 월별 목록 조회
const getMonthReminder = async (req, res) => {
  const userId = req._id;
  const year = req.query.year; //
  const month = req.query.month;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  if (year.length != 4 || month.length != 2) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '파라미터(year, month) 형식을 맞춰주세요.',
    });
  }

  if (!year || !month) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '파라미터(year, month)를 입력하세요.',
    });
  }

  try {
    const resultArray = await reminderService.findMonthReminder({ userIdx: userId, year: year, month: month });

    // if (resultArray.length == 0) {
    //   res.status(returnCode.BAD_REQUEST).json({
    //     status: returnCode.BAD_REQUEST,
    //     message: '등록된 리마인더가 없습니다.',
    //   });
    //   return;
    // }

    var dataArray = [];

    // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
    for (var result of resultArray) {
      const month = result.date.substring(5, 7);
      const day = result.date.substring(8, 10);
      const date_day = month + '.' + day;
      result.date = date_day;
      dataArray.push(result);
    }

    const data = { reminders: dataArray };

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '월별 목록 조회 성공', data });
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
 * @api {get} /reminder/oncoming [홈화면] 다가오는 리마인더 2개 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getOncommingReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "다가오는 리마인더(2개) 목록 조회 성공",
    "data": {
        "reminders": [
            {
                "isImportant": true,
                "_id": "60edbef67cd20b0654098697",
                "title": "서현생일 🍰",
                "date": "07.29"
            },
            {
                "isImportant": true,
                "_id": "60edbf1a7cd20b0654098699",
                "title": "영민쓰 생일 🍰",
                "date": "08.11"
            }
        ]
    }
 * } 
 */
// 다가오는 리마인더, 가장 가까운 리마인더 2개만
const getOncomingReminder = async (req, res) => {
  const userId = req._id;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  try {
    const today = moment().format('YYYY-MM-DD');

    const resultArray = await reminderService.findReminderOncoming({ userIdx: userId, start: today });

    // if (resultArray.length == 0) {
    //   res.status(returnCode.BAD_REQUEST).json({
    //     status: returnCode.BAD_REQUEST,
    //     message: '다가오는 리마인더가 없습니다.',
    //   });
    //   return;
    // }

    var dataArray = [];

    // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
    for (var result of resultArray) {
      const month = result.date.substring(5, 7);
      const day = result.date.substring(8, 10);
      const date_day = month + '.' + day;
      result.date = date_day;
      dataArray.push(result);
    }

    const data = { reminders: dataArray };

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '다가오는 리마인더(2개) 목록 조회 성공', data });
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
 * @api {post} /reminder/delete 리마인더 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName deleteReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
    "reminderArray": ["60e322167887874ecccad066","60e3221f7887874ecccad06a"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
     "status": 200,
     "message": "리마인더 삭제 완료"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "reminderID Array 값이 없습니다."
 * }
 *
 */
// 리마인더 삭제 (파라미터: /:reminderArray)
const deleteReminder = async (req, res) => {
  const reminderIdArray = req.body.reminderArray; //배열로 reminderId 값들을 받음
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  if (!reminderIdArray || reminderIdArray.length == 0) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: 'reminderID Array 값이 없습니다.',
    });
  }

  // 해당 reminderId 값이 존재하는지 체크

  try {
    // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
    for (var reminderId of reminderIdArray) {
      await reminderService.deleteReminderbyReminderId({ reminderIdx: reminderId }); // reminderId 하나씩 삭제
    }

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 삭제 완료' });
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
 * @api {put} /reminder/modify/:reminderId 리마인더 수정
 * 
 * @apiVersion 1.0.0
 * @apiName modifyReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/modify/60e5bdc46c3cdb135f1da1dc
 * * reminderId : 리마인더 Id
 * 
 * 
 * * isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청
 * * isImportant : 중요 여부(true/false)
 * * daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전) -> String으로 요청
 * 
 * - 알람 받는 경우, daysAgo 값 요청
 * {
    "title": "아빠생일♥♥🍰",
    "date": "2021-08-22",
    "isAlarm": true,
    "daysAgo": "2",
    "isImportant": true
 * }
 * 
 * - 알람 받지 않는 경우
 * {
    "title": "여자친구 생일",
    "date": "2021-08-02",
    "isAlarm": false,
    "isImportant": false
 * }
 *
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "리마인더 수정 성공"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(title, date, isAlarm, isImportant)를 입력하세요."
 * }
 * 
 * - 400 daysAgo이 없거나, 유효하지 않은 값 
 * {
    "status": 400,
    "message": "daysAgo 값(0,1,2,3,7)이 유효하지 않습니다."
 * }
 */
const modifyReminder = async (req, res) => {
  const userId = req._id;
  const reminderId = req.params.reminderId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  let { title, date, daysAgo, isAlarm, isImportant } = req.body;
  // 파라미터 확인
  if (!title || !date || isAlarm == undefined || isImportant == undefined) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보(title, date, isAlarm, isImportant)를 입력하세요.',
    });
    return;
  }

  // date를 년과 월 분할
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  const customDate = year + month + day;

  // 시나리오1) 알람 안받겠다했었는데 알람 받겠다고 바꿀 경우, daysago값 받고, sendDate 계산 후 저장
  // 시나리오2) 알람 받겠다 했었는데 알람 안받겠다고 바꿀 경우, 그냥 저장. 대신 sendDate 값을 초기화 시켜야함.
  // 시나리오3) 시나리오 2 상황에서 다시 알람을 받겠다고 바꿀 경우, sendDate값은 다시 저장이 되야함.

  // important가 1일 경우: sendDate도 필수적으로 값을 받아야함
  if (isAlarm == true) {
    if (daysAgo === '0' || daysAgo == '1' || daysAgo == '2' || daysAgo == '3' || daysAgo == '7') {
      // realDate = date - daysAgo
      var realDate = moment(customDate).subtract(daysAgo, 'd').format('YYYY-MM-DD');
    } else {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: 'daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.',
      });
      return;
    }
  }

  var today = moment().format('YYYY-MM-DD');

  if (date < today) {
    var ispassed = true;
  } else {
    var ispassed = false;
  }

  try {
    var result;

    if (isAlarm == false) {
      realDate = '0';
      daysAgo = '0';
    }

    // alarm 받을 거면, daysAgo 값이 있음.
    result = await reminderService.modifyReminderWithDaysAgo({
      reminderId,
      title,
      date,
      sendDate: realDate,
      isAlarm,
      isImportant,
      daysAgo,
      year,
      month,
      isPassed: ispassed,
    });

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 수정 성공' });
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
 * @api {put} /reminder/modify/alarm/:reminderId 리마인더 알람 수정
 * 
 * @apiVersion 1.0.0
 * @apiName modifyReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/modify/alarm/60e5bdc46c3cdb135f1da1dc
 * * reminderId : 리마인더 Id
 * 
 * 
 * * isAlarm : 푸쉬알람 여부(true/false) -> true일 경우 리마인더 당일 알람.
 * 
 * - 알람 받는 경우
 * {
    "isAlarm": true
 * }

 * - 알람 받지 않는 경우
 * {
    "isAlarm": false
 * }
 *
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "리마인더 알람 수정 성공"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(isAlarm)를 입력하세요."
 * }
 * 
 */
const modifyReminderAlarm = async (req, res) => {
  const userId = req._id;
  const reminderId = req.params.reminderId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  let { isAlarm } = req.body;
  let daysAgo, sendDate;

  // 파라미터 확인
  if (isAlarm == undefined) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보(isAlarm)를 입력하세요.',
    });
    return;
  }

  try {
    let resultAlarm;
    let reminderDetail;

    if (isAlarm == true) {
      // 알람 설정을 하지 않았다가, 알람 설정을 할 때
      // ex) daysago 값을 0으로 맞춰놓고, senddate는 (리마인더의)당일 날짜로 변경할 것.
      // 서비스에 요청 보낼 때, daysago, senddate를 같이 보내서 수정해야 함.

      reminderDetail = await reminderService.findDetailReminder({
        reminderIdx: reminderId,
      });

      daysAgo = '0';

      // date는 2021-03-21
      // realDate = date - daysAgo
      var realDate = reminderDetail[0].date;

      console.log(realDate);

      resultAlarm = await reminderService.modifyReminderAlarm({
        reminderId,
        isAlarm,
        sendDate: realDate,
        daysAgo,
      });
    } else {
      // 알람 설정을 했다가, 알람 설정을 끌 때.
      // ex) 기존에 3일 전 알람 받기 설정을 해놨었을 것 -> daysago:3 , senddate: 3일전으로 설정되어 있음.
      // daysago 값을 0으로 맞춰놓고, senddate는 0으로 변경할 것.
      // 서비스에 요청 보낼 때, daysago, senddate를 같이 보내서 수정해야 함.
      daysAgo = '0';
      sendDate = '0';

      resultAlarm = await reminderService.modifyReminderAlarm({
        reminderId,
        isAlarm,
        sendDate,
        daysAgo,
      });
    }

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '리마인더 알람 수정 성공' });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

//SendDate 조회
const getSendDate = async (req, res) => {
  const today = moment().format('YYYY-MM-DD');
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  try {
    const resultArray = await reminderService.findAlarmReminder({ today });

    return res.status(returnCode.OK).json(resultArray);
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
  createReminder,
  getAllReminder,
  getDetailReminder,
  getYearReminder,
  getMonthReminder,
  getOncomingReminder,
  deleteReminder,
  modifyReminder,
  modifyReminderAlarm,
  getSendDate,
};
