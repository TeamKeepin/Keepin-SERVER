import express from "express";
import keepinRouter from "./keepin";
import userRouter from "./user";
import reminderRouter from "./reminder";

const router = express();

router.use('/user', userRouter);
router.use('/keepin', keepinRouter);
router.use('/reminder', reminderRouter);

export default router;