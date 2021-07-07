import Keepin from "../models/Keepin"

export interface keepinFindUserIdxInput {
  userIdx: string
}

export interface keepinFindIdxInput {
  randomId: string
}

const findRandoms = (data: keepinFindUserIdxInput) => {
  const randoms =  Keepin.find().where('userIdx').equals(data.userIdx);
  return randoms;
}

const findRandom = (data: keepinFindIdxInput) => {
  const random =  Keepin.findOne({_id:data.randomId}).select('-__v0');
  return random;
}

export default {
findRandoms,
findRandom
}