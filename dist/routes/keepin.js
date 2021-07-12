"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middlewares/auth"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.default();
// upload.array('image', 3)
/* KEEPIN */
// 키핀하기 생성
router.post('/', auth_1.default.checkToken, multer_1.default.array('photo', 3), controllers_1.keepinController.createKeepin);
// router.post('/', auth.checkToken, keepinController.createKeepin);
// 모아보기 받은/준 필터링
router.get('/', auth_1.default.checkToken, controllers_1.keepinController.getTakenKeepin);
// 모아보기 전체 검색
router.get('/all', auth_1.default.checkToken, controllers_1.keepinController.searchKeepin);
// 모아보기 게시글 상세보기
router.get('/detail/:keepinIdx', auth_1.default.checkToken, controllers_1.keepinController.getDetailKeepin);
// 모아보기 카테고리 조회
router.get('/category', auth_1.default.checkToken, controllers_1.keepinController.getKeepinByCategory);
// 키핀 수정
router.put('/:keepinIdx', auth_1.default.checkToken, multer_1.default.array('photo', 3), controllers_1.keepinController.modifyKeepin);
// router.put('/:keepinIdx', auth.checkToken, keepinController.modifyKeepin);
// 키핀 삭제
router.delete('/', auth_1.default.checkToken, controllers_1.keepinController.deleteKeepin);
exports.default = router;
//# sourceMappingURL=keepin.js.map