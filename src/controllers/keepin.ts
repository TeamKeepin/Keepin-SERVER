import { validationResult } from 'express-validator';
import { friendService, keepinService } from '../services';
import returnCode from '../library/returnCode';
import mongoose from 'mongoose';
import moment from 'moment';
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
    "Content-Type": "multipart/form-data"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * taken: 준/받은 여부 -> taken: true이면 받은
 * * friendIdx: friend name을 표시하기 위함
 * 
 * {
    "title": "보리 생일",
    "photo": ["KakaoTalk_20210109_164556314_01.jpg"],  (file로 올려주세요)
    "taken": false,
    "date": "2021-12-02",
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
        "photo": ["보리가 좋아하는 강아지 김밥"],
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

  let { title, taken, date, category, record, friendIdx } = req.body;

  if (!title || taken == undefined || !date || category == undefined || !record || !friendIdx) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.',
    });
    return;
  }

  //이미지가 안들어 왔을때 null로 저장, 들어오면 S3 url 저장
  // let photo = null;

  var locationArray; // 함수 안에 있는거 호출 못함. 지역변수임.

  if (req.files !== undefined) {
    locationArray = req.files.map((img) => img.location);

    //형식은 고려해보자
    // const type = req.files.mimetype.split('/')[1];
    // if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
    //   return res.status(401).send(util.fail(401, '유효하지 않은 형식입니다.'));
    // }
  }

  //photo: locationArray
  //var locationArray = ["abc","def"];

  try {
    const keepin = await keepinService.saveKeepin({ title, photo: locationArray, taken, date, category, record, userIdx, friendIdx });

    const friends = keepin.friendIdx;
    const keepinIdx = keepin._id;

    for (const friendId of friends) {
      const friendIdx = friendId.toString();
      const friend = await friendService.findFriendByFriendIdx({ friendIdx });
      const keepins = friend.keepinIdx;
      keepins.push(keepinIdx);
      await friend.save();
    }

    // await friend.save()를 서비스 호출로 변경하면 좋겠다 !
    // await friendService.saveKeepinInFriend({friendIdx: friendIdx, keepinArray:keepins}); //keepins배열을 서비스에 넘김

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀하기 생성 성공',
      keepin,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
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
    "data":{
        "keepins":[
          {
            "taken": true,
            "_id": "60e420f9909d3063102be161",
            "title": "PM이 탕수육 사줬지롱",
            "photo": "탕수육 사진",
            "date": "2021.06.21"
          }
        ]
    }
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

  if (!taken) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '준/받은 여부를 선택하세요.',
    });
  }

  try {
    const keepinss = await keepinService.findKeepin({ taken, userIdx });

    const keepins = [];

    for (var i = 0; i < keepinss.length; i++) {
      const year = keepinss[i].date.substring(0, 4);
      const month = keepinss[i].date.substring(5, 7);
      const day = keepinss[i].date.substring(8, 10);
      const tunedDate = year + '.' + month + '.' + day;
      const { _id, taken, title, photo } = keepinss[i];
      const pKeepin = { _id: _id, taken: taken, title: title, photo: photo[0], date: tunedDate };
      keepins.push(pKeepin);
    }

    const data = { keepins };
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '모아보기 준/받은 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
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
    "data": {
      "keepins":[
          {
            "taken": true,
            "_id": "60e420f9909d3063102be161",
            "title": "PM이 탕수육 사줬지롱",
            "photo": "탕수육 사진",
            "date": "2021.06.21"
         }
         ...
      ]
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
 */

const searchKeepin = async (req, res) => {
  const userIdx = req._id;
  const title = req.query.title;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  try {
    const keepinss = await keepinService.searchKeepinByKeyword({ title, userIdx });

    const keepins = [];

    for (var keepin of keepinss) {
      const year = keepin.date.substring(0, 4);
      const month = keepin.date.substring(5, 7);
      const day = keepin.date.substring(8, 10);
      const tunedDate = year + '.' + month + '.' + day;
      const { _id, taken, title, photo } = keepin;
      const pKeepin = { _id: _id, taken: taken, title: title, photo: photo[0], date: tunedDate };
      keepins.push(pKeepin);
    }

    const data = { keepins };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀 검색어 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {get} /keepin/category?category=keyword 모아보기 카테고리 별 조회
 * 
 * @apiVersion 1.0.0
 * @apiName searchKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [Querystring] category: category로 검색 (생일, 기념일, 축하, 칭찬, 응원, 감사, 깜작, 기타)
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀 카테고리 별 조회 성공",
    "data": {
        "keepins":[
          { 
            "_id": "60e420f9909d3063102be161",
            "title": "PM이 탕수육 사줬지롱",
            "photo": "탕수육 사진",
            "date": "2021.06.21"
          },
          ... 
        ]
      }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 빈 경우
 * {
    "status": 400,
    "message": "요청바디가 없습니다"."
 * }
 * - 400 category가 정해진 8개 중에 있는 것인 지 확인
 * {
    "status": 400,
    "message": "존재하지 않는 카테고리 입니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getKeepinByCategory = async (req, res) => {
  const userIdx = req._id;
  const category = req.query.category;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }
  //(생일, 기념일, 축하, 칭찬, 응원, 감사, 깜짝, 기타)
  let pass=false;
  if(category==="생일" || category==="기넘일" || category==="축하" || category==="칭찬" || category==="응원" || category==="감사" || category==="깜짝" || category==="기타"){
    pass=true;
  }
  
  if(pass===false){
    return res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '존재하지 않는 카테고리 입니다.',
    });
  }

  try {
    const keepinss = await keepinService.findkeepinByUserIdxAndCategory({ category, userIdx });
    const keepins = [];

    for (var keepin of keepinss) {
      const year = keepin.date.substring(0, 4);
      const month = keepin.date.substring(5, 7);
      const day = keepin.date.substring(8, 10);
      const tunedDate = year + '.' + month + '.' + day;
      const { _id, taken, title, photo } = keepin;
      const pKeepin = { _id: _id, title: title, photo: photo[0], date: tunedDate };
      keepins.push(pKeepin);
    }

    const data = { keepins };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '카테고리 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
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
    "data": {
        "_id": "60e42158909d3063102be165",
        "title": "보리 생일",
        "photo": ["보리가 좋아하는 강아지 김밥"],
       "friends": [
            {
                "_id": "60ec0be1dc961a2d4c31d115",
                "name": "눈부신서버"
            },
            {
                "_id": "60ebb30ebee2d727e34a004d",
                "name": "든든한서버"
            }
        ],
        "record": "우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.",
        "category": [
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
  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  try {
    const detail = await keepinService.findDetailKeepin({ userIdx: userIdx, keepinIdx: keepinIdx });
    // console.log(detail);
    // console.log(detail.friendIdx);

    // friend의 이름 가져오기
    // var friendNames = [];
    // const friendIds = detail.friendIdx;
    // var frienddata;
    // for (var i=0; i<friendIds.length; i++) {
    //   frienddata =  await friendService.findKeepinFriend({ friendIdx : friendIds[i].toString() });
    //   console.log(friendIds[i])
    //   friendNames.push(frienddata.name);
    // }

    const year = detail.date.substring(0, 4);
    const month = detail.date.substring(5, 7);
    const day = detail.date.substring(8, 10);
    const tunedDate = year + '.' + month + '.' + day;

    const data = {
      _id: detail._id,
      title: detail.title,
      photo: detail.photo,
      friends: detail.friendIdx,
      record: detail.record,
      category: detail.category,
      date: tunedDate,
      taken: detail.taken,
    };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀 상세페이지 조회 성공',
      data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {put} /keepin 키핀 수정
 * 
 * @apiVersion 1.0.0
 * @apiName modifyKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "multipart/form-data"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * taken: 준/받은 여부 -> taken: true이면 받은
 * * friendIdx: friend name을 표시하기 위함
 * 
 * 
 * {
    "title": "보리 생일",
    "photo": ["KakaoTalk_20210109_164556314_01.jpg"],  (file로 올려주세요)
    "taken": false,
    "date": "2021-12-02",
    "category": ["생일", "축하"],
    "record": "우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.",
    "friendIdx":["60e416d15d759051988d18d0", "60e416d95d759051988d18d3"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
     "status": 200,
     "message": "키핀 수정 완료"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "keepinID Array 값이 없습니다."
 * }
 *
 */
// 키핀 수정
const modifyKeepin = async (req, res) => {
  const userIdx = req._id;
  const keepinId = req.params.keepinIdx;
  const errors = validationResult(req);

  let { title, taken, date, category, record, friendIdx } = req.body;
  if (!title || taken == undefined || !date || category == undefined || !record || !friendIdx) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.',
    });
    return;
  }

  //이미지가 안들어 왔을때 null로 저장, 들어오면 S3 url 저장
  // let photo = null;

  var locationArray; // 함수 안에 있는거 호출 못함. 지역변수임.

  if (req.files !== undefined) {
    locationArray = req.files.map((img) => img.location);

    /*
    //형식은 고려해보자
    const type = req.files.mimetype.split('/')[1];
    if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
      return res.status(401).send(util.fail(401, '유효하지 않은 형식입니다.'));
    }*/
  }

  //photo: locationArray

  try {
    var data = await keepinService.modifyKeepinByKeepinIdx({
      keepinIdx: keepinId,
      title,
      photo: locationArray,
      taken,
      date,
      category,
      record,
      friendIdx,
    });

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '키핀 수정 완료' });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {delete} /keepin 키핀 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName deleteKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNjA1OTA3OSwiZXhwIjoxNjI2NjYzODc5fQ.9Ieyu_3jj7T2zGwrOwcL5bqs7CmxO02sWyQO9ItrIiw"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
    "keepinArray": ["60e322167887874ecccad066"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
     "status": 200,
     "message": "키핀 삭제 완료"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "keepinID Array 값이 없습니다."
 * }
 *
 */
// 키핀 삭제
const deleteKeepin = async (req, res) => {
  const keepinIdArray = req.body.keepinArray; //배열로 keepinId 값들을 받음
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '요청바디가 없습니다.',
    });
  }

  if (!keepinIdArray || keepinIdArray.length == 0) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: 'keepinID Array 값이 없습니다.',
    });
  }

  try {
    // 친구 삭제 로직
    const ll = await friendService.findFriendsByKeepinIdx({ keepinIdx: keepinIdArray[0].toString() }); // keepinId 하나씩 삭제

    // 배열의 원소를 하나씩 접근하는 반복문을 이용해 삭제 프로세스를 진행
    for (var keepinId of keepinIdArray) {
      await keepinService.deleteKeepinByKeepinIdx({ keepinIdx: keepinId }); // reminderId 하나씩 삭제
    }

    return res.status(returnCode.OK).json({ status: returnCode.OK, message: '키핀 삭제 완료' });
  } catch (err) {
    console.error(err.message);
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

export default {
  createKeepin,
  getTakenKeepin,
  searchKeepin,
  getKeepinByCategory,
  getDetailKeepin,
  modifyKeepin,
  deleteKeepin,
};
