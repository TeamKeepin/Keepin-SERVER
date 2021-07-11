"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keepin_1 = __importDefault(require("./keepin"));
const user_1 = __importDefault(require("./user"));
const reminder_1 = __importDefault(require("./reminder"));
const random_1 = __importDefault(require("./random"));
const my_1 = __importDefault(require("./my"));
const friend_1 = __importDefault(require("./friend"));
const setting_1 = __importDefault(require("./setting"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default();
router.use('/user', user_1.default);
router.use('/keepin', keepin_1.default);
router.use('/reminder', reminder_1.default);
router.use('/my', my_1.default);
router.use('/random', random_1.default);
router.use('/friend', friend_1.default);
router.use('/setting', setting_1.default);
router.use('/auth', auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map