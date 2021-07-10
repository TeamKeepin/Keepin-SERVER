import express from "express";
import {friendController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express();

/* Friend */
//친구등록 
router.post('/',auth.checkToken,[
    check("name", "Name is required").not().isEmpty(),
    check(
      "name",
      "Please enter a name with 5 or less characters"
    ).isLength({ max: 5 }),
  ],friendController.createFriend);

//친구 전체 조회 
router.get('/',auth.checkToken, friendController.getFriends);
//친구 검색 
router.get('/search', auth.checkToken, friendController.searchFriends);
//친구 상세 정보 조회 
router.get('/:friendId',auth.checkToken,friendController.getFriendDetail);
//친구에게 준/받은 키핀 조회 
router.get('/keepin/:friendId',auth.checkToken,friendController.getTakenGivenList);
//친구 메모 수정 
router.put('/memo:friendId',auth.checkToken,check("memo", "Memo is required").not().isEmpty(), friendController.editFriendMemo);
//친구 이름 수정 
router.put('/:friendId',auth.checkToken,check("name", "Name is required").not().isEmpty(), friendController.editFriendName);
//친구 삭제 

export default router;