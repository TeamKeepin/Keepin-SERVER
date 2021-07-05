import express from "express";
import {keepinController} from '../controllers'
import auth from "../middlewares/auth"
const router = express();

/* User */
router.post('/', auth.checkToken, keepinController.createKeepin)
router.get('/', auth.checkToken, keepinController.getAllKeepin)

export default router;

