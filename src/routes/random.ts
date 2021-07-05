import express from "express";
import {randomController} from '../controllers'
import auth from "../middlewares/auth"
const router = express();

/* RANDOM */
router.get('/',auth.checkToken,randomController.getRandom)


export default router;