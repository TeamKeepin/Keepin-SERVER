import { validationResult } from 'express-validator';
import { friendService, keepinService } from '../services';
import returnCode from '../library/returnCode';
import mongoose from 'mongoose';
import moment from 'moment';
import { LexRuntime } from 'aws-sdk';

/**
 * @api {post} /keepin/all 키핀하기 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * 
 * {
    "title": "가장 달콤했던 생일 선물",
    "taken": true,
    "date": "2021-06-07",
    "category": ["생일", "축하"],
    "record": "뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!",
    "friendIdx":["60ed9e98e51ad110481cd9d7"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀하기 생성 성공",
    "data": {
        "keepinIdx": "60eda9cd36d5ca07e047a980"
    }
}
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

  console.log(req.files);

  if (!title || taken == undefined || !date || !friendIdx) {
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
 * @api {post} /keepin 키핀하기 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createKeepinText
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * 
 * {
    "title": "가장 달콤했던 생일 선물",
    "taken": true,
    "date": "2021-06-07",
    "category": ["생일", "축하"],
    "record": "뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!",
    "friendIdx":["60ed9e98e51ad110481cd9d7"]
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀하기 생성 성공",
    "data": {
        "keepinIdx": "60eda9cd36d5ca07e047a980"
    }
}
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보를 입력하세요."
 * }
 * 
 */

