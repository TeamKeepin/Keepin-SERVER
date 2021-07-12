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
    ;
    return user;
};
const findUserProfile = (data) => {
    const user = User_1.default.findOne({ _id: data.userIdx }).select('-__v -token -_id -refreshToken');
    return user;
};
const saveRefreshToken = (data) => {
    const filter = {
        email: data.email,
    };
    const update = {
        refreshToken: data.refreshToken,
    };
    const result = User_1.default.findOneAndUpdate(filter, update, {
        new: true,
    });
    return result;
};
exports.default = {
    saveUser,
    findUser,
    findUserbyIdx,
    findUserProfile,
    saveRefreshToken
};
//# sourceMappingURL=user.js.map