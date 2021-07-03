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

const saveUser = (data: userCreateInput) => {
    // console.log(data);
    return User.create( data );
}

const findUser = (data: userFindInput) => {
  const num = User.findOne({email:data.email});
  // console.log(num);
  return num
}

export default {
  saveUser,
  findUser
}