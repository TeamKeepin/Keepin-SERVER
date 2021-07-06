import { friendService } from "../services";
import { validationResult } from "express-validator"
const returnCode = require('../library/returnCode');

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
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
const createFriend= async(req,res) => {
    const userIdx = req._id;  
    const {name} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
        status: returnCode.BAD_REQUEST,
        message: "필수 정보(name))를 입력하세요."
        });
    }
    try{
        //중복 check
        const alFriend = await friendService.findFriendByName({name});
        if(alFriend.length>0){
            return res.status(400).json({
                status:400,
                message:"중복된 친구가 있습니다."
            });
        }

        await friendService.saveFriend({name, userIdx});
        return res.status(201).json({
            status:201,
            message:"친구 등록 성공",
            name: name
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

const getFriends= async(req,res) => {
    const userIdx = req._id;
    try{
        const friends = await friendService.findFriendsByUserIdx({userIdx});
        console.log(friends);
        if(friends.length==0){
            return res.status(400).json({
                status:400,
                message:"등록된 친구들이 없음"
            });
        }

        const data = {friends};

        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 조회 성공",
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

const getFriendDetail= async(req,res) => {
    const userIdx = req._id;
    const friendIdx = req.params.friendId;
    try{
        const friend = await friendService.findFriendByFriendIdx({userIdx, friendIdx});
        // console.log(friend);
        if(!friend){
            return res.status(400).json({
                status:400,
                message:"등록된 친구가 없음"
            });
        }

        console.log(friend.keepinIdx);

        const data = {friend};

        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 조회 성공",
            data
        })
    }catch(err){
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

//친구와의 키핀 수 조회 

//친구와의 키핀 조회 

//친구 메모 수정 

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
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * 
 * - [QueryString]: keyword에 검색할 단어를 넣음
 * {
    "name": "보" 
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
                "keepinIdx": [],
                "_id": "60e416d15d759051988d18d0",
                "name": "보리"
            }
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 등록된 친구가 없을 경우
 * {
    "status": 400,
    "message": "등록된 친구들이 없습니다."
 * }
 * 
 */
const searchFriends= async(req,res) => {
    const userIdx = req._id;
    const name = req.query.name;
    try{
        const friends = await friendService.searchFriendByKeyword({name: name, userIdx: userIdx});
        console.log(friends);
        if(friends.length==0){
            return res.status(400).json({
                status:400,
                message:"등록된 친구들이 없습니다."
            });
        }
        // if(!name){
        //     return res.status(400).json({
        //         status:400,
        //         message:"검색어를 입력해주세요."
        //     });
        // }

        const data = {friends};
        
        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 검색 성공",
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
   createFriend,
   getFriends,
   getFriendDetail,
   searchFriends
}
