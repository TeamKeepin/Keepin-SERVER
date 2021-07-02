import express from "express";
import {myController} from '../controllers'

const router = express();

/* My */
router.get('/',myController.signUp)
// router.post('/profile',myController.login)
// router.put('/profile',myController.login)

export default router;