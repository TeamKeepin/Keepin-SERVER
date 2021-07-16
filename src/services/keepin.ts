import keepin from '../controllers/keepin';
import Keepin from '../models/Keepin';
import mongoose from 'mongoose';

export interface keepinCreateInput {
  title: string;
  photo: string[];
  taken: boolean;
  date: string;
  category: [string];
  record: string;
  userIdx: string;
  friendIdx: [string];
}

export interface keepinCreateTextInput{
  title: string;
  taken: boolean;
  date: string;
  category: [string];
  record: string;
  userIdx: string;
  friendIdx: [string];
}

export interface keepinCreatePhotoInput{
  photo: string[];
  keepinIdx: string;
}

export interface keepinModifyInput {
  title: string;
  photo: string[];
  taken: boolean;
  date: string;
  category: [string];
  record: string;
  friendIdx: [mongoose.Types.ObjectId];
  keepinIdx: string;
}

export interface keepinFindInput {
  userIdx: string;
  taken: boolean;
  recent: boolean;
}

export interface keepinFindByKeepinIdxAndTakenInput{
  keepinIdx: string;
  taken: boolean;
}

export interface keepinFindByFriendIdxAndTakenInput{
  friendIdx: string;
  taken: boolean;
}

export interface keepinFindByKeepinIdxInput {
  keepinIdx: string;
}

export interface keepinSearchInput {
  userIdx: string;
  title: string;
}

export interface keepinFindByUserIdxAndCategory {
  userIdx: string;
  category: string;
}

export interface keepinDetailInput {
  userIdx: string;
  keepinIdx: string;
}

export interface keepinFindUserIdxInput {
  userIdx: string; //user _id
}

export interface keepinFindByFriendIdx {
  friendIdx: string;
}

export interface keepinFindByKeepinIdxAndRevFriendIdx {
  keepinIdx: string;
  friendIdx: string;
}

//키핀하기 생성
const saveKeepin = (data: keepinCreateInput) => {
  const keepin = Keepin.create(data);
  return keepin;
};

//키핀생성 1 
const saveKeepinText = (data: keepinCreateTextInput) => {
  const keepin = Keepin.create(data);
  return keepin;
};

//키핀생성 2 
const saveKeepinPhoto = (data: keepinCreatePhotoInput) => {
  return Keepin.findOneAndUpdate(
    { _id: data.keepinIdx },
      {photo: data.photo},
      { new: true }
    );
};

//모아보기 받은/준
const findKeepin = (data: keepinFindInput) => {
  var convertDate;

  if (String(data.recent) === 'true') {
    convertDate = -1; //최신순
  } else {
    convertDate = 1; //오래된 순
  }
  const result = Keepin.find({ taken: data.taken }, { title: 1, photo: 1, taken: 1, date: 1 })
    .where('userIdx')
    .equals(data.userIdx)
    .sort({ date: convertDate });
  return result;
};

//모아보기 전체 키워드 검색
const searchKeepinByKeyword = (data: keepinSearchInput) => {
  const result = Keepin.find({ title: { $regex: data.title } }, { title: 1, photo: 1, taken: 1, date: 1 })
    .where('userIdx')
    .equals(data.userIdx)
    .sort({ date: -1 });
  return result;
};

// 모아보기 카테고리 조회
const findkeepinByUserIdxAndCategory = (data: keepinFindByUserIdxAndCategory) => {
  const result = Keepin.find({ category: { $in: [data.category] }, userIdx: data.userIdx }, { title: 1, photo: 1, date: 1 }).sort({
    date: -1,
  });
  return result;
};

const findDetailKeepin = (data: keepinDetailInput) => {
  const result = Keepin.findOne({ _id: data.keepinIdx })
    .where('userIdx')
    .equals(data.userIdx)
    .populate('friendIdx', ['name'])
    .sort({ date: -1 });
  return result;
};

const findkeepinByUserIdx = (data: keepinFindUserIdxInput) => {
  const keepins = Keepin.find().where('userIdx').equals(data.userIdx);
  return keepins;
};

const findKeepinByKeepinIdx = (data: keepinFindByKeepinIdxInput) => {
  const keepin = Keepin.findOne({ _id: data.keepinIdx }).select('-__v -userIdx');
  return keepin;
};


const findKeepinForTaken = (data: keepinFindByKeepinIdxAndTakenInput) => {
  const keepin = Keepin.findOne({ _id: data.keepinIdx },{title:1, photo:1, date:1, taken:1})
      .where('taken').equals(data.taken)
      .sort({ date: -1 });
  return keepin;
};

//친구와 준/받은 keepin 목록 조회
const findKeepinsByFriendIdxAndTaken = (data: keepinFindByFriendIdxAndTakenInput) => {
  return Keepin.find({ friendIdx: { $in: [mongoose.Types.ObjectId(data.friendIdx)] } },{title:1, photo:1, date:1, taken:1})
      .where('taken').equals(data.taken)
      .sort({ date: -1 });
};

// 키핀 수정
const modifyKeepinByKeepinIdx = (data: keepinModifyInput) => {
  const keepins = Keepin.findOneAndUpdate(
    { _id: data.keepinIdx },
    {
      title: data.title,
      photo: data.photo,
      taken: data.taken,
      date: data.date,
      category: data.category,
      record: data.record,
      friendIdx: data.friendIdx,
    },
    { new: true }
  );
  return keepins;
};

// 키핀 삭제
const deleteKeepinByKeepinIdx = (data: keepinFindByKeepinIdxInput) => {
  return Keepin.deleteOne({ _id: data.keepinIdx });
};

const findKeepinFriend = (data: keepinFindByFriendIdx) => {
  // const result = Keepin.find({category: { "$in" : [data.category]}, userIdx: data.userIdx}, {title: 1, photo:1,  date:1}).sort({ date: 1 });
  // [mongoose.Types.ObjectId(data.keepinIdx)]
  return Keepin.find({ friendIdx: { $in: [mongoose.Types.ObjectId(data.friendIdx)] } });
};

const deleteFriend = (data: keepinFindByKeepinIdxAndRevFriendIdx) => {
  return Keepin.updateOne({ _id: data.keepinIdx }, { $pull: { friendIdx: data.friendIdx } });
};

const deleteUserData = (data: keepinFindUserIdxInput) => {
  return Keepin.deleteMany({ userIdx: data.userIdx });
};

export default {
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
  saveKeepinPhoto
};
