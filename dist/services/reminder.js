"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reminder_1 = __importDefault(require("../models/Reminder"));
const mongoose_1 = __importDefault(require("mongoose"));
const saveReminderWithDaysAgo = (data) => {
    const result = Reminder_1.default.create(data);
    return result;
};
const saveReminder = (data) => {
    const result = Reminder_1.default.create(data);
    return result;
};
const findReminder = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
    }).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
    return result;
};
const findDetailReminder = (data) => {
    const result = Reminder_1.default.find({
        _id: data.reminderIdx,
    }, { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, daysAgo: 1, isPassed: 1 }).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
    return result;
};
const findMonthReminder = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
        year: data.year,
        month: data.month,
    }, { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, isPassed: 1 }).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
    return result;
};
const findYearReminder = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
        year: data.year,
    }, { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, month: 1, isPassed: 1 }).sort({ date: 1 }); //가까운 순으로 정렬
    return result;
};
// 다가오는 리마인더 조회
const findReminderOncoming = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
        date: { $gte: data.start },
    }, { _id: 1, title: 1, date: 1, year: 1, isImportant: 1, isPassed: 1 })
        .sort({ date: 1, createdAt: 1 })
        .limit(2); //가까운 순으로 정렬, 2개만 나오게
    return result;
};
//
const findReminderbyReminderId = (data) => {
    return Reminder_1.default.findOne({ _id: data.reminderIdx });
};
// 매일 00시에 지나거나 지나지 않은 리마인더를 구별해내기 위한, 서비스
const findAllReminder = () => {
    return Reminder_1.default.find({}, { _id: 1, title: 1, date: 1, year: 1, isImportant: 1 });
};
// 지나지 않은 리마인더들을 받을 수 있음.
const findIsPassedReminder = () => {
    return Reminder_1.default.find({ isPassed: 0 }, { _id: 1, title: 1, date: 1, year: 1, isImportant: 1 });
};
// 특정 사용자의 지나지 않은 리마인더들을 받을 수 있음.
const findSpecificIsPassedReminder = (data) => {
    const filter = {
        userIdx: mongoose_1.default.Types.ObjectId(data.userIdx),
        isPassed: false
    };
    const result = Reminder_1.default.updateMany(filter, { $set: { fcm: data.phoneToken } }, { multi: true });
    return result;
};
// 리마인더 수정
const modifyReminderChangeIsNotPassed = (data) => {
    const result = Reminder_1.default.findOneAndUpdate({ _id: data.reminderIdx }, {
        isPassed: 0,
    });
    return result;
};
// 리마인더 수정
const modifyReminderChangeIsPassed = (data) => {
    const result = Reminder_1.default.findOneAndUpdate({ _id: data.reminderIdx }, {
        isPassed: 1,
    });
    return result;
};
// 리마인더 수정 -> 알람이 true일 때, with daysago
const modifyReminderWithDaysAgo = (data) => {
    const result = Reminder_1.default.findOneAndUpdate({ _id: data.reminderId }, {
        isAlarm: data.isAlarm,
        isImportant: data.isImportant,
        title: data.title,
        date: data.date,
        daysAgo: data.daysAgo,
        sendDate: data.sendDate,
        year: data.year,
        month: data.month,
        isPassed: data.isPassed,
    }, { new: true });
    return result;
};
// 리마인더 수정 -> 알람이 false일 때
const modifyReminder = (data) => {
    const result = Reminder_1.default.findOneAndUpdate({ _id: data.reminderId }, {
        isAlarm: data.isAlarm,
        isImportant: data.isImportant,
        title: data.title,
        date: data.date,
        sendDate: '0',
        year: data.year,
        month: data.month,
        isPassed: data.isPassed,
    }, { new: true });
    return result;
};
// 리마인더 알람만 수정.
const modifyReminderAlarm = (data) => {
    const result = Reminder_1.default.findOneAndUpdate({ _id: data.reminderId }, {
        isAlarm: data.isAlarm,
        sendDate: data.sendDate,
        daysAgo: data.daysAgo,
    }, { new: true });
    return result;
};
const deleteReminderbyReminderId = (data) => {
    return Reminder_1.default.deleteOne({ _id: data.reminderIdx });
};
const deleteUserData = (data) => {
    return Reminder_1.default.deleteMany({ userIdx: data.userIdx });
};
const findAlarmReminder = (data) => {
    return Reminder_1.default.find({ sendDate: data.today }, { title: 1, daysAgo: 1, fcm: 1, sendDate: 1 });
};
exports.default = {
    saveReminder,
    findReminder,
    findDetailReminder,
    findMonthReminder,
    findYearReminder,
    findReminderbyReminderId,
    findReminderOncoming,
    deleteReminderbyReminderId,
    saveReminderWithDaysAgo,
    deleteUserData,
    modifyReminder,
    modifyReminderWithDaysAgo,
    modifyReminderAlarm,
    findAlarmReminder,
    findAllReminder,
    modifyReminderChangeIsNotPassed,
    modifyReminderChangeIsPassed,
    findIsPassedReminder,
    findSpecificIsPassedReminder
};
//# sourceMappingURL=reminder.js.map