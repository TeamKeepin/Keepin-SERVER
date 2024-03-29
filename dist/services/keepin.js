"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Keepin_1 = __importDefault(require("../models/Keepin"));
const mongoose_1 = __importDefault(require("mongoose"));
//키핀하기 생성
const saveKeepin = (data) => {
    const keepin = Keepin_1.default.create(data);
    return keepin;
};
//키핀생성 1
const saveKeepinText = (data) => {
    const keepin = Keepin_1.default.create(data);
    return keepin;
};
//키핀생성 2
const saveKeepinPhoto = (data) => {
    return Keepin_1.default.findOneAndUpdate({ _id: data.keepinIdx }, { photo: data.photo }, { new: true });
};
//모아보기 받은/준
const findKeepin = (data) => {
    var convertDate;
    if (String(data.recent) === 'true') {
        convertDate = -1; //최신순
    }
    else {
        convertDate = 1; //오래된 순
    }
    const result = Keepin_1.default.find({ taken: data.taken }, { title: 1, photo: 1, taken: 1, date: 1 })
        .where('userIdx')
        .equals(data.userIdx)
        .sort({ date: convertDate,
        createdAt: convertDate });
    return result;
};
//모아보기 전체 키워드 검색
const searchKeepinByKeyword = (data) => {
    const result = Keepin_1.default.find({ title: { $regex: data.title } }, { title: 1, photo: 1, taken: 1, date: 1 })
        .where('userIdx')
        .equals(data.userIdx)
        .sort({ date: -1,
        createdAt: -1 });
    return result;
};
// 모아보기 카테고리 조회
const findkeepinByUserIdxAndCategory = (data) => {
    const result = Keepin_1.default.find({ category: { $in: [data.category] }, userIdx: data.userIdx }, { title: 1, photo: 1, date: 1 }).sort({
        date: -1,
        createdAt: -1
    });
    return result;
};
const findDetailKeepin = (data) => {
    const result = Keepin_1.default.findOne({ _id: data.keepinIdx })
        .where('userIdx')
        .equals(data.userIdx)
        .populate('friendIdx', ['name'])
        .sort({ date: -1,
        createdAt: -1 });
    return result;
};
const findkeepinByUserIdx = (data) => {
    const keepins = Keepin_1.default.find().where('userIdx').equals(data.userIdx);
    return keepins;
};
const findKeepinByKeepinIdx = (data) => {
    const keepin = Keepin_1.default.findOne({ _id: data.keepinIdx }).select('-__v -userIdx');
    return keepin;
};
const findKeepinForTaken = (data) => {
    const keepin = Keepin_1.default.findOne({ _id: data.keepinIdx }, { title: 1, photo: 1, date: 1, taken: 1 })
        .where('taken')
        .equals(data.taken)
        .sort({ date: -1, createdAt: -1 });
    return keepin;
};
//친구와 준/받은 keepin 목록 조회
const findKeepinsByFriendIdxAndTaken = (data) => {
    return Keepin_1.default.find({ friendIdx: { $in: [mongoose_1.default.Types.ObjectId(data.friendIdx)] } }, { title: 1, photo: 1, date: 1, taken: 1 })
        .where('taken').equals(data.taken)
        .sort({ date: -1,
        createdAt: -1 });
};
const findPhotosByKeepinIdx = (data) => {
    return Keepin_1.default.findOne({ _id: data.keepinIdx }, { photo: 1 });
};
// 키핀 수정
const modifyKeepinByKeepinIdx = (data) => {
    const keepins = Keepin_1.default.findOneAndUpdate({ _id: data.keepinIdx }, {
        title: data.title,
        photo: data.photo,
        taken: data.taken,
        date: data.date,
        category: data.category,
        record: data.record,
        friendIdx: data.friendIdx,
    }, { new: true });
    return keepins;
};
// 키핀 삭제
const deleteKeepinByKeepinIdx = (data) => {
    return Keepin_1.default.deleteOne({ _id: data.keepinIdx });
};
const findKeepinFriend = (data) => {
    // const result = Keepin.find({category: { "$in" : [data.category]}, userIdx: data.userIdx}, {title: 1, photo:1,  date:1}).sort({ date: 1 });
    // [mongoose.Types.ObjectId(data.keepinIdx)]
    return Keepin_1.default.find({ friendIdx: { $in: [mongoose_1.default.Types.ObjectId(data.friendIdx)] } });
};
const deleteFriend = (data) => {
    return Keepin_1.default.updateOne({ _id: data.keepinIdx }, { $pull: { friendIdx: data.friendIdx } });
};
const deleteUserData = (data) => {
    return Keepin_1.default.deleteMany({ userIdx: data.userIdx });
};
exports.default = {
    saveKeepin,
    modifyKeepinByKeepinIdx,
    findKeepin,
    findkeepinByUserIdx,
    searchKeepinByKeyword,
    findDetailKeepin,
    findKeepinByKeepinIdx,
    findKeepinForTaken,
    findKeepinsByFriendIdxAndTaken,
    findkeepinByUserIdxAndCategory,
    deleteKeepinByKeepinIdx,
    findKeepinFriend,
    deleteFriend,
    deleteUserData,
    saveKeepinText,
    saveKeepinPhoto,
    findPhotosByKeepinIdx
};
//# sourceMappingURL=keepin.js.map