import express from "express";
import keepinRouter from "./keepin";
import userRouter from "./user";

const router = express();

router.use('/user', userRouter);
router.use('/keepin', keepinRouter);

export default router;