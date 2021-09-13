import Reminder from '../models/Reminder';
import mongoose from 'mongoose';

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface reminderCreateInputWithDaysAgo {
  title: string;
  date: string;
  sendDate: string;
  isAlarm: boolean;
  isImportant: boolean;
  userIdx: string;
  year: string;
  month: string;
  daysAgo: string;
  fcm: string;
  isPassed: boolean;
}

export interface reminderModifyInputWithDaysAgo {
  reminderId: string;
  title: string;
  date: string;
  sendDate: string;
  isAlarm: boolean;
  isImportant: boolean;
  daysAgo: string;
  year: string;
  month: string;
  isPassed: boolean;
}

export interface reminderModifyInput {
  reminderId: string;
  title: string;
  date: string;
  isAlarm: boolean;
  isImportant: boolean;
  year: string;
  month: string;
  isPassed: boolean;
}

export interface reminderModifyAlarmInput {
  reminderId: string;
  isAlarm: boolean;
  sendDate: string;
  daysAgo: string;
}

export interface reminderCreateInput {
  title: string;
  date: string;
  sendDate: string;
  isAlarm: boolean;
  isImportant: boolean;
  userIdx: string;
  year: string;
  month: string;
  fcm: string;
  isPassed: boolean;
}

export interface reminderFindInput {
  userIdx: string;
}

export interface reminderOncomingFindInput {
  userIdx: string;
  start: string; //시스템 시간 now() 이후.
}

export interface reminderMonthFindInput {
  userIdx: string;
  year: string;
  month: string;
}

export interface reminderYearFindInput {
  userIdx: string;
  year: string;
}

export interface reminderFindInputByReminderId {
  reminderIdx: string;
}

export interface reminderAlarmInput {
  today: string;
}

const saveReminderWithDaysAgo = (data: reminderCreateInputWithDaysAgo) => {
  const result = Reminder.create(data);
  return result;
};

const saveReminder = (data: reminderCreateInput) => {
  const result = Reminder.create(data);
  return result;
};

const findReminder = (data: reminderFindInput) => {
  const result = Reminder.find({
    userIdx: data.userIdx,
  }).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
  return result;
};

const findDetailReminder = (data: reminderFindInputByReminderId) => {
  const result = Reminder.find(
    {
      _id: data.reminderIdx,
    },
    { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, daysAgo: 1, isPassed: 1 }
  ).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
  return result;
};

const findMonthReminder = (data: reminderMonthFindInput) => {
  const result = Reminder.find(
    {
      userIdx: data.userIdx,
      year: data.year,
      month: data.month,
    },
    { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, isPassed: 1 }
  ).sort({ date: 1, createdAt: 1 }); //가까운 순으로 정렬
  return result;
};

const findYearReminder = (data: reminderYearFindInput) => {
  const result = Reminder.find(
    {
      userIdx: data.userIdx,
      year: data.year,
    },
    { _id: 1, title: 1, date: 1, isAlarm: 1, isImportant: 1, month: 1, isPassed: 1 }
  ).sort({ date: 1 }); //가까운 순으로 정렬
  return result;
};

// 다가오는 리마인더 조회
const findReminderOncoming = (data: reminderOncomingFindInput) => {
  const result = Reminder.find(
    {
      userIdx: data.userIdx,
      date: { $gte: data.start },
    },
    { _id: 1, title: 1, date: 1, year: 1, isImportant: 1, isPassed: 1 }
  )
    .sort({ date: 1, createdAt: 1 })
    .limit(2); //가까운 순으로 정렬, 2개만 나오게
  return result;
};

//
const findReminderbyReminderId = (data: reminderFindInputByReminderId) => {
  return Reminder.findOne({ _id: data.reminderIdx });
};

// 매일 00시에 지나거나 지나지 않은 리마인더를 구별해내기 위한, 서비스
const findAllReminder = () => {
  return Reminder.find({}, { _id: 1, title: 1, date: 1, year: 1, isImportant: 1 });
};

// 지나지 않은 리마인더들을 받을 수 있음.
const findIsPassedReminder = () => {
  return Reminder.find({ isPassed: 0 }, { _id: 1, title: 1, date: 1, year: 1, isImportant: 1 });
};

// 리마인더 수정
const modifyReminderChangeIsNotPassed = (data: reminderFindInputByReminderId) => {
  const result = Reminder.findOneAndUpdate(
    { _id: data.reminderIdx },
    {
      isPassed: 0,
    }
  );
  return result;
};

// 리마인더 수정
const modifyReminderChangeIsPassed = (data: reminderFindInputByReminderId) => {
  const result = Reminder.findOneAndUpdate(
    { _id: data.reminderIdx },
    {
      isPassed: 1,
    }
  );
  return result;
};

// 리마인더 수정 -> 알람이 true일 때, with daysago
const modifyReminderWithDaysAgo = (data: reminderModifyInputWithDaysAgo) => {
  const result = Reminder.findOneAndUpdate(
    { _id: data.reminderId },
    {
      isAlarm: data.isAlarm,
      isImportant: data.isImportant,
      title: data.title,
      date: data.date,
      daysAgo: data.daysAgo,
      sendDate: data.sendDate,
      year: data.year,
      month: data.month,
      isPassed: data.isPassed,
    },
    { new: true }
  );
  return result;
};

// 리마인더 수정 -> 알람이 false일 때
const modifyReminder = (data: reminderModifyInput) => {
  const result = Reminder.findOneAndUpdate(
    { _id: data.reminderId },
    {
      isAlarm: data.isAlarm,
      isImportant: data.isImportant,
      title: data.title,
      date: data.date,
      sendDate: '0',
      year: data.year,
      month: data.month,
      isPassed: data.isPassed,
    },
    { new: true }
  );
  return result;
};

// 리마인더 알람만 수정.
const modifyReminderAlarm = (data: reminderModifyAlarmInput) => {
  const result = Reminder.findOneAndUpdate(
    { _id: data.reminderId },
    {
      isAlarm: data.isAlarm,
      sendDate: data.sendDate,
    },
    { new: true }
  );
  return result;
};

const deleteReminderbyReminderId = (data: reminderFindInputByReminderId) => {
  return Reminder.deleteOne({ _id: data.reminderIdx });
};

const deleteUserData = (data: reminderFindInput) => {
  return Reminder.deleteMany({ userIdx: data.userIdx });
};

const findAlarmReminder = (data: reminderAlarmInput) => {
  return Reminder.find({ sendDate: data.today }, { title: 1, daysAgo: 1, fcm: 1 });
};

export default {
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
};
