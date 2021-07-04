import { friendService } from "../services";
const returnCode = require('../library/returnCode');

const createFriend= async(req,res) => {
    const userIdx = req._id;
    //이름  
    const {name} = req.body;
    try{
        //중복 check
        const friend = await friendService.findFriendByName({name});
        if(friend.length>0){
            return res.status(400).json({
                status:400,
                message:"중복된 친구가 있음"
            });
        }

        await friendService.saveFrined({name,userIdx});
        
        return res.status(201).json({
            status:201,
            message:"친구 등록 성공"
        })
    }catch(err){
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
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


export default {
   createFriend,
   getFriends
}
