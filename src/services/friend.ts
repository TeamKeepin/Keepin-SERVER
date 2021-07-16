import Friend from '../models/Friend';
import mongoose from 'mongoose';

export interface friendsFindUserIdxInput {
  userIdx: string;
}

export interface friendFindNameInput {
  name: string;
}

export interface friendCreateInput {
  name: string;
  memo: string;
  userIdx: string;
}

export interface friendFinduserIdxAndNameInput {
  name: string;
  userIdx: string;
}

export interface friendFindFriendIdxInput {
  friendIdx: string;
}

export interface friendFindIdxAndUserIdxInput {
  friendIdx: string;
  userIdx: string;
}

export interface friendSearchInput {
  userIdx: string;
  name: string;
}

export interface friendKeepinInput {
  friendIdx: string;
}

export interface KeepinArrayInput {
  friendIdx: string;
  keepinIdx: string;
}

export interface KeepinIdInput {
  keepinIdx: string;
}

//키핀 삭제, 키핀 수정시 사용
const findFriendsByKeepinIdx = (data: KeepinIdInput) => {
  // 해당 keepinId를 가지고 있는 친구들을 찾아서 해당 keepinIdx를 제거시켜주는 로직
  //const result = Friend.find({keepinIdx: { "$in" : [mongoose.Types.ObjectId(data.keepinIdx)]}});

  const filter = {
    keepinIdx: { $in: [mongoose.Types.ObjectId(data.keepinIdx)] },
  };

  const result = Friend.updateMany(filter, { $pull: { keepinIdx: mongoose.Types.ObjectId(data.keepinIdx) } }, { multi: true });

  return result;
};

const findFriendsByUserIdx = (data: friendsFindUserIdxInput) => {
  const friends = Friend.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx -keepinIdx').sort({ name: 1 });
  return friends;
};

const findFriendByName = (data: friendFindNameInput) => {
  const friend = Friend.find().where('name').equals(data.name);
  return friend;
};

const findFriendByNameAnduserIdx = (data: friendFinduserIdxAndNameInput) => {
  const friend = Friend.find({ userIdx: data.userIdx }).find({ name: data.name });
  return friend;
};

const findFriendByFriendIdx = (data: friendFindFriendIdxInput) => {
  const friend = Friend.findOne({ _id: data.friendIdx });
  return friend;
};

//친구 등록
const saveFriend = (data: friendCreateInput) => {
  return Friend.create(data);
};

// 친구에 키핀 등록
const saveKeepinInFriend = (data: KeepinArrayInput) => {
  const filter = {
    _id: data.friendIdx, //실버영
  };

  const result = Friend.findOneAndUpdate(filter, { $push: { keepinIdx: mongoose.Types.ObjectId(data.keepinIdx) } }, { new: true });

  return result;
};

// 친구 검색
const searchFriendByKeyword = (data: friendSearchInput) => {
  const result = Friend.find({ name: { $regex: data.name } })
    .where('userIdx')
    .equals(data.userIdx)
    .select('-__v -userIdx -keepinIdx -memo');
  return result;
};

// 윤경 키핀 모아보기 상세
const findKeepinFriend = (data: friendKeepinInput) => {
  const result = Friend.findOne({ _id: data.friendIdx });
  return result;
};

const deleteFriendByFriendIdx = (data: friendFindFriendIdxInput) => {
  return Friend.deleteOne({ _id: data.friendIdx });
};

const deleteUserData = (data: friendsFindUserIdxInput) => {
  return Friend.deleteMany({ userIdx: data.userIdx });
};

export default {
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
