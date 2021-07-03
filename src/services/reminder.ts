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
    _id: string
}

const saveReminder = (data: reminderCreateInput) => {
    // console.log(data);
    return Reminder.create( data );
}

const findReminder = (data: reminderFindInput) => {
  // const num = Reminder.findOne({email:data.email});
  // // console.log(num);
  // return num
}

export default {
  saveReminder,
  findReminder
}