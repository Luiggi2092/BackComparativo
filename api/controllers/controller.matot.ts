import { Request,Response } from "express";
import { getConnection } from "../db";
import sql from "mssql"



export const Matot = async(req : Request,res : Response) => {

    

    const pool = await getConnection();
    
   /* const result = await pool?.request()
    .input('ot', sql.Char, req.params.ot)
    .query(`select CptoCod as "CODMAT",Concepto as "MAT",Cantidad as "CANTIDAD",PrecioUni AS "COSTOUND" from produccion.dbo.OrdTCosto where OdtCod=@Ot and Tipo='CODMAT'`);
*/   
    if(pool){
    const [result1,result2,result3,result4,result5,result6,result7] = await Promise.all([
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Orden as "CODMAT",Concepto as "MAT",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='CODMAT' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Orden as "CODPLAN",Concepto as "PLANCHA",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='PLANCHAS' and Concepto <> '** PLANCHAS **' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Orden as "CODTIN",Concepto as "TINTA",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='TINTA' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char,req.params.ot).query(`select Orden as "CODBAR",Concepto as "BARNIZ",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='BARNIZ' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Orden as "CODACA",Concepto as "ACABADOMANUAL",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='Actcod' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Orden as "CODACA",Concepto as "ACABADOMANUAL",Elemento as "Elemento",Tipo as Tipo,TipoDet as 'TipoDet',FORMAT(CAST(Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTIDAD",FORMAT(CAST(PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUND" from produccionlum.dbo.OrdTCosto where OdtCod=@Ot and Tipo='Amacod' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char,req.params.ot).query(`select OdtDescrip as "PRODUCTO",OdtCod as "OT",(Case OdtMon when 'N' THEN 'NUEVOS SOLES' WHEN 'D' THEN 'DOLARES AMERICANOS' else 'NUEVOS SOLES'end) AS "MONEDA" from produccionlum.dbo.OrdT where OdtCod=@Ot`)
    ]);
     
    const response = {
        Materiales: result1.recordset,
        Planchas : result2.recordset,
        Tintas : result3.recordset,
        Barniz : result4.recordset,
        AcabadosExternos: result5.recordset,
        AcabadosPropios: result6.recordset,
        Producto: result7.recordset
        
    }
     
    //console.log(response);
    res.json(response);


    }

 


}

export const MatotReal = async(req : Request,res : Response) => {

    console.log(req.params); 

    const pool = await getConnection();
    
   /* const result = await pool?.request()
    .input('ot', sql.Char, req.params.ot)
    .query(`select CptoCod as "CODMAT",Concepto as "MAT",Cantidad as "CANTIDAD",PrecioUni AS "COSTOUND" from produccion.dbo.OrdTCosto where OdtCod=@Ot and Tipo='CODMAT'`);
*/   
 

    if(pool){
    const [result1,result2,result3,result4,result5,result6,result7,result8] = await Promise.all([
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "MAT",O.Elemento as "Elemento",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000') as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='CODMAT' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "PLANCHAS",O.Elemento as "Elemento",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000') as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='PLANCHAS' and Concepto <> '** PLANCHAS **' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "TINTAS",O.Elemento as "Elemento",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000') as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='TINTA' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "BARNIZ",O.Elemento as "Elemento",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000')  as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='BARNIZ' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "ACABADOMANUAL",O.Elemento as "Elemento",i.ImaSolOp as "FACTURA",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000')  as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='Actcod' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select i.Enlace as "CODIGO",o.Orden as "Orden",o.Concepto as "ACABADOMANUAL",O.Elemento as "Elemento",FORMAT(CAST(o.Cantidad AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(o.PrecioUni AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNDPRE",FORMAT(CAST(ROUND(o.Cantidad * o.PrecioUni,4) AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(i.ImaCan AS DECIMAL(18, 2)), '0.00') as "CANTREAL",FORMAT(CAST(i.ImaPun AS DECIMAL(18, 2)), '0.0000')  as "COSTOUNDREAL",FORMAT(CAST(ROUND(i.ImaCan * i.ImaPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from produccionlum.dbo.OrdTCosto o inner join almaceneslum.dbo.ItMovimientos i on o.OdtCod COLLATE Modern_Spanish_CI_AS=i.ImaSer COLLATE Modern_Spanish_CI_AS and o.Orden=i.ImaPro where OdtCod=@Ot and Tipo='Amacod' ORDER BY Orden ASC`),
        pool.request().input('ot', sql.Char, req.params.ot).query(`select Enlace as "Orden",o.IocDes as "SERVICIO",'' as "Elemento",o.IocReq as "FACTURA",FORMAT(CAST(0.00 AS DECIMAL(18, 2)), '0.00') as "CANTPRE",FORMAT(CAST(0.0000 AS DECIMAL(18, 2)), '0.0000') AS "COSTOUNPRE",FORMAT(CAST(0.00 AS DECIMAL(18, 2)), '0.00') as "SubTotalPRE",FORMAT(CAST(o.IocCan AS DECIMAL(18, 2)), '0.00') AS "CANTREAL",FORMAT(CAST(o.IocPun AS DECIMAL(18, 2)), '0.0000') as "COSTOUNDREAL",FORMAT(CAST(ROUND(o.IocCan * o.IocPun,4) AS DECIMAL(18, 2)), '0.00') as "SubtotalReal" from compraslum.dbo.ItOCompras o where o.IocOp=@Ot ORDER BY ORDEN ASC`),
        pool.request().input('ot', sql.Char,req.params.ot).query(`select OdtDescrip as "PRODUCTO",OdtCod as "OT",(Case OdtMon when 'N' THEN 'NUEVOS SOLES' WHEN 'D' THEN 'DOLARES AMERICANOS' else 'NUEVOS SOLES'end) AS "MONEDA" from produccionlum.dbo.OrdT where OdtCod=@Ot`)
       
    ]
);
     
    const response = {
        Materiales: result1.recordset,
        Planchas : result2.recordset,
        Tintas : result3.recordset,
        Barniz : result4.recordset,
        AcabadosExternos: result5.recordset,
        AcabadosPropios: result6.recordset,
        Servicios: result7.recordset,
        Producto: result8.recordset
    }
     
    res.json(response);

    res.end();

    }

 


}


export const QueryOt = async(req: Request,res:Response) => {
    console.log("holi");

     const ot = req.query.ot;
  try{
      const pool = await getConnection();

      if(pool){
         
        const result = await pool.request().input('ot',sql.Char,ot).query(`select OdtDescrip as 'PRODUCTO' from produccionlum.dbo.OrdT where OdtCod=@ot`);
        res.json(result.recordset);
      }

  } catch(error){
     console.log('Error al ejecutar la consulta',error);


  }
    



}




