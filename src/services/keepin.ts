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

export interface keepinFindByKeepinIdxInput{
  keepinIdx: string;
}

export interface keepinSearchInput{
  userIdx: string;
  title: string;
}

export interface keepinFindByUserIdxAndCategory{
  userIdx: string;
  category: string;
}

export interface keepinDetailInput{
  userIdx: string;
  keepinIdx: string;
}

export interface keepinFindUserIdxInput {
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

// 모아보기 카테고리 조회 
const findkeepinByUserIdxAndCategory = (data: keepinFindByUserIdxAndCategory) => {
  const result = Keepin.find({category: { "$in" : [data.category]}, userIdx: data.userIdx}, {title: 1, photo:1, taken:1, category:1, date:1}).sort({ date: 1 });
  return result;
}

const findDetailKeepin = (data: keepinDetailInput) => {
  const result = Keepin.findOne({_id: data.keepinIdx}).where('userIdx').equals(data.userIdx).sort({ date: 1 });
  return result;
}

const findkeepinByUserIdx = (data: keepinFindUserIdxInput) => {
  const keepins = Keepin.find().where('userIdx').equals(data.userIdx);
  return keepins;
}


const findKeepinByKeepinIdx = (data: keepinFindByKeepinIdxInput) => {
  const keepin = Keepin.findOne({_id:data.keepinIdx}).select('-__v -userIdx');
  return keepin;
}

//친구와 준/받은 keepin 목록 조회 
const findKeepinForTaken = (data: keepinFindByKeepinIdxInput) => {
  //최신 순 정렬 해야 함 
  const keepin = Keepin.findOne({_id:data.keepinIdx}).select('-__v -userIdx').populate("friendIdx",["name"]).sort({date: 1});
  return keepin;
}

// 키핀 삭제
const deleteKeepinByKeepinIdx = (data: keepinFindByKeepinIdxInput) => {
  return Keepin.deleteOne({_id:data.keepinIdx});
}

export default {
  saveKeepin,
  findKeepin,
  findkeepinByUserIdx,
  searchKeepinByKeyword,
  findDetailKeepin,
  findKeepinByKeepinIdx,
  findKeepinForTaken,
  findkeepinByUserIdxAndCategory,
  deleteKeepinByKeepinIdx
}