import {Router} from  "express"
import {userLogin} from "../../controllers/controller.user";


const userRouter = Router();

userRouter.post("/",userLogin);



export default userRouter;