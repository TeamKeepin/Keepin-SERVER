import mongoose from "mongoose";
import { IKeepin } from "../interfaces/IKeepin";

const KeepinSchema = new mongoose.Schema({
  title: { 
    type: String,
  },
  photo: { 
    type: [String],
  },
  taken: { 
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
      type: String,
      required: true,
  },
  category: { // 생일, 기념일, 축하, 칭찬, 사이드 킥, 응원, 감사, 깜짝, 기타"
    type: [String],
  },
  record: {
    type: String,
    default: Date.now,
  },
  userIdx: {
    type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
    ref: "User", 
  },
  friendIdx: [{
    type: mongoose.SchemaTypes.ObjectId, 
    ref: "Friend", 
  }]


});

export default mongoose.model<IKeepin & mongoose.Document>(
  "Keepin",
  KeepinSchema
);