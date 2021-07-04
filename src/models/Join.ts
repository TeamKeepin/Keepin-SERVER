import mongoose from "mongoose";
import {IJoin} from "../interfaces/IJoin";

const JoinSchema = new mongoose.Schema({
    keepinIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "Keepin", 
        required: true,
      },
    friendIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "Friend", 
        required: true,
      },
  });
  

  export default mongoose.model<IJoin & mongoose.Document>("Join", JoinSchema);