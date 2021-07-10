import mongoose from "mongoose";
export interface IKeepin {
    title: string;
    photo: [string];
    taken: boolean;
    date: string;
    category: [string];
    record: string;
    userIdx: mongoose.Types.ObjectId;
    friendIdx: [mongoose.Types.ObjectId];
}
