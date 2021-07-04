import { randomService } from "../services";
const returnCode = require('../library/returnCode');

// await reminderService.saveReminder({  title, date, sendDate: realDate, isAlarm, isImportant, userIdx });
// return res.status(200).json({msg: '리마인더 생성 성공', data});

const getRandom= async(req,res) => {
    const userIdx = req._id;
    try{
        // keepin에서 뽑아서 title, photo, taken, date, category, record, friend 주기 
        // 뽑은 유저 keepin 중에서 random으로 하나만 보여주기 
        const data = randomService.findRandom(userIdx);
        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"랜덤 키핀 조회 성공",
            data
        })
    }catch(err){
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: err.message }],
        });
    }
}

export default {
   getRandom
}