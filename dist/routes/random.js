"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default();
/* RANDOM */
router.get('/', auth_1.default.checkToken, controllers_1.randomController.getRandom);
exports.default = router;
//# sourceMappingURL=random.js.map