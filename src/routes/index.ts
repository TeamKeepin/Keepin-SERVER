import express from "express";
import userRouter from "./user";
import reminderRouter from "./reminder";
import myRouter from "./my"

const router = express();

router.use('/user', userRouter);
router.use('/reminder', reminderRouter);
router.use('/my', myRouter);

export default router;