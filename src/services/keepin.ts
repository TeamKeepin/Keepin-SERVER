import Keepin from "../models/Keepin"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.

export interface randomFindUserIdxInput {
    userIdx: string //user _id 
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
  findKeepinCount
}




