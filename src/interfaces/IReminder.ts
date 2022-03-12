import mongoose from 'mongoose';
export interface IReminder {
  title: string;
  date: string;
  sendDate: string;
  alarm: boolean;
  important: boolean;
  daysAgo: string;
  alarmTime: string;
  userIdx: mongoose.Types.ObjectId;
  fcm: string;
}
