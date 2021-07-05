import express from "express";
import {friendController} from '../controllers'
import { check } from "express-validator"
import auth from "../middlewares/auth"
const router = express();

/* Friend */
router.post('/',auth.checkToken,[
    check("name", "Name is required").not().isEmpty(),
    check(
      "name",
      "Please enter a name with 5 or less characters"
    ).isLength({ max: 5 }),
  ],friendController.createFriend);

router.get('/',auth.checkToken, friendController.getFriends);
router.get('/friendId',auth.checkToken,friendController.getFriendDetail);
// router.get('/taken/:friendId',auth.checkToken,friendController.getTakenList);
// router.get('/given/:friendId',auth.checkToken,friendController.getGivenList);

router.get('/search', auth.checkToken, friendController.searchFriends);


export default router;