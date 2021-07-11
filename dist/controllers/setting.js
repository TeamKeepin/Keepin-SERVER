"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const returnCode_1 = __importDefault(require("../library/returnCode"));
const deleteAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    try {
        // 키핀 지우기
        // 리마인더 지우기
        // 친구 지우기
    }
    catch (err) {
        res.status(500).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message
        });
        return;
    }
});
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    try {
        // 키핀 지우기
        // 리마인더 지우기
        // 친구 지우기
        // 유저에서 유저 지우기
    }
    catch (err) {
        res.status(500).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message
        });
        return;
    }
});
exports.default = {
    deleteAllData,
    withdraw
};
//# sourceMappingURL=setting.js.map