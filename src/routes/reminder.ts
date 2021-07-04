import express from "express"
import {reminderController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express()

/* Reminder */
router.post('/', auth.checkToken, reminderController.createReminder) //auth.checkToken 추가
router.get('/', auth.checkToken, reminderController.getAllReminder) //auth.checkToken 추가
// router.get('/reminder/:month', auth.checkToken, reminderController.getMonthReminder)
// router.delete('/reminder/:reminderIdx', auth.checkToken, reminderController.deleteReminder)


export default router;

