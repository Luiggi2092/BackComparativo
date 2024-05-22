import sql from 'mssql';

const dbSettings = {
  user : "sa",
  password : "Isograf2018",
  server: "AFDSRV09",
  database: "siograf",
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

