import {Router} from "express"
import { MovOt, editItemMovOt, editItemService } from "../../controllers/controller.movot";


const MovRouter= Router();


MovRouter.post("/",MovOt);
MovRouter.patch("/update/:id",editItemMovOt);
MovRouter.patch("/updateser/:id",editItemService);


export default MovRouter;

