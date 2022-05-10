"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.default)();
/* My */
//프로필 조회 
router.get('/profile', auth_1.default.checkToken, controllers_1.userController.getProfile);
//프로필 수정 
router.put('/profile', auth_1.default.checkToken, [
    (0, express_validator_1.check)("name", "Name is required").not().isEmpty(),
], controllers_1.userController.editProfile);
//비밀번호 수정 
router.put('/edit/password', auth_1.default.checkToken, [
    (0, express_validator_1.check)("currentPassword", "currentPassword is required").not().isEmpty(),
    (0, express_validator_1.check)("newPassword", "newPassword is required").not().isEmpty(),
], controllers_1.userController.editPassword);
//전화번호 수정 
router.put('/phone', auth_1.default.checkToken, [
    (0, express_validator_1.check)("phone", "Phone is required").not().isEmpty(),
], controllers_1.userController.editPhone);
//이메일 찾기
router.post('/find/email', controllers_1.userController.findEmail);
//비밀번호 찾기 
router.post('/find/password', controllers_1.userController.findPassword);
router.get('/', auth_1.default.checkToken, controllers_1.userController.getKeepinCount);
exports.default = router;
//# sourceMappingURL=my.js.map