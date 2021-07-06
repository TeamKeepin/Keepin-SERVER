import { randomService } from "../services";
const returnCode = require('../library/returnCode');

const deleteAllData = async(req,res) => {
    const userIdx = req._id;
    try{
      // 키핀 지우기

      // 리마인더 지우기

      // 친구 지우기
      
    }catch(err){
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message 
        });
        return;
    }
}

const withdraw = async(req,res) => {
  const userIdx = req._id;
  try{
    // 키핀 지우기

    // 리마인더 지우기

    // 친구 지우기

    // 유저에서 유저 지우기

  }catch(err){
      res.status(500).json({
          status: returnCode.INTERNAL_SERVER_ERROR,
          message: err.message 
      });
      return;
  }
}

export default {
  deleteAllData,
  withdraw
}