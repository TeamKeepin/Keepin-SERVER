import { validationResult } from "express-validator"
import { friendService, keepinService } from "../services";
import returnCode from "../library/returnCode";
import moment from "moment"; 
// const returnCode = require('../library/returnCode')
// const moment = require('moment');

/**
 * @api {post} /keepin 키핀하기 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * taken: 준/받은 여부 -> taken: true이면 받은
 * * friendIdx: friend name을 표시하기 위함
 * 
 * {
    "title": "보리 생일",
    "photo": "보리가 좋아하는 강아지 김밥",
    "taken": false,
    "date": "20211202",
    "category": ["생일", "축하"],
    "record": "우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.",
    "friendIdx":["60e416d15d759051988d18d0", "60e416d95d759051988d18d3"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀하기 생성 성공",
    "keepin": {
        "_id": "60e1d4070e50e39654b4bb5f",
        "title": "보리 생일",
        "photo": "보리가 좋아하는 강아지 김밥",
        "taken": false,
        "date": "2021.12.02",
        "category": [
            "생일",
            "축하"
        ],
        "record": "우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.",
        "friendIdx": [
            "60e416d15d759051988d18d0",
            "60e416d95d759051988d18d3"
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보를 입력하세요."
 * }
 * 
 */

const createKeepin = async (req, res) => {
  const userIdx = req._id;
  const errors = validationResult(req);

  let {title, photo, taken, date, category, record, friendIdx} = req.body;
  if( !title || !photo || taken==undefined || !date || category==undefined || !record ||!friendIdx){
    res.status(400).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.'
    });
    return;
  }

  // const year = date.substring(0,4);
  // const month = date.substring(4,6);
  // const day = date.substring(6);

  // const realDate = year+"."+month+"."+day
  // console.log(realDate);

  try {
    
    const keepin = await keepinService.saveKeepin({ title, photo, taken, date, category, record, userIdx, friendIdx});

    const friends = keepin.friendIdx;
    const keepinIdx = keepin._id;
    
    for(const friendId of friends){
      const friendIdx = friendId.toString();
      const friend = await friendService.findFriendByFriendIdx({friendIdx});
      const keepins = friend.keepinIdx;
      keepins.push(keepinIdx);
      await friend.save();
    }

    return res.status(200).json({
      status: returnCode.OK,
      message: "키핀하기 생성 성공",
      keepin
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

/**
 * @api {get} /keepin?taken=true 모아보기 준/받은 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getTakenKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [Querystring] taken: 준/받은 여부 -> taken: true이면 받은
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "모아보기 준/받은 조회 성공",
    "keepin": [
        {
            "taken": true,
            "_id": "60e420f9909d3063102be161",
            "title": "PM이 탕수육 사줬지롱",
            "photo": "탕수육 사진",
            "date": "2021.06.21"
        }
    ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 taken이 빈 값인 경우
 * {
    "status": 400,
    "message": "준/받은 여부를 선택하세요."
 * }
 * 
 */

const getTakenKeepin = async (req, res) => {
  const userIdx = req._id;
  const taken = req.query.taken;

  if(!taken){
    res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: "준/받은 여부를 선택하세요." 
    });
  }

  try {
    const keepin = await keepinService.findKeepin({taken, userIdx});
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '모아보기 준/받은 조회 성공',
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

/**
 * @api {get} /keepin/all?title=keyword 모아보기 검색어 조회
 * 
 * @apiVersion 1.0.0
 * @apiName searchKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [Querystring] title: 제목으로 검색
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀 검색어 조회 성공",
    "data": [
        {
            "taken": true,
            "_id": "60e420f9909d3063102be161",
            "title": "PM이 탕수육 사줬지롱",
            "photo": "탕수육 사진",
            "date": "2021.06.21"
        }
    ]
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 빈 경우
 * {
    "status": 400,
    "message": "요청바디가 없습니다"."
 * }
 * 
 */

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
      message: '키핀 검색어 조회 성공',
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

/**
 * @api {get} /keepin/detail/:keepinIdx 모아보기 상세페이지 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getDetailKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [params] keepinIdx: 키핀 아이디에 해당하는 게시물
 *  
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀 상세페이지 조회 성공",
    "keepin": {
        "userIdx": "60e1d4070e50e39654b4bb5f",
        "keepinIdx": "60e42158909d3063102be165",
        "title": "보리 생일",
        "photo": "보리가 좋아하는 강아지 김밥",
        "friends": [
            "보리",
            "밀키"
        ],
        "record": "우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.",
        "cateogry": [
            "생일",
            "축하"
        ],
        "date": "2021.12.02",
        "taken": false
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 빈 경우
 * {
    "status": 400,
    "message": "요청바디가 없습니다"."
 * }
 * 
**/

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
      frienddata =  await friendService.findFriendOfKeepin({ friendIdx : friendIds[i].toString() });
      friendNames.push(frienddata.name);
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