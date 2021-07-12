"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const express_validator_1 = require("express-validator");
const returnCode_1 = __importDefault(require("../library/returnCode"));
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 *
 * @apiParamExample {json} Request-Example:
 * {
    "name": "보리"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 201,
    "message": "친구 등록 성공",
    "name": "보리"
 * }
 *
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(name))를 입력하세요."
 * }
 *
 * - 400 중복된 값
 * {
    "status": 400,
    "message": "중복된 친구가 있습니다."
 * }
 */
const createFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    const { name } = req.body;
    const memo = '';
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(returnCode_1.default.BAD_REQUEST).json({
            status: returnCode_1.default.BAD_REQUEST,
            message: '필수 정보(name))를 입력하세요.',
        });
    }
    try {
        //중복 check   //이거 name 하고 userIdx로 해야 함 !
        const alFriend = yield services_1.friendService.findFriendByNameAnduserIdx({ name, userIdx });
        if (alFriend.length > 0) {
            return res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '중복된 친구가 있습니다.',
            });
        }
        yield services_1.friendService.saveFriend({ name, userIdx, memo });
        return res.status(returnCode_1.default.CREATED).json({
            status: returnCode_1.default.CREATED,
            message: '친구 등록 성공',
            name: name,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구 조회 성공",
 *  "data": {
 *            "friends": [
 *             {
 *               "_id": "60e46c82c167c37c296bbf58",
 *               "name": "코코"
 *             },
 *             {
 *               "_id": "60e46d82c167c37c26bbf23",
 *               "name": "밀키"
 *             },
 *             ...
 *           ]
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    try {
        const friends = yield services_1.friendService.findFriendsByUserIdx({ userIdx });
        // console.log(friends);
        // if(friends.length==0){
        //     return res.status(returnCode.BAD_REQUEST).json({
        //         status:returnCode.BAD_REQUEST,
        //         message:"등록된 친구들이 없습니다."
        //     });
        // }
        const data = { friends };
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '친구 조회 성공',
            data,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
/**
 * @api {get} /friend/:friendId 친구 상세 조회
 *
 * @apiVersion 1.0.0
 * @apiName getFriends
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구 상세 조회 성공",
 *  "data": {
 *      "name": "코코",
 *      "total": 3,
 *      "taken": 2,
 *      "given": 1,
 *      "memo": "코코는 초콜릿을 너무 좋아한당"
 *   }
 * }
 *
 * @apiErrorExample Error-Response:
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriendDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendIdx = req.params.friendId;
    try {
        const friend = yield services_1.friendService.findFriendByFriendIdx({ friendIdx });
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
            const keepin = yield services_1.keepinService.findKeepinByKeepinIdx({ keepinIdx });
            if (keepin.taken === false) {
                given++;
            }
            else {
                taken++;
            }
        }
        const data = { name, total, taken, given, memo };
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '친구 상세 조회 성공',
            data,
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
/**
 * @api {get} /friend/keepin/:friendId 친구에게 받은/준 keepin 목록 조회
 *
 * @apiVersion 1.0.0
 * @apiName getTakenGivenList
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구에게 준/받은 keepin 목록 조회 성공",
 *  "data": {
 *       "takenList": [
 *           {
 *               "_id": "60e5ddb55c157b183255b0d1",
 *               "title": "밀키가 좋아하는 장난감 먹었지",
 *               "photo": "밀키가 좋아하는 강아지 뼈다귀",
 *               "date": "2021.12.02"
 *           },
 *           {
 *               "_id": "60e650fe2821d6242df82904",
 *               "title": "메렁 메롱",
 *               "photo": "밀키가 좋아하는 강아지 뼈다귀",
 *               "date": "2021.12.02"
 *           }
 *       ],
 *       "givenList": [
 *           {
 *               "_id": "60e651142821d6242df82908",
 *               "title": "나에게만 선물같아",
 *               "photo": "밀키가 좋아하는 강아지 뼈다귀",
 *               "date": "2021.12.02"
 *           }
 *       ]
 *   }
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
const getTakenGivenList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendIdx = req.params.friendId;
    try {
        const friend = yield services_1.friendService.findFriendByFriendIdx({ friendIdx });
        //내 친구 인지 아닌지 확인
        if (!friend) {
            return res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '일치하는 친구가 없습니다',
            });
        }
        let takenList = [];
        let givenList = [];
        const keepins = friend.keepinIdx;
        for (const keepinId of keepins) {
            const keepinIdx = keepinId.toString();
            const keepin = yield services_1.keepinService.findKeepinForTaken({ keepinIdx });
            const { _id, title, photo } = keepin;
            const year = keepin.date.substring(0, 4);
            const month = keepin.date.substring(5, 7);
            const day = keepin.date.substring(8, 10);
            const tunedDate = year + '.' + month + '.' + day;
            keepin.date = tunedDate;
            const pKeepin = { _id: _id, title: title, photo: photo[0], date: tunedDate };
            if (keepin.taken === false) {
                givenList.push(pKeepin);
            }
            else {
                takenList.push(pKeepin);
            }
        }
        const data = { takenList, givenList };
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '친구에게 준/받은 keepin 목록 조회 성공',
            data,
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 * @apiParamExample {json} Request-Example:
 * {
    "memo": "보리는 수박을 좋아해요"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "메모 수정 성공",
 *}
 * @apiErrorExample Error-Response:
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
const editFriendMemo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendIdx = req.params.friendId;
    const { memo } = req.body;
    try {
        const friend = yield services_1.friendService.findFriendByFriendIdx({ friendIdx });
        if (!friend) {
            return res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '일치하는 친구가 없습니다',
            });
        }
        friend.memo = memo;
        yield friend.save();
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '메모 수정 성공',
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
/**
 * @api {put} /friend/:friendId 친구 이름 수정
 *
 * @apiVersion 1.0.0
 * @apiName editFriendName
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
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
const editFriendName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._Id;
    const friendIdx = req.params.friendId;
    const { name } = req.body;
    try {
        const friend = yield services_1.friendService.findFriendByFriendIdx({ friendIdx });
        if (!friend) {
            return res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '일치하는 친구가 없습니다',
            });
        }
        //중복 check   //이거 name 하고 userIdx로 해야 함 !
        const alFriend = yield services_1.friendService.findFriendByNameAnduserIdx({ name, userIdx });
        if (alFriend.length > 0) {
            return res.status(returnCode_1.default.BAD_REQUEST).json({
                status: returnCode_1.default.BAD_REQUEST,
                message: '중복된 친구가 있습니다.',
            });
        }
        friend.name = name;
        yield friend.save();
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '이름 수정 성공',
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
/**
 * @api {delete} /friend/:friendId 친구 삭제
 *
 * @apiVersion 1.0.0
 * @apiName editFriendName
 * @apiGroup Friend
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
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
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendIdx = req.params.friendId;
    try {
        //1. 친구 찾고 2. 친구 삭제  3. 찾은 친구의 for문으로 keepinIdx의 keepin들 확인하면서 배열 길이가 1이면 삭제 2 이상이면 pull
        yield services_1.friendService.deleteFriendByFriendIdx({ friendIdx });
        const keepins = yield services_1.keepinService.findKeepinFriend({ friendIdx });
        for (const keepin of keepins) {
            console.log(keepin.friendIdx.length);
            if (keepin.friendIdx.length > 1) {
                //배열의 길이가 1이상이면 keepin의 friendIdx에서 friend 삭제
                const keepinIdx = keepin._id;
                yield services_1.keepinService.deleteFriend({ keepinIdx, friendIdx });
            }
            else if (keepin.friendIdx.length == 1) {
                //배열의 길이가 1이면 삭제
                const keepinIdx = keepin._id;
                yield services_1.keepinService.deleteKeepinByKeepinIdx({ keepinIdx });
            }
        }
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '친구 삭제 성공',
        });
    }
    catch (err) {
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTM0OTg5MzQ2MGVjMzk4ZWExZGM0NSIsImVtYWlsIjoiZmJkdWRkbjk3QG5hdmVyLmNvbSIsImlhdCI6MTYyNTcxNjY2OCwiZXhwIjoxNjI1NzUyNjY4fQ.dPel-hfK740tlHQNpLRxClb6SldfDduiAeSGOFf7vg4"
 * }
 *
 * @apiParamExample {json} Request-Example:
 *
 * - [QueryString]: keyword에 검색할 단어를 넣음
 * {
    "name": "보리"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "친구 검색 성공",
    "data": {
        "friends": [
            {
                "_id": "60e416d15d759051988d18d0",
                "name": "보리"
            }
        ]
    }
 * }
 *
 *
 */
const searchFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdx = req._id;
    const name = req.query.name;
    try {
        const friends = yield services_1.friendService.searchFriendByKeyword({ name: name, userIdx: userIdx });
        console.log(friends);
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
        return res.status(returnCode_1.default.OK).json({
            status: returnCode_1.default.OK,
            message: '친구 검색 성공',
            data,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(returnCode_1.default.INTERNAL_SERVER_ERROR).json({
            status: returnCode_1.default.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
});
exports.default = {
    createFriend,
    getFriends,
    getFriendDetail,
    getTakenGivenList,
    editFriendMemo,
    editFriendName,
    searchFriends,
    deleteFriend,
};
//# sourceMappingURL=friend.js.map