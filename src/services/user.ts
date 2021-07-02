// import rm from "../module/util/responseMessage";
// import utils  from "../module/util/utils";
// import sc from "../module/util/statusCode";
// import userModel from "../models/user";
// import encrypt from "../module/encryption";
// import jwt from "'../module/jwt";
import User from "../models/User"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface userCreateInput {
    id: string,
    password: string
}
  

const createUser = (data: userCreateInput) => {
    // return User.create({ data})

  return User.findOne({id:data.id})
}

const findUser = (data: userCreateInput) => {
    // return User.create({ data})

  return User.findOne({id:data.id})
}

export default {
  createUser,
  findUser
}