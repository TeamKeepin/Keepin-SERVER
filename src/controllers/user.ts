import {userService} from "../services"
// import auth from "../middleware/auth";


const signUp = async (req, res) => {
    try{	
        const { id, password } = req.body
        const createdUser = await userService.createUser({ id, password})
    } catch(err) {   
        res.status(500).send("Server Err");
    }
}

export default {
    signUp
}