//키핀 등록하기 
 const createKeepinText = async (req, res) => {
    const userIdx = req._id;
    const errors = validationResult(req);
    console.log(req.body);
    let { title, taken, date, category, record, friendIdx } = req.body;
  
    if (!title || taken == undefined || !date || !friendIdx) {
      res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '필수 정보를 입력하세요.',
      });
      return;
    }

    try {
      const keepin = await keepinService.saveKeepinText({ title, taken, date, category, record, userIdx, friendIdx });
  
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
      const data = {keepinIdx};
      return res.status(returnCode.OK).json({
        status: returnCode.OK,
        message: '키핀하기 생성 반 성공',
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
 * @api {post}  /keepin/photo/:keepinIdx 키핀하기 이미지 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createKeepinPhoto
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "multipart/form-data"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * @apiParamExample {json} Request-Example:
 * {
    "photo":[".jpg"] *file로 보내주세요
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "키핀하기 생성 완전 성공",
}
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보를 입력하세요."
 * }
 * 
 */

//키핀 사진 올리기 
const createKeepinPhoto = async (req, res) => {
  const userIdx = req._id;
  const keepinIdx = req.params.keepinIdx;
  const errors = validationResult(req);
  console.log(req.files);

  let locationArray; // 함수 안에 있는거 호출 못함. 지역변수임.
  if (req.files !== undefined) {
    locationArray = req.files.map((img) => img.location);
  }

  try {
    const keepin = await keepinService.saveKeepinPhoto({photo:locationArray, keepinIdx:keepinIdx });

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '키핀하기 생성 완전 성공'
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
 * @api {get} /keepin?taken=true&recent=true 모아보기 준/받은 및 최신순/오래된순 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getTakenKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [Querystring] taken: 준/받은 여부 -> taken: true이면 받은
 * * [Querystring] recent: 오래된순/최신순 여부 -> recent: true이면 최신순
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
 * @apiErrorExample Error-Response:
 * - 400 recent이 빈 값인 경우
 * {
    "status": 400,
    "message": "최신순/오래된순 여부를 선택하세요."
 * }
 * 
 */

const getTakenKeepin = async (req, res) => {
  const userIdx = req._id;
  const taken = req.query.taken;
  const recent = req.query.recent;

  if (!taken) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '준/받은 여부를 선택하세요.',
    });
  }

  if (!recent) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '최신순/오래된순 여부를 선택하세요.',
    });
  }

  try {
    const keepinss = await keepinService.findKeepin({ recent: recent, taken: taken, userIdx: userIdx });

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
      message: '모아보기 준/받은 및 최신순/오래된 순 조회 성공',
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * [Querystring] category: category로 검색 (생일, 기념일, 축하, 칭찬, 응원, 감사, 깜작, 기타)
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "카테고리 조회 성공",
    "data": {
        "keepins": [
            {
                "_id": "60eda9cd36d5ca07e047a980",
                "title": "가장 달콤했던 생일 선물",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188234438.png",
                "date": "2021.06.07"
            },
            {
                "_id": "60edab3acc671c4288b4bc50",
                "title": "생일 선물 = 살림살이 선물",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188583821.png",
                "date": "2021.06.07"
            },
            {
                "_id": "60edaebbd4886805c4ca349f",
                "title": "밀키맘 김보 생일",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189491228.png",
                "date": "2021.03.11"
            },
            {
                "_id": "60edaef6d4886805c4ca34a3",
                "title": "Happy Birthday♥",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189557188.png",
                "date": "2021.02.22"
            }
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
  let pass = false;
  if (
    category === '생일' ||
    category === '기념일' ||
    category === '축하' ||
    category === '칭찬' ||
    category === '응원' ||
    category === '감사' ||
    category === '깜짝' ||
    category === '기타'
  ) {
    pass = true;
  }

  if (pass === false) {
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
        "_id": "60edad7757025c487c8e611a",
        "title": "라이언보다네가더귀여워알지",
        "photo": [
            "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189174825.jpg"
        ],
        "friends": [
            {
                "_id": "60ed9e98e51ad110481cd9d7",
                "name": "뽀민이💭"
            }
        ],
        "record": "칭찬 백만 개와 함께 또 깜짝 선물을 주고 가신 보민 선배... 무려 손목보호패드다. 귀여워서 못 쓰겠어.",
        "category": [
            "칭찬",
            "깜짝"
        ],
        "date": "2021.04.20",
        "taken": true
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

    //friend의 이름 가져오기
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
 * @api {put} /keepin/modify/:keepinId 키핀 수정
 * 
 * @apiVersion 1.0.0
 * @apiName modifyKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "multipart/form-data"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * * url: /keepin/modify/60e5bdc46c3cdb135f1da1dc
 * * keepinId : 키핀 Id
 * 
 * {
    "title": "가장 달콤했던 생일 선물",
    "photo": ["KakaoTalk_20210109_164556314_01.jpg"],  (file로 올려주세요)
    "taken": true,
    "date": "2021-06-07",
    "category": ["생일", "축하"],
    "record": "뽀민이 정말 앙큼하다. 나 몰래 케이크 주문해놓고 얼레벌레 들고 등장했다 >,< 귀여워!! 꽃 너무 예뻐서 드라이플라워로 간직할 거당. 케이크 너무 맛있었다. 보민이 생일날엔 더 맛있는 거 사줘야지!!",
    "friendIdx":["60ed9e98e51ad110481cd9d7"]
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
    "message": "필수 정보를 입력하세요."
 * }
 *
 */
// 키핀 수정
const modifyKeepin = async (req, res) => {
  const userIdx = req._id;
  const keepinId = req.params.keepinIdx;
  const errors = validationResult(req);

  let { title, taken, date, category, record, friendIdx } = req.body;
  if (!title || taken == undefined || !date || !friendIdx) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보를 입력하세요.',
    });
    return;
  }

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

  try {
    const ll = await friendService.findFriendsByKeepinIdx({ keepinIdx: keepinId }); // keepinId 하나씩 삭제

    var data = await keepinService.modifyKeepinByKeepinIdx({
      keepinIdx: keepinId,
      title,
      photo: locationArray,
      taken,
      date,
      category,
      record,
      friendIdx, //수정된 친구 배열이 다시 덮어쓰기 됨 : [실버영, 김씨워터]
    });

    for (var friendId of friendIdx) {
      const friendResult = await friendService.saveKeepinInFriend({ keepinIdx: keepinId, friendIdx: friendId });
    }

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
 * @api {post} /keepin/delete 키핀 삭제
 * 
 * @apiVersion 1.0.0
 * @apiName deleteKeepin
 * @apiGroup Keepin
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
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
 *    "status": 200,
 *    "message": "키핀 삭제 완료"
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
  createKeepinText,
  createKeepinPhoto,
  getTakenKeepin,
  searchKeepin,
  getKeepinByCategory,
  getDetailKeepin,
  modifyKeepin,
  deleteKeepin,
};
