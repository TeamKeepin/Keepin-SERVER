"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default();
// 리프레쉬 토큰
router.get('/', controllers_1.authController.reToken);
exports.default = router;
//# sourceMappingURL=auth.js.map