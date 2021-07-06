import { validationResult } from "express-validator"
import { friendService, keepinService } from "../services";
const returnCode = require('../library/returnCode')

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

  try {
    const data = {
      _id: userIdx,
      title, 
      photo, 
      taken, 
      date, 
      category,
      record,
      friendIdx
    };


    await keepinService.saveKeepin({ title, photo, taken, date, category, record, userIdx, friendIdx});
  


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


export default {
  createKeepin,
  getTakenKeepin,
  searchKeepin
}