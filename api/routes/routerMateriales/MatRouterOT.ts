import {Router} from "express"
import { Matot,QueryOt } from "../../controllers/controller.matot";



const matRouterOt = Router();

matRouterOt.get("/:ot", Matot);
matRouterOt.get("/product/:ot", QueryOt)


export default matRouterOt;