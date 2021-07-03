import express from "express";
import userRouter from "./user";
import reminderRouter from "./reminder";

const router = express();

router.use('/user', userRouter);
router.use('/reminder', reminderRouter);

export default router;