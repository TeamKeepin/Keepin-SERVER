"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    phoneToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map