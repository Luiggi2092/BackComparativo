import { Router } from "express";
import { OCCOM } from "../../controllers/controller.occom";


const OCOMRouter = Router();


OCOMRouter.post("/", OCCOM );



export default OCOMRouter;