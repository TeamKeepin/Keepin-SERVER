import express from "express";
import {keepinController} from '../controllers'
import auth from "../middlewares/auth"
const router = express();

/* User */
router.post('/', auth.checktoken, keepinController.createKeepin)

export default router;

