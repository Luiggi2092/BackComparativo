import { Request,Response } from "express"
import { getConnection } from "../db";
import sql from "mssql";



export const OCCOM = async(req:Request, res:Response) => {
   
    console.log(req.body);

    try{
        const {Enlace,IocCod,IocTip,IocPro,IocDes,IocCan,IocPun,Ioctot,IocOp} = req.body;

        const pool = await getConnection();

          




        if(pool){
            
       const result = await pool.request()
           .input('Enlace', sql.Char,Enlace)
           .input('IocCod',sql.Char,IocCod)
           .input('IocTip', sql.Char,IocTip)
           .input('IocPro', sql.Char, IocPro)
           .input('IocDes',sql.Text, IocDes)
           .input('IocCan',sql.Real,IocCan)
           .input('IocPun',sql.Float,IocPun)
           .input('Ioctot',sql.Float,Ioctot)
           .input('IocOp',sql.VarChar,IocOp)
           .query(`
             INSERT INTO compras.dbo.ItOCompras (
                Enlace,IocCod,IocTip,IocPro,IocUni,IocDes,IocCan,
                IocPun,IocFac,IocProg,IocReal,IocEmpresa,IocClasific,
                IocTipo,IocCanF,Ioctot,IocIgv,IocMin,IocMaq,IocReq,
                IocOp,IocUser,IocFUser

             )
             VALUES 
             (@Enlace,@IocCod,@IocTip,@IocPro,null,@IocDes,@IocCan,@IocPun,null,null,null,null,null,null,null,@Ioctot,null,null,null,null,@IocOp,null,null) `)

             console.log(result);
        }

        
        res.status(200).send("Datos Enviados correctamente"); 

         
    }catch(error){

        console.log(`Error al insertar datos :`, error);
        res.status(500).send("Error al insertar datos");

    }
    

}