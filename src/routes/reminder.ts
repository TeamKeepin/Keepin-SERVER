import express from "express";
import {reminderController} from '../controllers'

const router = express();


/* Reminder */
router.get('/', reminderController.signUp); //ok
// router.get('/:month', reminderController.countryRead); //ok
// router.post('/:idx',reminderController.create); //ok
// router.put('/',reminderController.update); //@@
// router.delete('/latest',reminderController.delete); //ok

export default router;