import mongoose from "mongoose";
import {IUser} from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
  });
  
  export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);