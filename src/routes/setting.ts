import express from "express"
import {settingController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express()

/* Setting */

// 데이터 전체 초기화
router.delete('/', auth.checkToken, settingController.deleteAllData);

// 회원 탈퇴
router.delete('/withdrawal', auth.checkToken, settingController.withdraw);


export default router;

