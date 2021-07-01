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
      unique: true,
    },
    sendDate: {
      type: String,
    },
    alarm: {
        type: Boolean,
        default: 0,
    },
    important: {
        type: Boolean,
        default: 0,
    },
    userIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "User", 
        required: true,
      },
  });
  
  export default mongoose.model<IReminder & mongoose.Document>("Reminder", ReminderSchema);