import { Router } from "express";
import { MatotReal } from "../../controllers/controller.matot";



const realMatOt = Router();


realMatOt.get("/:ot",MatotReal);


export default realMatOt;