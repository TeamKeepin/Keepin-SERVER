"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default();
/* My */
//프로필 조회 
router.get('/profile', auth_1.default.checkToken, controllers_1.userController.getProfile);
//프로필 수정 
router.put('/profile', auth_1.default.checkToken, [
    express_validator_1.check("name", "Name is required").not().isEmpty(),
], controllers_1.userController.editProfile);
//비밀번호 수정 
router.put('/password', auth_1.default.checkToken, [
    express_validator_1.check("currentPassword", "currentPassword is required").not().isEmpty(),
    express_validator_1.check("newPassword", "newPassword is required").not().isEmpty(),
], controllers_1.userController.editPassword);
router.get('/', auth_1.default.checkToken, controllers_1.userController.getKeepinCount);
exports.default = router;
//# sourceMappingURL=my.js.map