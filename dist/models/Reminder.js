"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReminderSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    sendDate: {
        type: String,
        default: 0
    },
    isAlarm: {
        type: Boolean,
        default: 0,
    },
    isImportant: {
        type: Boolean,
        default: 0,
    },
    userIdx: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Reminder", ReminderSchema);
//# sourceMappingURL=Reminder.js.map