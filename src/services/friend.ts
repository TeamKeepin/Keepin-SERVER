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
  keepinIdxArray: [string];
}

export interface KeepinIdInput {
  keepinIdx: string;
}

const findFriendsByKeepinIdx = (data: KeepinIdInput) => {
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
const searchFriendByKeyword = (data: friendSearchInput) => {
  const result = Friend.find({ name: { $regex: data.name } })
    .where('userIdx')
    .equals(data.userIdx)
    .select('-__v -userIdx');
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

// 영우 오빠 주석처리

// const findKeepinFriend = (data: friendKeepinInput) => {
//     const total= Friend.find().where('_id').equals(data.friendIdx).count();
//     return;
// }

// const findFriendKeepinCountAndMemo = (data: friendFindFriendIdxInput) => {
//     const friend = Friend.find({_id: data.friendIdx})
//     return
// }

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
  //   saveKeepinInFriend
};
