import {Request,Response} from "express"


export const userLogin = (req:Request,res:Response) => {

    console.log(req.body); 
    

    res.send("obteniendo acceso");

}

