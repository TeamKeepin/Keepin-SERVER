import Keepin from "../models/Keepin"

export interface keepinFindUserIdxInput {
  userIdx: string
}

export interface keepinFindIdxInput {
  randomId: string
}

const findRandoms = (data: keepinFindUserIdxInput) => {
  const randoms =  Keepin.find().where('_id').equals(data.userIdx);
  return randoms;
}

const findRandom = (data: keepinFindIdxInput) => {
  const random =  Keepin.findOne({_id:data.id});
  return random;
}

export default {
findRandoms,
findRandom
}