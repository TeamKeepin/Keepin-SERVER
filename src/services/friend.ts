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

const findFriendsByUserIdx = (data: friendsFindUserIdxInput) => {
    const frineds = Friend.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx');
    return frineds;
}

const findFriendByName = (data: friendFindNameInput) => {
    const friend = Friend.find().where('name').equals(data.name);
    return friend;
}

const findFriendByFriendIdx = (data: friendFindFriendIdxInput) => {
    const friend = Friend.findOne({_id:data.friendIdx});

    // friend의 keepin에서 userIdx가 일치하는 거만 골라서 카운트
    return friend;
}

const saveFrined = (data: frinedCreateInput) => {
    Friend.create(data);
}


export default {
  findFriendsByUserIdx,
  findFriendByName,
  findFriendByFriendIdx,
  saveFrined
}