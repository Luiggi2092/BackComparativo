import { Router } from "express";
import { MatotRealPdf } from "../../controllers/controller.reportpdf";

const reportOt = Router();


reportOt.post("/",MatotRealPdf);

export default reportOt;

