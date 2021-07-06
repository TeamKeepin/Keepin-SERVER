import Keepin from "../models/Keepin";
import Friend from "../models/Friend";

export interface keepinCreateInput {
  title: string;
  photo: string;
  taken: boolean;
  date: string;
  category: [string];
  record: string;
  userIdx: string;
  friendIdx: [string];
}

export interface keepinFindInput{
  userIdx: string
}

export interface randomFindUserIdxInput {
  userIdx: string //user _id 
}

//키핀하기 생성
const saveKeepin = (data: keepinCreateInput) => {
    Keepin.create( data );
    return data.friendIdx;
}
//키핀하기 받은/준
const findKeepin = (data: keepinFindInput) => {
  const taken =  Keepin.find({userIdx: data.userIdx}).find({taken: true});

}
const findKeepinCount = (data: randomFindUserIdxInput) => {
    const total =  Keepin.find().where('userIdx').equals(data.userIdx).count();
    const taken =  Keepin.find({userIdx: data.userIdx}).find({taken: true}).count();
    const given =  Keepin.find({userIdx: data.userIdx}).find({taken: false}).count();
    //1. keepin에서 random으로 하나 뽑아서 return해주기 ! 
    //2. 뽑은 keepin의 
    const result = {total, taken, given}
    return result;
}


export default {
  saveKeepin,
  findKeepin,
  findKeepinCount
}