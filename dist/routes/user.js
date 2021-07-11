"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const router = express_1.default();
/* User */
router.post('/signup', [
    express_validator_1.check("name", "Name is required").not().isEmpty(),
    express_validator_1.check("email", "Please include a valid email").isEmail(),
    express_validator_1.check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
], controllers_1.userController.signUp);
router.post('/signin', [
    express_validator_1.check("email", "Please include a valid email").isEmail(),
    express_validator_1.check("password", "Password is required").exists(),
], controllers_1.userController.signIn);
exports.default = router;
//# sourceMappingURL=user.js.map