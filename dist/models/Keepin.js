"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const KeepinSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    photo: {
        type: [String],
    },
    taken: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
    },
    record: {
        type: String,
        default: Date.now,
    },
    userIdx: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
    },
    friendIdx: [{
            type: mongoose_1.default.SchemaTypes.ObjectId,
            ref: "Friend",
        }]
});
exports.default = mongoose_1.default.model("Keepin", KeepinSchema);
//# sourceMappingURL=Keepin.js.map