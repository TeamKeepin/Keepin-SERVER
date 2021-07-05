import mongoose from "mongoose";
import {IFriend} from "../interfaces/IFriend";

const FriendSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    memo: {
        type: String
    },
    userIdx: {
        type: mongoose.SchemaTypes.ObjectId,  //foreign key느낌 
        ref: "User", 
        required: true,
      },
    Keepins: [{
      keepin: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "Keepin", 
      }
    }]
  });
  
  export default mongoose.model<IFriend & mongoose.Document>("Friend", FriendSchema);