import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";


let connectedUsers = {};
let connectedUsers2 = {};
let userConvo = {};
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let email = null;
let socketId = null;
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL, "https://real-time-chat-app-2-9rik.vercel.app"]
        : "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });


  io.on("connection", (socket) => {
    // ...
    console.log(`a user connected ${socket.id}`);
    socket.on('send_message', ({ message, recipient }) => {
      if (userConvo[connectedUsers2[recipient]] === socket.id && userConvo[socket.id] === connectedUsers2[recipient]) {
        // data.id = socket.id
        // console.log("data: ", data )
        console.log('message: ', message)
        io.to(connectedUsers2[recipient]).emit('recieve_message', message)
        // io.emit('recieve_message', data)
      }
    });
    // clean up time
    socket.on("register_user", (data) => {
      connectedUsers[data["socket_id"]] = data["user_email"];
      connectedUsers2[data["user_email"]] = data["socket_id"];
      io.emit("new_conn", connectedUsers);
    })

    socket.on("disconnect", (reason) => {
      let emailToDelete = connectedUsers[socket.id];
      delete connectedUsers[socket.id];
      delete connectedUsers2[emailToDelete];
      io.emit("updated_database", (connectedUsers))
    })

    socket.on("user_convo_clicked", (data) => {

      if (data == null) {
        if (userConvo[socket.id]) {
          delete userConvo[socket.id];
        }
      }
      else if (connectedUsers2[data]) {
        userConvo[socket.id] = connectedUsers2[data];
      }
    })

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

    // socket.on("fine_you_will_be_registered", (data)=>{
    //  connectedUsers[data["user_email"]] = data["socket_id"];
    // socket.emit("done", connectedUsers)
    // })


    // socket.on("disconnect", (reason) => {
    // console.log(`User ${socket.id} disconnected. Reason: ${reason}`);

    // Example: remove from your connectedUsers map
    // if(email != null && socketId != null){
    // connectedUsers = {}

    // socket.broadcast.emit("a_user_disconnected", (email));
    // email = null;
    // socketId = null;
    // socket.emit("good", connectedUsers);
    // }
    // });

    // socket.on("remove_user_connection", (data)=>{
    // if(connectedUsers[data] && (data != email)){
    // delete connectedUsers[data];
    // socket.emit("removed_a_user_connection", connectedUsers)
    // }
    // })



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



// "dev": "nodemon server.js",