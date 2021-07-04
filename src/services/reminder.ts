import Reminder from "../models/Reminder"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface reminderCreateInput {
    title: string,
    date: string,
    sendDate: string,
    isAlarm: boolean,
    isImportant: boolean,
    userIdx: string,
    year: string,
    month: string
}

export interface reminderFindInput {
  userIdx: string
}
export interface reminderMonthFindInput {
  userIdx: string,
  month: string
}
export interface reminderFindInputByReminderId {
  _id: string
}

const saveReminder = (data: reminderCreateInput) => {
  return Reminder.create(data);
}

const findReminder = (data: reminderFindInput) => {
  const result = Reminder.find({
    userIdx: data.userIdx,
  }).sort({ date: 1 }); //가까운 순으로 정렬
  return result;
}

const findMonthReminder = (data: reminderMonthFindInput) => {
  const result = Reminder.find({
    userIdx: data.userIdx, 
    month: data.month}).sort({ date: 1 }); //가까운 순으로 정렬
  return result;
}

const findReminderLimitTwo = (data: reminderFindInput) => {
  const result = Reminder.find({
    userIdx: data.userIdx,
  }).sort({ date: 1 }).limit(2); //가까운 순으로 정렬, 2개만 나오게
  return result;
}

const deleteReminderbyReminderId = (data: reminderFindInputByReminderId) => {
return Reminder.deleteOne({_id:data._id});
}

export default {
  saveReminder,
  findReminder,
  findMonthReminder,
  findReminderLimitTwo,
  deleteReminderbyReminderId
}