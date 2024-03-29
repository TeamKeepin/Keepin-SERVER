import express from 'express';
import { reminderController } from '../controllers';
import { check } from 'express-validator';
import auth from '../middlewares/auth';
const router = express();

/* Reminder */

//리마인더 생성
router.post('/', auth.checkToken, reminderController.createReminder);

//리마인더 전체 목록 조회
router.get('/', auth.checkToken, reminderController.getAllReminder);

// 연도별 목록 조회
router.get('/year', auth.checkToken, reminderController.getYearReminder);

// 월별 목록 조회
router.get('/date', auth.checkToken, reminderController.getMonthReminder);

// 가장 가까운 2개 리마인더 조회
router.get('/oncoming', auth.checkToken, reminderController.getOncomingReminder);

//리마인더 상세 조회
router.get('/detail/:reminderId', auth.checkToken, reminderController.getDetailReminder);

// 선택된 리마인더 삭제(1개 or 복수개 선택 가능)
router.post('/delete', auth.checkToken, reminderController.deleteReminder);

// 리마인더 수정
router.put('/modify/:reminderId', auth.checkToken, reminderController.modifyReminder);

// 리마인더 알람 수정
router.put('/modify/alarm/:reminderId', auth.checkToken, reminderController.modifyReminderAlarm);

//sendDate가 오늘인 것 조회
router.get('/sendDate', reminderController.getSendDate);

export default router;
