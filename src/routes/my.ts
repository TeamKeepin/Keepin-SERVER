import express from "express";
import {userController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express();

/* My */
//프로필 조회 
router.get('/profile',auth.checkToken,userController.getProfile)

//프로필 수정 
router.put('/profile',auth.checkToken,[
    check("name", "Name is required").not().isEmpty(),
  ],userController.editProfile)

  //비밀번호 수정 
router.put('/password',auth.checkToken,[
    check("currentPassword", "currentPassword is required").not().isEmpty(),
    check("newPassword", "newPassword is required").not().isEmpty(),
  ],userController.editPassword)

router.get('/',auth.checkToken,userController.getKeepinCount)
export default router;