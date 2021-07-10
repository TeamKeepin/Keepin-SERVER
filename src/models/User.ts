import mongoose from "mongoose";
import {IUser} from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    birth: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    phoneToken: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
    }
  });
  
  export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);