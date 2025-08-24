import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";


let connectedUsers = {};
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let email = null;
let socketId = null;
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);


  io.on("connection", (socket) => {
    // ...
    console.log(`a user connected ${socket.id}`);
    socket.on('send_message', (data) => {
     
      data.id = socket.id
      console.log("data: ", data )
      socket.broadcast.emit('recieve_message', data)
      // io.emit('recieve_message', data)

    });

    socket.on("register_user", (data)=>{
      // email = data["user_email"];
      // socketId = data["socket_id"];
      connectedUsers[email] = socketId;
      // socket.broadcast.emit("hey_register_new_user", data);
    } )

  // socket.on("registering_foreign_user", (data)=>{
  //  connectedUsers[data["user_email"]] = data["socket_id"];
  //  io.to(data["socket_id"]).emit("registered_you_so_register_me", 
    // {
      // "user_email": email,
      // "socket_id": socketId
    // }

    
  // );
// socket.emit("placed", connectedUsers);
  // })

  socket.on("fine_you_will_be_registered", (data)=>{
   connectedUsers[data["user_email"]] = data["socket_id"];
    socket.emit("done", connectedUsers)
  })

  
  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected. Reason: ${reason}`);
    
    // Example: remove from your connectedUsers map
    if(email != null && socketId != null){
      connectedUsers = {}

      socket.broadcast.emit("a_user_disconnected", (email));
      email = null;
      socketId = null;
      // socket.emit("good", connectedUsers);
    }
  });

  socket.on("remove_user_connection", (data)=>{
    if(connectedUsers[data] && (data != email)){
      delete connectedUsers[data];
      socket.emit("removed_a_user_connection", connectedUsers)
    }
  })


 
  });

 httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});