"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingController = exports.friendController = exports.randomController = exports.reminderController = exports.keepinController = exports.userController = exports.authController = void 0;
const user_1 = __importDefault(require("./user"));
exports.userController = user_1.default;
const reminder_1 = __importDefault(require("./reminder"));
exports.reminderController = reminder_1.default;
const random_1 = __importDefault(require("./random"));
exports.randomController = random_1.default;
const friend_1 = __importDefault(require("./friend"));
exports.friendController = friend_1.default;
const setting_1 = __importDefault(require("./setting"));
exports.settingController = setting_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authController = auth_1.default;
const keepin_1 = __importDefault(require("./keepin"));
exports.keepinController = keepin_1.default;
//# sourceMappingURL=index.js.map