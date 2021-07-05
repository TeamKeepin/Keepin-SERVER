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

export interface friendSearchInput{
    userIdx: string,
    name: string
}


const findFriendsByUserIdx = (data: friendsFindUserIdxInput) => {
    const friends = Friend.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx');
    return friends;
}

const findFriendByName = (data: friendFindNameInput) => {
    const friend = Friend.find().where('name').equals(data.name);
    return friend;
}

//친구 등록
const saveFriend = (data: frinedCreateInput) => {
    Friend.create(data);
}
// 친구 검색
const searchFriendByKeyword = (data: friendSearchInput) => {
    const result = Friend.find({name:{$regex:data.name}}).where('userIdx').equals(data.userIdx).select('-__v -userIdx');
    return result
}
export default {
  findFriendsByUserIdx,
  findFriendByName,
  searchFriendByKeyword,
  saveFriend
}