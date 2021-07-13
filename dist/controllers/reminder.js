"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const services_1 = require("../services");
const moment_1 = __importDefault(require("moment"));
const returnCode_1 = __importDefault(require("../library/returnCode"));
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
    "date": "2021-07-05",
    "isAlarm": true,
    "daysAgo": 2,
    "isImportant": false
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
    "message": "리마인더 생성 성공",
    "data": {
        "sendDate": "2021-07-27",
        "isAlarm": true,
        "isImportant": true,
        "_id": "60ecef7de731197a10f19a65",
        "title": "더미데이터112222111",
        "date": "2021-08-03",
        "userIdx": "60e349893460ec398ea1dc45",
        "year": "2021",
        "month": "08",
        "daysAgo": "7",
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
const createReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    let { title, date, daysAgo, isAlarm, isImportant } = req.body;
    // 파라미터 확인
    if (!title || !date || isAlarm == undefined || isImportant == undefined) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
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
        if (daysAgo == 0 || daysAgo == 1 || daysAgo == 2 || daysAgo == 3 || daysAgo == 7) {
            // realDate = date - daysAgo
            var realDate = moment_1.default(customDate).subtract(daysAgo, 'd').format('YYYY-MM-DD');
        }
        else {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: 'daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.',
            });
            return;
        }
    }
    try {
        var result;
        if (!isAlarm) {
            // alarm 안받을 거면, daysAgo 값은 없음.
            result = yield services_1.reminderService.saveReminder({ title, date, sendDate: realDate, isAlarm, isImportant, userIdx: userId, year, month });
        }
        else {
            // alarm 받을 거면, daysAgo 값이 있음.
            result = yield services_1.reminderService.saveReminderWithDaysAgo({
                title,
                date,
                sendDate: realDate,
                isAlarm,
                isImportant,
                userIdx: userId,
                year,
                month,
                daysAgo,
            });
        }
        // for res
        const data = result;
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '리마인더 생성 성공', data });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
// 리마인더 모든 목록 조회
const getAllReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    try {
        const resultArray = yield services_1.reminderService.findReminder({ userIdx: userId });
        if (resultArray.length == 0) {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '등록된 리마인더가 없습니다.',
            });
            return;
        }
        const data = { reminders: resultArray };
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '리마인더 목록 조회 성공', data });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
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
 * - 400 등록된 리마인더가 없음
 *
 * {
    "status": 400,
    "message": "등록된 리마인더가 없습니다."
 * }
 */
// 리마인더 상세 조회
const getDetailReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    const reminderId = req.params.reminderId;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    if (!reminderId || reminderId == undefined) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '파라미터(reminderId)를 입력하세요.',
        });
    }
    try {
        const result = yield services_1.reminderService.findDetailReminder({ reminderIdx: reminderId });
        if (result.length == 0) {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '등록된 리마인더가 없습니다.',
            });
            return;
        }
        const year = result[0].date.substring(0, 4); //2021-05-01
        const month = result[0].date.substring(5, 7);
        const day = result[0].date.substring(8, 10);
        const date_day = year + '.' + month + '.' + day;
        result[0].date = date_day;
        const data = result[0];
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '리마인더 상세 조회 성공', data });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
    "message": "쿼리(year, month)를 입력하세요."
 * }
 *
 * - 400 파라미터 형식이 맞지 않음
 * {
    "status": 400,
    "message": "쿼리(year, month) 형식을 맞춰주세요."
 * }
 * - 400 등록된 리마인더가 없음
 *
 * {
    "status": 400,
    "message": "등록된 리마인더가 없습니다."
 * }
 */
// 리마인더 월별 목록 조회
const getMonthReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    const year = req.query.year; //
    const month = req.query.month;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    if (year.length != 4 || month.length != 2) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '파라미터(year, month) 형식을 맞춰주세요.',
        });
    }
    if (!year || !month) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '파라미터(year, month)를 입력하세요.',
        });
    }
    try {
        const resultArray = yield services_1.reminderService.findMonthReminder({ userIdx: userId, year: year, month: month });
        if (resultArray.length == 0) {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '등록된 리마인더가 없습니다.',
            });
            return;
        }
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
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '월별 목록 조회 성공', data });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
const getOncomingReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req._id;
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    try {
        const today = moment_1.default().format('YYYY-MM-DD');
        const resultArray = yield services_1.reminderService.findReminderOncoming({ userIdx: userId, start: today });
        if (resultArray.length == 0) {
            res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '다가오는 리마인더가 없습니다.',
            });
            return;
        }
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
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '다가오는 리마인더(2개) 목록 조회 성공', data });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
const deleteReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reminderIdArray = req.body.reminderArray; //배열로 reminderId 값들을 받음
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '요청바디가 없습니다.',
        });
    }
    if (!reminderIdArray || reminderIdArray.length == 0) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: 'reminderID Array 값이 없습니다.',
        });
    }
    // 해당 reminderId 값이 존재하는지 체크
    try {
        // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
        for (var reminderId of reminderIdArray) {
            yield services_1.reminderService.deleteReminderbyReminderId({ reminderIdx: reminderId }); // reminderId 하나씩 삭제
        }
        return res.status(returnCode_1.default.OK).json({ status: returnCode_1.default.OK, message: '리마인더 삭제 완료' });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
exports.default = {
    createReminder,
    getAllReminder,
    getDetailReminder,
    getMonthReminder,
    getOncomingReminder,
    deleteReminder,
};
//# sourceMappingURL=reminder.js.map