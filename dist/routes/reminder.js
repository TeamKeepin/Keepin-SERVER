"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.default)();
/* Reminder */
//리마인더 생성
router.post('/', auth_1.default.checkToken, controllers_1.reminderController.createReminder);
//리마인더 전체 목록 조회
router.get('/', auth_1.default.checkToken, controllers_1.reminderController.getAllReminder);
// 연도별 목록 조회
router.get('/year', auth_1.default.checkToken, controllers_1.reminderController.getYearReminder);
// 월별 목록 조회
router.get('/date', auth_1.default.checkToken, controllers_1.reminderController.getMonthReminder);
// 가장 가까운 2개 리마인더 조회
router.get('/oncoming', auth_1.default.checkToken, controllers_1.reminderController.getOncomingReminder);
//리마인더 상세 조회
router.get('/detail/:reminderId', auth_1.default.checkToken, controllers_1.reminderController.getDetailReminder);
// 선택된 리마인더 삭제(1개 or 복수개 선택 가능)
router.post('/delete', auth_1.default.checkToken, controllers_1.reminderController.deleteReminder);
// 리마인더 수정
router.put('/modify/:reminderId', auth_1.default.checkToken, controllers_1.reminderController.modifyReminder);
// 리마인더 알람 수정
router.put('/modify/alarm/:reminderId', auth_1.default.checkToken, controllers_1.reminderController.modifyReminderAlarm);
//sendDate가 오늘인 것 조회
router.get('/sendDate', controllers_1.reminderController.getSendDate);
exports.default = router;
//# sourceMappingURL=reminder.js.map