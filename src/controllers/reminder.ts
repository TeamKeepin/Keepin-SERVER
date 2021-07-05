import { Request, Response } from "express";
import { check, validationResult } from "express-validator"
import { reminderService } from "../services";
const moment = require('moment');
const returnCode = require('../library/returnCode');

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청
 * * isImportant : 중요 여부(true/false)
 * * daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전)
 * 
 * - 알람 받는 경우, daysAgo 값 요청
 * {
    "title": "할아버지 생일",
    "date": "20210705",
    "isAlarm": true,
    "daysAgo": 2,
    "isImportant": false
 * }
 * 
 * - 알람 받지 않는 경우
 * {
    "title": "여자친구 생일",
    "date": "20210802",
    "isAlarm": false,
    "isImportant": false
 * }
 *
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "리마인더 생성 성공",
    "data": {
        "_id": "60e1d4070e50e39654b4bb5f",
        "title": "여자친구 생일",
        "date": "20210802",
        "isAlarm": false,
        "isImportant": true,
        "year": "2021",
        "month": "08"
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
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }

    let { title, date, daysAgo, isAlarm, isImportant } = req.body;
    // 파라미터 확인
    if (!title || !date || isAlarm==undefined || isImportant==undefined) {
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '필수 정보(title, date, isAlarm, isImportant)를 입력하세요.',
        });
        return;
      }

    // date를 년과 월 분할
    const year = date.substring(0,4);
    const month = date.substring(4,6);

    // important가 1일 경우: sendDate도 필수적으로 값을 받아야함
    if (isAlarm==true) {
        if(daysAgo == 0 || daysAgo == 1 || daysAgo == 2 || daysAgo == 3 ||daysAgo == 7 ) {
            // realDate = date - daysAgo
            var realDate = moment(date).subtract(daysAgo, 'd').format('YYYYMMDD');

        } else {
            res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST, 
                message: 'daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.'
            });
            return;
        }
    }

    try {
          // for res
        const data = {
            _id: userId,
            title: title,
            date: date,
            sendDate: realDate,
            isAlarm: isAlarm,
            isImportant: isImportant,
            year: year,
            month: month
        };
  
      await reminderService.saveReminder({  title, date, sendDate: realDate, isAlarm, isImportant, userIdx: userId, year, month });
      return res.status(returnCode.OK).json({status: returnCode.OK, message: '리마인더 생성 성공', data});

    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}


// 리마인더 모든 목록 조회
const getAllReminder = async (req, res) => {
    const userId = req._id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }

    try {
        const resultArray = await reminderService.findReminder({userIdx:userId});
        if(resultArray.length==0) {
            res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: '등록된 리마인더가 없습니다.',
            });
            return;
        }

        const data = {reminders:resultArray}; 
  
        
        return res.status(returnCode.OK).json({status: returnCode.OK, message: '리마인더 목록 조회 성공', data});

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
 * @api {get} /reminder/date/:year/:month 리마인더 월별 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getMonthReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /reminder/date/2021/06
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
                "isAlarm": true,
                "isImportant": true,
                "_id": "60e314a82175d36678ecb905",
                "title": "남자친구 생일",
                "date": "06.04"
            },
            {
                "isAlarm": false,
                "isImportant": false,
                "_id": "60e1d4230e50e39654b4bb62",
                "title": "할머니 생일",
                "date": "06.15"
            },
            {
                "isAlarm": false,
                "isImportant": false,
                "_id": "60e1d4310e50e39654b4bb64",
                "title": "엄마 생일",
                "date": "06.25"
            }
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "파라미터(year, month)를 입력하세요."
 * }
 *
 * - 400 파라미터 형식이 맞지 않음
 * {
    "status": 400,
    "message": "파라미터(year, month) 형식을 맞춰주세요."
 * }

 * - 400 등록된 리마인더가 없음
 * 
 * {
    "status": 400,
    "message": "등록된 리마인더가 없습니다."
 * }
 */
// 리마인더 월별 목록 조회
const getMonthReminder = async (req, res) => {
    const userId = req._id;
    const year = req.params.year;
    const month = req.params.month;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }

    if(year.length!=4 || month.length!=2){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '파라미터(year, month) 형식을 맞춰주세요.',
        });
    }

    if(!year || !month){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '파라미터(year, month)를 입력하세요.',
        });
    }

    try {
    
        const resultArray = await reminderService.findMonthReminder({userIdx:userId, year:year, month:month});

        if(resultArray.length==0) {
            res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: '등록된 리마인더가 없습니다.',
            });
            return;
        }

        var dataArray = [];

        // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
        for (var result of resultArray){ 
            const day = result.date.substring(6,8);
            const date_day = result.date.substring(4,6)+"."+day;
            result.date = date_day;
            dataArray.push(result);
        }

        const data = {reminders:dataArray}; 

        return res.status(returnCode.OK).json({status: returnCode.OK, message: '월별 목록 조회 성공', data});
        

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
 * @api {get} /reminder/oncoming [홈화면] 다가오는 리마인더 2개 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getOncommingReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
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
                "_id": "60e31f4c8f432a4ec071fce3",
                "title": "남자친구 생일",
                "date": "07.06"
            },
            {
                "isImportant": true,
                "_id": "60e30b950fea5314141f0608",
                "title": "여자친구 생일",
                "date": "08.02"
            }
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 다가오는 리마인더가 없음
 * 
 * {
    "status": 400,
    "message": "다가오는 리마인더가 없습니다."
 * }
 */
// 다가오는 리마인더, 가장 가까운 리마인더 2개만
const getOncommingReminder = async (req, res) => {
    const userId = req._id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }

    try {
        const today = moment().format('YYYYMMDD');
        const resultArray = await reminderService.findReminderOncoming({userIdx:userId, start:today});

        if(resultArray.length==0) {
            res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: '다가오는 리마인더가 없습니다.',
            });
            return;
        }

        var dataArray = [];

        // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
        for (var result of resultArray){ 
            const day = result.date.substring(6,8);
            const date_day = result.date.substring(4,6)+"."+day;
            result.date = date_day;
            dataArray.push(result);
        }

        const data = {reminders:dataArray}; 
  
      return res.status(returnCode.OK).json({status: returnCode.OK, message: '다가오는 리마인더(2개) 목록 조회 성공', data});

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
 * @api {delete} /reminder 리마인더 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName deleteReminder
 * @apiGroup Reminder
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
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

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }

    if(!reminderIdArray || reminderIdArray.length == 0){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: 'reminderID Array 값이 없습니다.',
        });
    }

    try {
        // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
        for (var reminderId of reminderIdArray){ 
            await reminderService.deleteReminderbyReminderId({_id: reminderId}); // reminderId 하나씩 삭제 
        }

        return res.status(returnCode.OK).json({status: returnCode.OK, message: '리마인더 삭제 완료' });

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
  createReminder,
  getAllReminder,
  getMonthReminder,
  getOncommingReminder,
  deleteReminder
};
