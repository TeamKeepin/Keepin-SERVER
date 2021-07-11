import User from "../models/User"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface userCreateInput {
    email: string,
    password: string,
    name: string,
    birth: string,
    phoneToken: string,
    phone: string
}
export interface userFindInput {
    email: string
}

export interface userIdxInput {
  userIdx: string
}

export interface refreshTokenInput {
  email: string,
  refreshToken: string
}

const saveUser = (data: userCreateInput) => {
    return User.create( data );
}

const findUser = (data: userFindInput) => {
  const user = User.findOne({email:data.email});
  return user
}

const findUserbyIdx = (data: userIdxInput) => {
  const user = User.findOne({_id:data.userIdx});
;  return user
}

const findUserProfile = (data: userIdxInput) => {
  const user = User.findOne({_id:data.userIdx}).select('-__v -token -_id -refreshToken');
  return user
}

const saveRefreshToken = (data: refreshTokenInput) => {
  const filter = {
    email: data.email,
  };

  const update = {
    refreshToken: data.refreshToken,
  };

  const result = User.findOneAndUpdate(filter, update, {
    new: true,
  });
  
  return result;
}



export default {
  saveUser,
  findUser,
  findUserbyIdx,
  findUserProfile,
  saveRefreshToken
}