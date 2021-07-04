import Keepin from "../models/Keepin"

//서비스 로직 구현 시 인자로 받는 것에 대한 interface를 미리 만들어주는 것이 좋다.
export interface keepinCreateInput {
  name: string;
  title: string;
  photo: string;
  taken: boolean;
  date: string;
  category: Number;
  record: string;
  userIdx: string;
}

const saveKeepin = (data: keepinCreateInput) => {
    return Keepin.create( data );
}

export default {
  saveKeepin,
}