import mongoose from "mongoose";
import {IJoin} from "../interfaces/IJoin";

const JoinSchema = new mongoose.Schema({
    keepinIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "Keepin", 
      },
    friendIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "Friend", 
      },
  });
  

  export default mongoose.model<IJoin & mongoose.Document>("Join", JoinSchema);