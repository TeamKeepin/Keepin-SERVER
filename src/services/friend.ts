import Friend from "../models/Friend";


export interface friendsFindUserIdxInput {
    userIdx: string //user _id 
}

export interface friendFindNameInput {
    name: string 
}

export interface frinedCreateInput{
    name: string,
    userIdx: string
}


export interface friendFindFriendIdxInput{
    friendIdx:string,
    userIdx:string
}


export interface friendSearchInput{
    userIdx: string,
    name: string
}

export interface friendKeepinInput{
    friendIdx: string
}



const findFriendsByUserIdx = (data: friendsFindUserIdxInput) => {
    const friends = Friend.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx -keepinIdx');
    return friends;
}

const findFriendByName = (data: friendFindNameInput) => {
    const friend = Friend.find().where('name').equals(data.name);
    return friend;
}

const findFriendByFriendIdx = (data: friendFindFriendIdxInput) => {
    const friend= Friend.findOne({_id:data.friendIdx});

    // friend의 keepin에서 userIdx가 일치하는 거만 골라서 카운트
    return friend;
}

//친구 등록
const saveFriend = (data: frinedCreateInput) => {
    Friend.create(data);
}

// 친구 검색
const searchFriendByKeyword = (data: friendSearchInput) => {
    const result = Friend.find({name:{$regex:data.name}}).where('userIdx').equals(data.userIdx).select('-__v -userIdx');
    return result;
}

const findKeepinFriend = (data: friendKeepinInput) => {
    const result = Friend.findOne({_id:data.friendIdx});
    return result;
}
export default {
  findFriendsByUserIdx,
  findFriendByName,
  searchFriendByKeyword,
  saveFriend,
  findKeepinFriend,
  findFriendByFriendIdx
}