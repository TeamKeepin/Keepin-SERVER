"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Keepin_1 = __importDefault(require("../models/Keepin"));
const findRandoms = (data) => {
    const randoms = Keepin_1.default.find().where('userIdx').equals(data.userIdx);
    return randoms;
};
const findRandom = (data) => {
    const random = Keepin_1.default.findOne({ _id: data.randomId }).select('_id title photo');
    return random;
};
exports.default = {
    findRandoms,
    findRandom
};
//# sourceMappingURL=random.js.map