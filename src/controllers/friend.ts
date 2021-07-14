import { friendService, keepinService } from '../services';
import { validationResult } from 'express-validator';
import returnCode from '../library/returnCode';
import keepin from '../services/keepin';
import { Console } from 'console';

/**
 * @api {post} /friend 친구 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createFriend
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
    "name": "떠효니🤩"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 201,
    "message": "친구 등록 성공",
    "name": "떠효니🤩"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(name)를 입력하세요."
 * }
 *   
 * 
 * - 400 중복된 값
 * {
    "status": 400,
    "message": "중복된 친구가 있습니다."
 * }
 */
const createFriend = async (req, res) => {
  const userIdx = req._id;
  const { name } = req.body;
  const memo = '';
  const errors = validationResult(req);

  if (name == undefined) {
    res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: '필수 정보(name)를 입력하세요.',
    });
  }

  try {
    //중복 check   //이거 name 하고 userIdx로 해야 함 !
    const alFriend = await friendService.findFriendByNameAnduserIdx({ name, userIdx });
    if (alFriend.length > 0) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '중복된 친구가 있습니다.',
      });
    }

    await friendService.saveFriend({ name, userIdx, memo });
    return res.status(returnCode.CREATED).json({
      status: returnCode.CREATED,
      message: '친구 등록 성공',
      name: name,
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
 * @api {get} /friend 친구 목록 조회
 *
 * @apiVersion 1.0.0
 * @apiName getFriends
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 * {
    "status": 200,
    "message": "친구 조회 성공",
    "data": {
        "friends": [
            {
                "_id": "60ed9ebee51ad110481cd9ef",
                "name": "가으니",
                "memo": ""
            },
            {
                "_id": "60ed9e14e51ad110481cd9cb",
                "name": "떠효니🤩",
                "memo": ""
            },
            {
                "_id": "60ed9ebae51ad110481cd9ec",
                "name": "민지언닝",
                "memo": ""
            },
            {
                "_id": "60eda05e8fb6950b8404cfc8",
                "name": "박박이",
                "memo": ""
            },
        ]
    }
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriends = async (req, res) => {
  const userIdx = req._id;
  try {
    const friends = await friendService.findFriendsByUserIdx({ userIdx });
    // console.log(friends);
    // if(friends.length==0){
    //     return res.status(returnCode.BAD_REQUEST).json({
    //         status:returnCode.BAD_REQUEST,
    //         message:"등록된 친구들이 없습니다."
    //     });
    // }

    const data = { friends };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '친구 조회 성공',
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
 * @api {get} /friend/:friendId 친구 상세 조회
 *
 * @apiVersion 1.0.0
 * @apiName getFriends
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 *
 * * * friendId : 친구 id
 * * /friend/60ed9e98e51ad110481cd9d7
 * 
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 * {
    "status": 200,
    "message": "친구 상세 조회 성공",
    "data": {
        "name": "뽀민이💭",
        "total": 5,
        "taken": 3,
        "given": 2,
        "memo": "보민이 신발 👟 사이즈 230 << 컨버스 개조아함, 제일 좋아하는 책 장르: 소설 📘, 아기자기 귀여운 거 딱히 좋아하지 않음 🙅🏻, 실용적인 거 좋아함 🙆🏻, 요새 헤드셋 🎧 알아보는 것 같음!"
    }
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriendDetail = async (req, res) => {
  const friendIdx = req.params.friendId;
  try {
    const friend = await friendService.findFriendByFriendIdx({ friendIdx });

    // if(!friend){
    //         const data= friend;
    //         return res.status(returnCode.OK).json({
    //         status:returnCode.OK,
    //         message:"친구 상세 조회 성공",
    //         data
    //     });
    // }

    const name = friend.name;
    const memo = friend.memo;
    const keepins = friend.keepinIdx;
    const total = keepins.length;
    let taken = 0;
    let given = 0;
    for (const keepinId of keepins) {
      const keepinIdx = keepinId.toString();
      const keepin = await keepinService.findKeepinByKeepinIdx({ keepinIdx });
      if (keepin.taken === false) {
        given++;
      } else {
        taken++;
      }
    }
    const data = { name, total, taken, given, memo };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '친구 상세 조회 성공',
      data,
    });
  } catch (err) {
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};
/**
 * @api {get} /friend/keepin/:friendId?taken=true 친구에게 받은/준 keepin 목록 조회
 *
 * @apiVersion 1.0.0
 * @apiName getTakenGivenList
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 * @apiParamExample {json} Request-Example:
 *  [Querystring] taken: 준/받은 여부 -> taken: true이면 받은
 *  [params]      friendId : 친구 id
 *  /friend/keepin/60ed9e98e51ad110481cd9d7?taken=true
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
    "status": 200,
    "message": "친구에게 준/받은 keepin 목록 조회 성공",
    "data": {
        "keepins": [
            {
                "_id": "60eda9cd36d5ca07e047a980",
                "title": "가장 달콤했던 생일 선물",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626188234438.png",
                "date": "2021.06.07"
            },
            {
                "_id": "60edad7757025c487c8e611a",
                "title": "라이언보다네가더귀여워알지",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626191569724.jpg",
                "date": "2021.04.20"
            },
            {
                "_id": "60edadcfd4886805c4ca3497",
                "title": "커플 꽃반지 조아",
                "photo": "https://keepin-bucket.s3.ap-northeast-2.amazonaws.com/1626189254295.png",
                "date": "2021.03.28"
            }
        ]
    }
 * }
 *
 * @apiErrorExample Error-Response:
 * -400 친구 확인
 * {
 *  "status": 400,
 *  "message": "일치하는 친구가 없습니다"
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getTakenGivenList = async (req, res) => {
  const friendIdx = req.params.friendId;
  const taken = req.query.taken;

  try {
    //키핀 들 중에서 friendIdx에 friendIdx가 포함되어 있고 taken=true나 false인거 찾아서 보여주기
    //그 keepin들의 date .으로 변환 + photo[0] 뽑아서 보여주기 (for 문)
    const friend = await friendService.findFriendByFriendIdx({ friendIdx });
    if (!friend) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '일치하는 친구가 없습니다',
      });
    }

    const keepinss = await keepinService.findKeepinsByFriendIdxAndTaken({friendIdx,taken});
    var keepins = [];
    for (const keepin of keepinss) {
        const { _id, title, photo } = keepin;
        const year = keepin.date.substring(0, 4);
        const month = keepin.date.substring(5, 7);
        const day = keepin.date.substring(8, 10);
        const tunedDate = year + '.' + month + '.' + day;
        keepin.date = tunedDate;
        const pKeepin = { _id: _id, title: title, photo: photo[0], date: tunedDate, taken: keepin.taken};
        keepins.push(pKeepin);
    }

    const data = { keepins };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '친구에게 준/받은 keepin 목록 조회 성공',
      data,
    });
  } catch (err) {
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {put} /friend/memo/:friendId 친구 메모 수정
 * 
 * @apiVersion 1.0.0
 * @apiName editFriendMemo
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * param :friendId 친구의 Idx
 * /friend/memo/60ed9e98e51ad110481cd9d7
 * 
 * req.body json
 * {
    "memo" : "보민이 신발 👟 사이즈 230 << 컨버스 개조아함, 제일 좋아하는 책 장르: 소설 📘, 아기자기 귀여운 거 딱히 좋아하지 않음 🙅🏻, 실용적인 거 좋아함 🙆🏻, 요새 헤드셋 🎧 알아보는 것 같음!"
 * }
 *  
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "메모 수정 성공",
 *}
 * @apiErrorExample Error-Response:
 * 
 * * -400 req.body 내용 빠짐
 * {
 *  "status": 400,
 *  "message": "memo의 내용을 입력해주세요."
 * }
 * -400 친구 유무 확인
 * {
 *  "status": 400,
 *  "message": "일치하는 친구가 없습니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const editFriendMemo = async (req, res) => {
  const friendIdx = req.params.friendId;
  const { memo } = req.body;

  if (memo == undefined) {
    return res.status(returnCode.BAD_REQUEST).json({
      status: returnCode.BAD_REQUEST,
      message: 'memo의 내용을 입력해주세요.',
    });
  }

  try {
    const friend = await friendService.findFriendByFriendIdx({ friendIdx });
    if (!friend) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '일치하는 친구가 없습니다',
      });
    }

    friend.memo = memo;
    await friend.save();
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '메모 수정 성공',
    });
  } catch (err) {
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {put} /friend/:friendId 친구 이름 수정
 * 
 * @apiVersion 1.0.0
 * @apiName editFriendName
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * 
 * * * friendId : 친구 id
 * * /friend/60ed9e98e51ad110481cd9d7
 * 
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
  * @apiParamExample {json} Request-Example:
 * {
    "name": "쌀보리"
 * }
 *  
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "이름 수정 성공",
 *}
 * @apiErrorExample Error-Response:
 * -400 친구 유무 확인
 * {
 *  "status": 400,
 *  "message": "일치하는 친구가 없습니다."
 * }
 * 
 * -400 친구 이름 중복
 * {
 *  "status": 400,
 *  "message": "중복된 친구가 있습니다."
 * }
 * 
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const editFriendName = async (req, res) => {
  const userIdx = req._Id;
  const friendIdx = req.params.friendId;
  const { name } = req.body;
  try {
    const friend = await friendService.findFriendByFriendIdx({ friendIdx });
    if (!friend) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '일치하는 친구가 없습니다',
      });
    }

    //중복 check   //이거 name 하고 userIdx로 해야 함 !
    const alFriend = await friendService.findFriendByNameAnduserIdx({ name, userIdx });
    if (alFriend.length > 0) {
      return res.status(returnCode.BAD_REQUEST).json({
        status: returnCode.BAD_REQUEST,
        message: '중복된 친구가 있습니다.',
      });
    }

    friend.name = name;
    await friend.save();
    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '이름 수정 성공',
    });
  } catch (err) {
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {delete} /friend/:friendId 친구 삭제
 *
 * @apiVersion 1.0.0
 * @apiName editFriendName
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * * * friendId : 친구 id
 * * /friend/60ed9e98e51ad110481cd9d7
 *
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구 삭제 성공",
 *}
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
//친구 삭제
const deleteFriend = async (req, res) => {
  const friendIdx = req.params.friendId;
  try {
    //1. 친구 찾고 2. 친구 삭제  3. 찾은 친구의 for문으로 keepinIdx의 keepin들 확인하면서 배열 길이가 1이면 삭제 2 이상이면 pull

    await friendService.deleteFriendByFriendIdx({ friendIdx });
    const keepins = await keepinService.findKeepinFriend({ friendIdx });
    for (const keepin of keepins) {
      if (keepin.friendIdx.length > 1) {
        //배열의 길이가 1이상이면 keepin의 friendIdx에서 friend 삭제
        const keepinIdx = keepin._id;
        await keepinService.deleteFriend({ keepinIdx, friendIdx });
      } else if (keepin.friendIdx.length == 1) {
        //배열의 길이가 1이면 삭제
        const keepinIdx = keepin._id;
        await keepinService.deleteKeepinByKeepinIdx({ keepinIdx });
      }
    }

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '친구 삭제 성공',
    });
  } catch (err) {
    res.status(returnCode.INTERNAL_SERVER_ERROR).json({
      status: returnCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
    return;
  }
};

/**
 * @api {get} /friend/search?name=keyword 친구 검색 조회
 * 
 * @apiVersion 1.0.0
 * @apiName searchFriends
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ5YzQwNGIzNjA1NzZkMDgwNWI3YyIsImVtYWlsIjoiYW5kcm9pZEBuYXZlci5jb20iLCJpYXQiOjE2MjYxODUxMjgsImV4cCI6MTYyNjc4OTkyOH0.a9ON9hTHggsO5DlqdVfIeh6rnsI1KB8v8Z8NN8QMKzI"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * 
 * - [QueryString]: keyword에 검색할 단어를 넣음
 * {
    "name": "뽀" 
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 {
    "status": 200,
    "message": "친구 검색 성공",
    "data": {
        "friends": [
            {
                "_id": "60ed9e98e51ad110481cd9d7",
                "name": "뽀민이💭"
            }
        ]
    }
}
 * 
 * 
 */
const searchFriends = async (req, res) => {
  const userIdx = req._id;
  const name = req.query.name;
  try {
    const friends = await friendService.searchFriendByKeyword({ name: name, userIdx: userIdx });
    // if(friends.length==0){
    //     return res.status(returnCode.BAD_REQUEST).json({
    //         status:returnCode.BAD_REQUEST,
    //         message:"등록된 친구 없습니다."
    //     });
    // }
    // if(!name){
    //     return res.status(400).json({
    //         status:400,
    //         message:"검색어를 입력해주세요."
    //     });
    // }

    const data = { friends };

    return res.status(returnCode.OK).json({
      status: returnCode.OK,
      message: '친구 검색 성공',
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

export default {
  createFriend,
  getFriends,
  getFriendDetail,
  getTakenGivenList,
  editFriendMemo,
  editFriendName,
  searchFriends,
  deleteFriend,
};
