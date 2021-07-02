import express from "express";
import {userController} from '../controllers'

const router = express();

/* User */
router.get('/',userController.signUp)

//로그인 /auth로 되어 있는데 router하나 더 파야 하나 ??
// router.post('/~',userController.login)

export default router;

