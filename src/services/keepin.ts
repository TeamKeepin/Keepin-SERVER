
import User from "../models/User"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface userCreateInput {
    id: string,
    password: string
  }
  
  const createUser = (data: userCreateInput) => {
    return User.create({ data })
  }

  export default {
    createUser
  }