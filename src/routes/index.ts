import express from "express";
import userRouter from "./user"

const router = express();

router.use('/user', userRouter);

export default router;