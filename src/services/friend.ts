import Friend from "../models/Friend";


export interface friendsFindUserIdxInput {
    userIdx: string //user _id 
}

export interface friendFindNameInput {
    name: string 
}

export interface friendCreateInput{
    name: string,
    userIdx: string
}


export interface friendFindFriendIdxInput{
    friendIdx:string
}

export interface friendFindFriendIdxAndAddKeepinInput{
    friendIdx:string,
    keepinIdx:string
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
    return friend;
}

//친구 등록
const saveFriend = (data: friendCreateInput) => {
    Friend.create(data);
}

// const findFriendByFriendIdxAndAddKeepin = (data: friendFindFriendIdxAndAddKeepinInput) => {
//     const friend= Friend.findOne({_id:data.friendIdx});

// }

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