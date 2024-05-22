import { Request,Response } from "express";
import { getConnection } from "../db";
import sql from "mssql";


const generateUniqueId = (length: number): string => {
    // Generamos un ID único alfanumérico
    return '_' + Math.random().toString(36).substring(2, 2 + length - 1);
  };

export const MovOt = async(req : Request,res: Response) => {

     
    const pool = await getConnection();

// Verificar si pool es undefined antes de usarlo
if (pool) {
    
console.log(req.body);

   const checkQuery = `
      SELECT COUNT(*) AS count
      FROM almacenes.dbo.itmovimientos
      where ImaSer= @ImaSer
    `

    const checkResult = await pool.request()
    .input('ImaSer',sql.VarChar,req.body[0].ImaSer)
    .query(checkQuery)

    console.log('OT' + req.body[0].ImaSer);
    //console.log(checkQuery);

    if(checkResult.recordset[0].count > 0){
        res.status(400).send('La Op ya se encuentra registrada');
        return;
    }

    const transaction = pool.transaction();
    await transaction.begin();

    try {
        for (const item of req.body) {
         const Enlace = generateUniqueId(12);  
         console.log("holi"); 
         const result = await transaction
                .request()
                .input('Enlace', sql.Char, Enlace)
                .input('ImaPro', sql.Int, item.ImaPro)
                .input('ImaDes1', sql.VarChar, item.ImaDes1)
                .input('ImaSel', sql.Char, item.ImaSel)
                .input('Imatra', sql.VarChar, item.Imatra)
                .input('Imapro1', sql.VarChar, item.Imapro1)
                .input('ImaCan', sql.Float, item.ImaCan)
                .input('ImaPun',sql.Float,  item.ImaPun || 0.00)
                .input('ImaSer', sql.VarChar, item.ImaSer)
                .query(`
                    INSERT INTO almacenes.dbo.itmovimientos (
                        Enlace, ImaCod, ImaPro, ImaEnlace, ImaAnc, ImaLar, ImaSel, ImaTip,
                        ImaDoc, ImaAlm, ImaDes, ImaFec, ImaCan, ImaMon, ImaCam, ImaPun,
                        ImaCie, ImaCie1, ImaOc, ImaOp, ImaCCos, ImaSol, ImaCanF, ImaSolOp,
                        ImaSer, Imapro1, Imatra, Imareal,ImaDes1
                    )
                    VALUES (
                        @Enlace, null, @ImaPro, null, null, null, @ImaSel, null, null,
                        null, null, null, @ImaCan, null, null, @ImaPun, null, null, null,
                        null, null, null, null,null, @ImaSer, @Imapro1, @Imatra, null,@ImaDes1
                    )
                `);
                
        console.log(result)
        }
        await transaction.commit();
        res.status(200).json({ message: 'Registros insertados exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        await transaction.rollback();
        res.status(500).json({ message: 'Error al insertar registros en la base de datos' });
    }
} else {
    // Manejar el caso en que pool sea undefined
    console.error('Error: pool es undefined');
    res.status(500).json({ message: 'Error al obtener conexión a la base de datos' });
}

           
}

export const editItemMovOt = async(req:Request,res:Response) => {

  try{

    console.log("entra");
    const cant = req.query.cant;
    const pu = req.query.pu;
    const fact = req.query.fact;
    const id = req.params.id;

    const pool = await getConnection();

    if(pool){

        const query = `UPDATE almacenes.dbo.itmovimientos SET ImaCan=@cant,ImaPun=@pu,ImaSolOp=@fact WHERE Enlace=@id`;

        const result = await pool.request()
        .input('cant', sql.Float,cant)
        .input('pu',sql.Float,pu)
        .input('fact',sql.Char,fact)
        .input('id', sql.Char,id)
        .query(query);
        
        console.log(result.rowsAffected);
        res.json({ result });
        
    }

     }catch(error){
       console.log(`Error al ejecutar la actualizacion`, error);
       throw error;
    }

}


export const editItemService = async(req:Request,res:Response) => {

    try{ 
    
    
    const fact = req.query.fact;
    const id = req.params.id;

    
    const pool = await getConnection();


     if(pool){
        
        const query = `update compras.dbo.ItOCompras SET IocReq=@fact where Enlace=@id`;
        const result = await pool.request()
        .input('fact',sql.VarChar,fact)
        .input('id', sql.Char,id)
        .query(query)
  
        res.json({ result });

     }


    }catch(error){
        throw error;
    }
}


