import { Request, Response } from "express";
import { check, validationResult } from "express-validator"
import { userService, reminderService } from "../services";
const moment = require('moment');
const returnCode = require('../library/returnCode');

// 입력값: title, date, sendDate(isAlarm이 1일 경우만 값 가져옴), isAlarm, isImportant
const createReminder = async (req, res) => {
    const userId = req._id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            errors: [{ status: returnCode.BAD_REQUEST, message: "요청바디가 없습니다." }],
        });
    }

    let { title, date, daysAgo, isAlarm, isImportant } = req.body;
    // 파라미터 확인
    if (!title || !date || isAlarm==undefined || isImportant==undefined) {
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            message: '필수 정보를 입력하세요.'
        });
        return;
      }

    // date를 년과 월 분할
    const year = date.substring(0,4);
    const month = date.substring(4,6);

    // important가 1일 경우: sendDate도 필수적으로 값을 받아야함
    if (isAlarm==true) {
        if(daysAgo == 0 || daysAgo == 1 || daysAgo == 2 || daysAgo == 7 ) {
            // realDate = date - daysAgo
            var realDate = moment(date).subtract(daysAgo, 'd').format('YYYYMMDD');

        } else {
            res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST, message: 'daysAgo 값이 유효하지 않습니다.'
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
            errors: [{status: returnCode.BAD_REQUEST, message: "요청바디가 없습니다." }],
        });
    }

    try {
        const result = await reminderService.findReminder({userIdx:userId});
        const data = {result:result}; 
  
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

// 리마인더 월별 목록 조회
const getMonthReminder = async (req, res) => {
    const userId = req._id;
    const month = req.params.month;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            errors: [{status: returnCode.BAD_REQUEST, message: "요청바디가 없습니다." }],
        });
    }

    try {
        const result = await reminderService.findMonthReminder({userIdx:userId, month:month});
        const data = {result:result}; 
  
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

// 다가오는 리마인더, 가장 가까운 리마인더 2개만
const getLatestReminder = async (req, res) => {
    const userId = req._id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            errors: [{status: returnCode.BAD_REQUEST, message: "요청바디가 없습니다." }],
        });
    }

    try {
        const result = await reminderService.findReminderLimitTwo({userIdx:userId});
        const data = {result:result}; 
  
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


// 리마인더 삭제 (파라미터: /:reminderId
const deleteReminder = async (req, res) => {
    const reminderId = req.params.reminderId;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(returnCode.BAD_REQUEST).json({
            status: returnCode.BAD_REQUEST,
            errors: [{status: returnCode.BAD_REQUEST, message: "요청바디가 없습니다." }],
        });
    }

    try {
        await reminderService.deleteReminderbyReminderId({_id: reminderId});
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
  getLatestReminder,
  deleteReminder
};
