"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Friend_1 = __importDefault(require("../models/Friend"));
const mongoose_1 = __importDefault(require("mongoose"));
//키핀 삭제, 키핀 수정시 사용
const findFriendsByKeepinIdx = (data) => {
    // 해당 keepinId를 가지고 있는 친구들을 찾아서 해당 keepinIdx를 제거시켜주는 로직
    //const result = Friend.find({keepinIdx: { "$in" : [mongoose.Types.ObjectId(data.keepinIdx)]}});
    const filter = {
        keepinIdx: { $in: [mongoose_1.default.Types.ObjectId(data.keepinIdx)] },
    };
    const result = Friend_1.default.updateMany(filter, { $pull: { keepinIdx: mongoose_1.default.Types.ObjectId(data.keepinIdx) } }, { multi: true });
    return result;
};
const findFriendsByUserIdx = (data) => {
    const friends = Friend_1.default.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx -keepinIdx').sort({ name: 1 });
    return friends;
};
const findFriendByName = (data) => {
    const friend = Friend_1.default.find().where('name').equals(data.name);
    return friend;
};
const findFriendByNameAnduserIdx = (data) => {
    const friend = Friend_1.default.find({ userIdx: data.userIdx }).find({ name: data.name });
    return friend;
};
const findFriendByFriendIdx = (data) => {
    const friend = Friend_1.default.findOne({ _id: data.friendIdx });
    return friend;
};
//친구 등록
const saveFriend = (data) => {
    return Friend_1.default.create(data);
};
// 친구에 키핀 등록
const saveKeepinInFriend = (data) => {
    const filter = {
        _id: data.friendIdx, //실버영
    };
    const result = Friend_1.default.findOneAndUpdate(filter, { $push: { keepinIdx: mongoose_1.default.Types.ObjectId(data.keepinIdx) } }, { new: true });
    return result;
};
// 친구 검색
const searchFriendByKeyword = (data) => {
    const result = Friend_1.default.find({ name: { $regex: data.name } })
        .where('userIdx')
        .equals(data.userIdx)
        .select('-__v -userIdx -keepinIdx -memo');
    return result;
};
// 윤경 키핀 모아보기 상세
const findKeepinFriend = (data) => {
    const result = Friend_1.default.findOne({ _id: data.friendIdx });
    return result;
};
const deleteFriendByFriendIdx = (data) => {
    return Friend_1.default.deleteOne({ _id: data.friendIdx });
};
const deleteUserData = (data) => {
    return Friend_1.default.deleteMany({ userIdx: data.userIdx });
};
exports.default = {
    findFriendsByUserIdx,
    findFriendByName,
    searchFriendByKeyword,
    saveFriend,
    findKeepinFriend,
    findFriendByFriendIdx,
    findFriendByNameAnduserIdx,
    deleteFriendByFriendIdx,
    findFriendsByKeepinIdx,
    deleteUserData,
    saveKeepinInFriend,
};
//# sourceMappingURL=friend.js.map