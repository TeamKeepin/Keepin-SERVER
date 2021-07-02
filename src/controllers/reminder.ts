import {reminderService} from "../services"

const signUp = async (req, res) => {
    try{	
        const { id, password } = req.body
        const createdUser = await reminderService.createUser({ id, password})
    } catch(err) {   
        res.status(500).send("Server Err");
    }
}


export default {
    signUp
}