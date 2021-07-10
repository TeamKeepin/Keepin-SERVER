import express from "express";
import {authController} from '../controllers'

const router = express();

// 리프레쉬 토큰
router.get('/', authController.reToken);

export default router;