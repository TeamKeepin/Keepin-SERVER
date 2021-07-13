import express from "express"
import {settingController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express()

/* Setting */
// 계정삭제 
router.delete('/withdrawal', auth.checkToken, settingController.withdraw);

export default router;

