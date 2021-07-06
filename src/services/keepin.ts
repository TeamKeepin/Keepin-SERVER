import Keepin from "../models/Keepin";

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
  userIdx: string;
  taken: boolean;
}

export interface keepinSearchInput{
  userIdx: string;
  title: string;
}

export interface keepinDetailInput{
  userIdx: string;
  keepinIdx: string;
}

export interface randomFindUserIdxInput {
  userIdx: string //user _id 
}

//키핀하기 생성
const saveKeepin = (data: keepinCreateInput) => {
    const keepin = Keepin.create( data );
    return keepin;
}

//모아보기 받은/준
const findKeepin = (data: keepinFindInput) => {
  const result = Keepin.find({taken: data.taken}, {title: 1, photo:1, taken:1, date:1}).where('userIdx').equals(data.userIdx).sort({ date: 1 });
  return result;
}

//모아보기 전체 키워드 검색
const searchKeepinByKeyword = (data: keepinSearchInput) => {
  const result = Keepin.find({title:{$regex:data.title}}, {title: 1, photo:1, taken:1, date:1}).where('userIdx').equals(data.userIdx).sort({ date: 1 });
  return result;
}

const findDetailKeepin = (data: keepinDetailInput) => {
  const result = Keepin.findOne({_id: data.keepinIdx}).where('userIdx').equals(data.userIdx).sort({ date: 1 });
  return result;
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
  findKeepinCount,
  searchKeepinByKeyword,
  findDetailKeepin
}