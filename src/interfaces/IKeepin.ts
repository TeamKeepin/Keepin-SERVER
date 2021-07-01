import mongoose from "mongoose";
export interface IKeepin {
    name: string;
    title: string;
    photo: string;
    taken: boolean;
    date: string;
    category: Number;
    record: string;
    userIdx: mongoose.Types.ObjectId;
}
