import sql from 'mssql';

const dbSettings = {
  user : "fvh",
  password : "73037303",
  server: "DATASERVUR",
  database: "siograflum",
  options : {
    encrypt:false,
    trustServerCertificate: true,
  }

}

export const getConnection =  async () => {

    try{
     const pool  = await sql.connect(dbSettings);
     return pool;
    }catch(error){
        console.log(error);
    }
    return
}

