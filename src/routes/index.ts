import express from "express";
import userRouter from "./user"
import keepinRouter from "./keepin";
import myRouter from "./my";
import reminderRouter from "./reminder";

const router = express();

router.use('/user', userRouter);
router.use('/keepin', keepinRouter);
router.use('/my', myRouter);
router.use('/reminder', reminderRouter);


export default router;