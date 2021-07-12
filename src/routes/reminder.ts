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

// 월별 목록 조회
router.get('/date', auth.checkToken, reminderController.getMonthReminder);

// 가장 가까운 2개 리마인더 조회
router.get('/oncoming', auth.checkToken, reminderController.getOncomingReminder);

//리마인더 상세 조회
router.get('/detail/:reminderId', auth.checkToken, reminderController.getDetailReminder);

// 선택된 리마인더 삭제(1개 or 복수개 선택 가능)
router.delete('/', auth.checkToken, reminderController.deleteReminder);

export default router;
