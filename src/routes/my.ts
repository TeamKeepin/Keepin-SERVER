import express from "express";
import {userController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express();

/* My */
router.get('/profile',auth.checkToken,userController.getProfile)

router.put('/profile',auth.checkToken,[
    check("name", "Name is required").not().isEmpty(),
  ],userController.editProfile)

router.put('/password',auth.checkToken,[
    check("currentPassword", "currentPassword is required").not().isEmpty(),
    check("newPassword", "newPassword is required").not().isEmpty(),
  ],userController.editPassword)

router.get('/',auth.checkToken,userController.getKeepinCount)
export default router;