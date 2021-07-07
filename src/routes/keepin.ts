import express from "express";
import {keepinController} from '../controllers'
import auth from "../middlewares/auth"
const router = express();

/* KEEPIN */
// 키핀하기 생성
router.post('/', auth.checkToken, keepinController.createKeepin)
// 모아보기 받은/준 필터링
router.get('/', auth.checkToken, keepinController.getTakenKeepin)
// 모아보기 전체 검색
router.get('/all', auth.checkToken, keepinController.searchKeepin)
// 모아보기 게시글 상세보기 
router.get('/detail/:keepinIdx', auth.checkToken, keepinController.getDetailKeepin)

export default router;

