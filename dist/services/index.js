"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendService = exports.keepinService = exports.randomService = exports.reminderService = exports.userService = void 0;
const user_1 = __importDefault(require("./user"));
exports.userService = user_1.default;
const keepin_1 = __importDefault(require("./keepin"));
exports.keepinService = keepin_1.default;
const reminder_1 = __importDefault(require("./reminder"));
exports.reminderService = reminder_1.default;
const random_1 = __importDefault(require("./random"));
exports.randomService = random_1.default;
const friend_1 = __importDefault(require("./friend"));
exports.friendService = friend_1.default;
//# sourceMappingURL=index.js.map