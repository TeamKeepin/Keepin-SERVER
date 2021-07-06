import mongoose from "mongoose";
import {IReminder} from "../interfaces/IReminder";

const ReminderSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    sendDate: {
      type: String,
      default: 0
    },
    isAlarm: {
        type: Boolean,
        default: 0,
    },
    isImportant: {
        type: Boolean,
        default: 0,
    },
    userIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "User", 
        required: true,
      },
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
  },
  });
  
  export default mongoose.model<IReminder & mongoose.Document>("Reminder", ReminderSchema);