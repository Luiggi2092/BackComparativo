import server from "./api/app";


const port = 3001;
const IP = "0.0.0.0"

server.listen( port,IP,()=> {

    console.log("%s listening at 3001");
    
    
})

// Manejar el evento 'clientError'
// socket.on('clientError', (error, socket) => {
//     // Destruir el socket para limpiarlo
//     socket.destroy(error);
// });
