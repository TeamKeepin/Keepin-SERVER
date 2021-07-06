import mongoose from "mongoose";
export interface IFriend {
    name: string;
    memo: string;
    userIdx: mongoose.Types.ObjectId;
    keepinIdx: [mongoose.Types.ObjectId];
}