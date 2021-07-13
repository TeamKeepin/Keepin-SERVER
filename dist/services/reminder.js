"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reminder_1 = __importDefault(require("../models/Reminder"));
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
    }).sort({ date: 1 }); //가까운 순으로 정렬
    return result;
};
const findDetailReminder = (data) => {
    const result = Reminder_1.default.find({
        _id: data.reminderIdx,
    }, { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, daysAgo: 1 }).sort({ date: 1 }); //가까운 순으로 정렬
    return result;
};
const findMonthReminder = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
        year: data.year,
        month: data.month,
    }, { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1 }).sort({ date: 1 }); //가까운 순으로 정렬
    return result;
};
// 다가오는 리마인더 조회
const findReminderOncoming = (data) => {
    const result = Reminder_1.default.find({
        userIdx: data.userIdx,
        date: { $gte: data.start },
    }, { _id: 1, title: 1, date: 1, isImportant: 1 })
        .sort({ date: 1 })
        .limit(2); //가까운 순으로 정렬, 2개만 나오게
    return result;
};
const findReminderbyReminderId = (data) => {
    return Reminder_1.default.findOne({ _id: data.reminderIdx });
};
const deleteReminderbyReminderId = (data) => {
    return Reminder_1.default.deleteOne({ _id: data.reminderIdx });
};
exports.default = {
    saveReminder,
    findReminder,
    findDetailReminder,
    findMonthReminder,
    findReminderbyReminderId,
    findReminderOncoming,
    deleteReminderbyReminderId,
    saveReminderWithDaysAgo,
};
//# sourceMappingURL=reminder.js.map