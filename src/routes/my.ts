import express from "express";
import {userController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express();

/* My */
router.get('/profile',auth.checkToken,userController.getProfile)
// router.put('/profile',auth.checkToken,userController.editProfile)
// router.put('/password',auth.checkToken,userController.editPassword)


export default router;