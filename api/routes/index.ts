import {Router} from "express" 
import userRouter from "./routerUsers/userRouter";
import matRouterOt from "./routerMateriales/MatRouterOT";
import MovRouter from "./routerMov/MatRouterMov";
import OCOMRouter from "./routerOCompras/OcomRouterSer"
import realMatOt from "./routerRealvsPresupuestado/realpresRouter";
import reportOt from "./routerReportes/reportesRouter";


const router = Router();


router.use("/user",userRouter);
router.use("/matot", matRouterOt );
router.use("/movot", MovRouter );
router.use("/occom", OCOMRouter);
router.use("/realot", realMatOt);
router.use("/generarpdf", reportOt);






export default router;