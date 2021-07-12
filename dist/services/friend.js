"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Friend_1 = __importDefault(require("../models/Friend"));
const mongoose_1 = __importDefault(require("mongoose"));
const findFriendsByKeepinIdx = (data) => {
    //const result = Friend.find({keepinIdx: { "$in" : [mongoose.Types.ObjectId(data.keepinIdx)]}});
    const filter = {
        keepinIdx: { "$in": [mongoose_1.default.Types.ObjectId(data.keepinIdx)] },
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
//const saveKeepinInFriend = (data: KeepinArrayInput) => {
/*
    const filter = {
      _id: data.friendIdx,
    };
    const update = {
      keepinIdx: data.keepinIdxArray,
    };
*/
//  Friend.findOneAndUpdate(filter, update, {
//   new: true,
// });
//}
//예시
/*
const filter = {
      email: email,
    };
    const update = {
      authToken: token,
    };
    await adminModel.findOneAndUpdate(filter, update, {
      new: true,
    });
}
*/
// 친구 검색
const searchFriendByKeyword = (data) => {
    const result = Friend_1.default.find({ name: { $regex: data.name } }).where('userIdx').equals(data.userIdx).select('-__v -userIdx');
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
// 영우 오빠 주석처리
// const findKeepinFriend = (data: friendKeepinInput) => {
//     const total= Friend.find().where('_id').equals(data.friendIdx).count();
//     return; 
// }
// const findFriendKeepinCountAndMemo = (data: friendFindFriendIdxInput) => {
//     const friend = Friend.find({_id: data.friendIdx})
//     return
// }
exports.default = {
    findFriendsByUserIdx,
    findFriendByName,
    searchFriendByKeyword,
    saveFriend,
    findKeepinFriend,
    findFriendByFriendIdx,
    findFriendByNameAnduserIdx,
    deleteFriendByFriendIdx,
    findFriendsByKeepinIdx
    //   saveKeepinInFriend
};
//# sourceMappingURL=friend.js.map