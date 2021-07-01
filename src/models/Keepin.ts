import mongoose from "mongoose";
import { IKeepin } from "../interfaces/IKeepin";

const KeepinSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true, //required는 필수여부, default는 기본값, unique는 고유여부  
  },
  title: { 
    type: String,
  },
  photo: { 
    type: String,
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
  category: { // 0~7
    type: Number,
  },
  record: {
    type: String,
    default: Date.now,
  },
  userIdx: {
    type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
    ref: "User", 
  },

});

export default mongoose.model<IKeepin & mongoose.Document>(
  "Keepin",
  KeepinSchema
);