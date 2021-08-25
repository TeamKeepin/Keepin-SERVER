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

export interface userEmailInput {
    email: string
}

export interface userFindEmailInput{
  name: string,
  birth: string,
  phone: string
}

export interface refreshTokenInput {
    id: string,
    refreshToken: string
}

export interface userEditNameInput {
    userIdx: string,
    name: string,
}

export interface userEditPasswordInput {
    userIdx: string,
    password: string,
}

export interface userEditPhoneInput {
  userIdx: string,
  phone: string,
}


const saveUser = (data: userCreateInput) => {
    return User.create( data );
};

const findUser = (data: userFindInput) => {
  const user = User.findOne({email:data.email});
  return user
};

const findUserbyIdx = (data: userIdxInput) => {
  const user = User.findOne({_id:data.userIdx});
  return user
};

const findUserbyEmail = (data: userEmailInput) => {
  const user = User.findOne({email:data.email});
  return user
};


const findUserProfile = (data: userIdxInput) => {
  const user = User.findOne({_id:data.userIdx}).select('-__v -token -_id -refreshToken -phoneToken');
  return user
};

const findUserEmail = (data: userFindEmailInput) => {
  const user = User.findOne({name: data.name, birth: data.birth, phone: data.phone});
  return user
};

const saveRefreshToken = (data: refreshTokenInput) => {
  const filter = {
    _id: data.id,
  };

  const update = {
    refreshToken: data.refreshToken,
  };

  const result = User.findOneAndUpdate(filter, update, {
    new: true,
  });
  
  return result;
};

const editUser = (data: userEditNameInput) => {
  return User.findOneAndUpdate({_id: data.userIdx},{name: data.name}, {
    new: true,
  })
};

const editPassword = (data: userEditPasswordInput) => {
  return User.findOneAndUpdate({_id: data.userIdx},{password: data.password}, {
    new: true,
  })
}

const editPhone = (data: userEditPhoneInput) => {
  return User.findOneAndUpdate({_id: data.userIdx},{phone: data.phone}, {
    new: true,
  })
}

const deleteUser = (data: userIdxInput) => {
  return User.deleteOne({_id: data.userIdx});
};

// const savePasswordToken = (data: userIdxInput) => {
//   return User.deleteOne({_id: data.userIdx});
// };

export default {
  saveUser,
  findUser,
  findUserbyIdx,
  findUserbyEmail,
  findUserProfile,
  saveRefreshToken,
  editUser,
  editPassword,
  editPhone,
  deleteUser,
  findUserEmail
  // savePasswordToken
}