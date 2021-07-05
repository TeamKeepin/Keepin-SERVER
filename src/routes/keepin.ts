import express from "express";
import {keepinController} from '../controllers'
import auth from "../middlewares/auth"
const router = express();

/* User */
router.post('/', keepinController.createKeepin)

export default router;

