import express from "express";
import userRouter from "./user";
import reminderRouter from "./reminder";
import randomRouter from "./random";
import myRouter from "./my";
import friendRouter from "./frined";
import settingRouter from "./setting";

const router = express();

router.use('/user', userRouter);
router.use('/reminder', reminderRouter);
router.use('/my', myRouter);
router.use('/random',randomRouter);
router.use('/friend',friendRouter);
router.use('/setting',settingRouter);

export default router;