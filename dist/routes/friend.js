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
/* Friend */
//친구등록 
router.post('/', auth_1.default.checkToken, [
    express_validator_1.check("name", "Name is required").not().isEmpty(),
    express_validator_1.check("name", "Please enter a name with 5 or less characters").isLength({ max: 5 }),
], controllers_1.friendController.createFriend);
//친구 전체 조회 
router.get('/', auth_1.default.checkToken, controllers_1.friendController.getFriends);
//친구 검색 
router.get('/search', auth_1.default.checkToken, controllers_1.friendController.searchFriends);
//친구 상세 정보 조회 
router.get('/:friendId', auth_1.default.checkToken, controllers_1.friendController.getFriendDetail);
//친구에게 준/받은 키핀 조회 
router.get('/keepin/:friendId', auth_1.default.checkToken, controllers_1.friendController.getTakenGivenList);
//친구 메모 수정 
router.put('/memo/:friendId', auth_1.default.checkToken, express_validator_1.check("memo", "Memo is required").not().isEmpty(), controllers_1.friendController.editFriendMemo);
//친구 이름 수정 
router.put('/:friendId', auth_1.default.checkToken, express_validator_1.check("name", "Name is required").not().isEmpty(), controllers_1.friendController.editFriendName);
//친구 삭제 
router.delete('/:friendId', auth_1.default.checkToken, controllers_1.friendController.deleteFriend);
exports.default = router;
//# sourceMappingURL=friend.js.map