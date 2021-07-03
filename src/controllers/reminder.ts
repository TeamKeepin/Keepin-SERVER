import { Request, Response } from "express";
import { check, validationResult } from "express-validator"
import { userService, reminderService } from "../services";
const moment = require('moment');
const returnCode = require('../library/returnCode');

// 입력값: title, date, sendDate(isAlarm이 1일 경우만 값 가져옴), isAlarm, isImportant
const createReminder = async (req, res) => {
    //const userEmail = req.email;
    const userIdx = req._id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            status: returnCode.BAD_REQUEST,
            errors: [{ msg: "요청바디가 없습니다." }],
        });
    }

    let { title, date, daysAgo, isAlarm, isImportant } = req.body;
    // 파라미터 확인
    if (!title || !date || isAlarm==undefined || isImportant==undefined) {
        console.log({title,date,isAlarm,isImportant});
        res.status(400).json({
            msg: '필수 정보를 입력하세요.'
        });
        return;
      }

    // important가 1일 경우: sendDate도 필수적으로 값을 받아야함
    if (isAlarm==true) {
        if(daysAgo == 0 || daysAgo == 1 || daysAgo == 2 || daysAgo == 7 ) {
            // realDate = date - daysAgo
            var realDate = moment(date).subtract(daysAgo, 'd').format('YYYYMMDD');

        } else {
            res.status(400).json({
                msg: 'daysAgo 값이 유효하지 않습니다.'
            });
            return;
        }
    }

    try {
          // for res
        const data = {
            _id: userIdx,
            title: title,
            date: date,
            sendDate: realDate,
            isAlarm: isAlarm,
            isImportant: isImportant,
        };
  
      await reminderService.saveReminder({  title, date, sendDate: realDate, isAlarm, isImportant, userIdx });
      return res.status(200).json({msg: '리마인더 생성 성공', data});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: err.message }],
        });
    }
}

const getAllReminder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({
            status: returnCode.BAD_REQUEST,
            errors: [{ msg: "요청바디가 없습니다." }],
        });
    }
    const { email, password } = req.body;
    try {
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: err.message }],
        });
    }
}

export default {
  createReminder,
  getAllReminder,
  // getMonthReminder,
  // deleteReminder
}