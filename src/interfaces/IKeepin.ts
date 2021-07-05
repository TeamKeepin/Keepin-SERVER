import mongoose from "mongoose";
export interface IKeepin {
    title: string;
    photo: string;
    taken: boolean;
    date: string;
    category: [String];
    record: string;
    userIdx: mongoose.Types.ObjectId;
}
