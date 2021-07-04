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

const findFriendsByUserIdx = (data: friendsFindUserIdxInput) => {
    const frineds = Friend.find().where('userIdx').equals(data.userIdx).select('-__v -userIdx');
    return frineds;
}

const findFriendByName = (data: friendFindNameInput) => {
    const friend = Friend.find().where('name').equals(data.name);
    return friend;
}

const saveFrined = (data: frinedCreateInput) => {
    Friend.create(data);
}

export default {
  findFriendsByUserIdx,
  findFriendByName,
  saveFrined
}