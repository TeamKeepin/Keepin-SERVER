"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FriendSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    memo: {
        type: String
    },
    userIdx: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    keepinIdx: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Keepin",
        }]
});
exports.default = mongoose_1.default.model("Friend", FriendSchema);
//# sourceMappingURL=Friend.js.map