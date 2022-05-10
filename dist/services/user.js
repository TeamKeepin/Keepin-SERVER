"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const saveUser = (data) => {
    return User_1.default.create(data);
};
const findUser = (data) => {
    const user = User_1.default.findOne({ email: data.email });
    return user;
};
const findUserbyIdx = (data) => {
    const user = User_1.default.findOne({ _id: data.userIdx });
    return user;
};
const findUserbyEmail = (data) => {
    const user = User_1.default.findOne({ email: data.email });
    return user;
};
const findUserProfile = (data) => {
    const user = User_1.default.findOne({ _id: data.userIdx }).select('-__v -token -_id -refreshToken -phoneToken');
    return user;
};
const findUserEmail = (data) => {
    const user = User_1.default.findOne({ name: data.name, birth: data.birth, phone: data.phone });
    return user;
};
const saveRefreshToken = (data) => {
    const filter = {
        _id: data.id,
    };
    const update = {
        refreshToken: data.refreshToken,
    };
    const result = User_1.default.findOneAndUpdate(filter, update, {
        new: true,
    });
    return result;
};
const editPhoneToken = (data) => {
    return User_1.default.findOneAndUpdate({ _id: data.userIdx }, { phoneToken: data.phoneToken });
};
const editUser = (data) => {
    return User_1.default.findOneAndUpdate({ _id: data.userIdx }, { name: data.name }, {
        new: true,
    });
};
const editPassword = (data) => {
    return User_1.default.findOneAndUpdate({ _id: data.userIdx }, { password: data.password }, {
        new: true,
    });
};
const editPhone = (data) => {
    return User_1.default.findOneAndUpdate({ _id: data.userIdx }, { phone: data.phone }, {
        new: true,
    });
};
const deleteUser = (data) => {
    return User_1.default.deleteOne({ _id: data.userIdx });
};
// const savePasswordToken = (data: userIdxInput) => {
//   return User.deleteOne({_id: data.userIdx});
// };
exports.default = {
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
    findUserEmail,
    editPhoneToken
    // savePasswordToken
};
//# sourceMappingURL=user.js.map