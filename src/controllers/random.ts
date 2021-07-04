import { randomService } from "../services";
const returnCode = require('../library/returnCode');

// await reminderService.saveReminder({  title, date, sendDate: realDate, isAlarm, isImportant, userIdx });
// return res.status(200).json({msg: '리마인더 생성 성공', data});

const getRandom= async(req,res) => {
    const userIdx = req._id;
    try{
      
        // 친구들도 뽑아서 보여줘야 한다 ! 
        const randoms = await randomService.findRandoms({userIdx});
        const randomNumber = Math.floor(Math.random() * randoms.length+1);
        const randomId = randoms[randomNumber]._id;
        const data = await randomService.findRandom({randomId});

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