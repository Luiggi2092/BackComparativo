import express,{ Request, Response, NextFunction } from "express";
import router from "./routes/index";



const server = express();



server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((_req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,PATCH");
    next();
  });
server.use("/",router);


export default server;