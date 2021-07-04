import Reminder from "../models/Reminder"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface reminderCreateInput {
    title: string,
    date: string,
    sendDate: string,
    isAlarm: boolean,
    isImportant: boolean,
    userIdx: string
}
export interface reminderFindInput {
  userIdx: string
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

export default {
  saveReminder,
  findReminder
}