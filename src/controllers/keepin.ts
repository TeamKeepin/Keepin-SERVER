import { validationResult } from "express-validator"
import { friendService, keepinService } from "../services";
const returnCode = require('../library/returnCode')
const moment = require('moment');

const createKeepin = async (req, res) => {
  const userIdx = req._id;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: "요청바디가 없습니다."
    });
  }

  let {title, photo, taken, date, category, record, friendIdx} = req.body;
  if( !title || !photo || taken==undefined || !date || category==undefined || !record){
    console.log(title, photo, taken, date, category, record, friendIdx);
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.'
    });
    return;
  }

  const year = date.substring(0,4);
  const month = date.substring(4,6);
  const day = date.substring(6);

  const realDate = year+"."+month+"."+day
  console.log(realDate);

  try {
    const data = {
      _id: userIdx,
      title, 
      photo, 
      taken, 
      date: realDate, 
      category,
      record,
      friendIdx,
    };


    await keepinService.saveKeepin({ title, photo, taken, date: realDate, category, record, userIdx, friendIdx});
  


    return res.status(200).json({
      status: returnCode.OK,
      message: "키핀하기 생성 성공",
      data
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
        status: returnCode.INTERNAL_SERVER_ERROR,
        message: err.message,
    });
    return;
}
}

const getTakenKeepin = async (req, res) => {
  const userIdx = req._id;
  const taken = req.query.taken;
  const errors = validationResult(req);
  console.log(taken);

  if(!errors.isEmpty()){
    res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: "요청바디가 없습니다." 
    });
  }

  try {
    const data = await keepinService.findKeepin({taken, userIdx});
    
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀 목록 조회 성공',
      data
    })
    } catch (err) {
      console.error(err.message);
      res.status(returnCode.INTERNAL_SERVER_ERROR).json({
          status: returnCode.INTERNAL_SERVER_ERROR,
          message: err.message,
      });
      return;
  }
}

const searchKeepin = async (req, res) => {
  const userIdx = req._id;
  const title = req.query.title;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: "요청바디가 없습니다." 
    });
  }

  try {
    const data = await keepinService.searchKeepinByKeyword({title, userIdx});
    
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀 목록 조회 성공',
      data
    })
    } catch (err) {
      console.error(err.message);
      res.status(returnCode.INTERNAL_SERVER_ERROR).json({
          status: returnCode.INTERNAL_SERVER_ERROR,
          message: err.message,
      });
      return;
  }
}

const getDetailKeepin = async (req, res) => {
  const userIdx = req._id;
  const keepinIdx = req.params.keepinIdx;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: "요청바디가 없습니다." 
    });
  }

  try {
    const detail = await keepinService.findDetailKeepin({ userIdx:userIdx, keepinIdx:keepinIdx });
    //friend의 이름 가져오기
    var friendNames = [];
    const friendIds = detail.friendIdx;
    var frienddata;
    for (var i=0; i<friendIds.length; i++) {
      frienddata =  await friendService.findKeepinFriend({ friendIdx : friendIds[i].toString() });
      friendNames.push(frienddata.name);
      console.log(friendNames)
    }

    const keepin ={
      userIdx: userIdx,
      keepinIdx: detail._id,
      title: detail.title,
      photo: detail.photo,
      friends: friendNames,
      record: detail.record,
      cateogry: detail.category,
      date: detail.date,
      taken: detail.taken
    }

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀 상세페이지 조회 성공',
      keepin
    })
    } catch (err) {
      console.error(err.message);
      res.status(returnCode.INTERNAL_SERVER_ERROR).json({
          status: returnCode.INTERNAL_SERVER_ERROR,
          message: err.message,
      });
      return;
  }
}

export default {
  createKeepin,
  getTakenKeepin,
  searchKeepin,
  getDetailKeepin
}