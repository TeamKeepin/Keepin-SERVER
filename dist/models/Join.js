"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const JoinSchema = new mongoose_1.default.Schema({
    keepinIdx: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Keepin",
    },
    friendIdx: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Friend",
    },
});
exports.default = mongoose_1.default.model("Join", JoinSchema);
//# sourceMappingURL=Join.js.map