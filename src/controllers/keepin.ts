import { validationResult } from "express-validator"
import { userService, keepinService } from "../services";
const returnCode = require('../library/returnCode')

const createKeepin = async (req, res) => {
  const userId = req._id;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: "요청바디가 없습니다."
    });
  }

  let {title, photo, taken, date, category, record} = req.body;
  if( !title || !photo || taken==undefined || !date || category==undefined || !record){
    console.log(title, photo, taken, date, category, record);
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.'
    });
    return;
  }

  try {
    const data = {
      _id: userId,
      title, 
      photo, 
      taken, 
      date, 
      category,
      record
    };

    await keepinService.saveKeepin({ title, photo, taken, date, category, record, userIdx: userId });
    return res.status(200).json({
      status: returnCode.OK,
      message: "키핀하기 생성 성공",
      data
    });
  } catch (error) {
    console.error(error.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: error.message
        });
  }
}

const getAllKeepin = async (req, res) => {
  const userId = req._id;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: "요청바디가 없습니다." 
    });
  }

  try {
    const data = await keepinService.findKeepin({userIdx:userId});
    
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
  getAllKeepin
}