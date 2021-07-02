import mongoose from "mongoose";
export interface IReminder {
    title: string;
    date: string;
    sendDate: string;
    alarm: boolean;
    important: boolean;
    userIdx: mongoose.Types.ObjectId;
} 