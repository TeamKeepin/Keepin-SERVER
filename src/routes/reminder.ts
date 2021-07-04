import express from "express"
import {reminderController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express()

/* Reminder */

//리마인더 생성
router.post('/', auth.checkToken, reminderController.createReminder);

//리마인더 전체 목록 조회
router.get('/', auth.checkToken, reminderController.getAllReminder);

// 가장 가까운 2개 리마인더 조회
router.get('/latest', auth.checkToken, reminderController.getLatestReminder);

// 월별 목록 조회
router.get('/month/:month', auth.checkToken, reminderController.getMonthReminder);

// 선택된 리마인더 삭제
router.delete('/:reminderId', auth.checkToken, reminderController.deleteReminder);


export default router;

