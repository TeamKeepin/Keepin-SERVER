import express from "express";
import {userController} from '../controllers'
import { check } from "express-validator"
const router = express();

/* User */
router.post('/signup', 
[
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
], userController.signUp)

router.post('/signin',
[
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
], userController.signIn)
//로그인 /auth로 되어 있는데 router하나 더 파야 하나 ??
// router.post('/~',userController.login)

export default router;

