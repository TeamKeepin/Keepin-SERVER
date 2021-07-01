import mongoose from "mongoose";
export interface IJoin {
    keepinIdx: mongoose.Types.ObjectId;
    friendIdx: mongoose.Types.ObjectId;
}