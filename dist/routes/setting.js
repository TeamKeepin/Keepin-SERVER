"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default();
/* Setting */
// 데이터 전체 초기화
router.delete('/', auth_1.default.checkToken, controllers_1.settingController.deleteAllData);
// 회원 탈퇴
router.delete('/withdrawal', auth_1.default.checkToken, controllers_1.settingController.withdraw);
exports.default = router;
//# sourceMappingURL=setting.js.map