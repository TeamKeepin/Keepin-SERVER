import User from "../models/User"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface userCreateInput {
    email: string,
    password: string,
    name: string,
    birth: string,
    token: string,
    phone: string
}
export interface userFindInput {
    email: string
}

export interface userIdxInput {
  userIdx: string
}

const saveUser = (data: userCreateInput) => {
    // console.log(data);
    return User.create( data );
}

const findUser = (data: userFindInput) => {
  const user = User.findOne({email:data.email});
  console.log("user: "+user)
  return user
}

const findUserbyIdx = (data: userIdxInput) => {
  const user = User.findOne({userIdx:data.userIdx});
  return user
}

export default {
  saveUser,
  findUser,
  findUserbyIdx
}