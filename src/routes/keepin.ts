import express from "express";
import {keepinController} from '../controllers'

const router = express();

/* keepin */
router.get('/detail', keepinController.signUp); //ok
// router.post('/:idx', keepinController.countryRead); //ok
// router.put('/',keepinController.create); //ok
// router.get('/',keepinController.update); //@@
// router.put('/',keepinController.delete); //ok

export default router;