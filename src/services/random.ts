import Keepin from "../models/Keepin"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.

export interface randomFindInput {
    _id: string //user _id 
}

const findRandom = (data: randomFindInput) => {
    const keepins =  Keepin.find().where('_id').equals(data._id);
    //1. keepin에서 random으로 하나 뽑아서 return해주기 ! 
    //2. 뽑은 keepin의 
    return keepins;
}


export default {
  findRandom
}