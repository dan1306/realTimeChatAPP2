import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);


  io.on("connection", (socket) => {
    // ...
    console.log(`a user connected ${socket.id}`)
        socket.on('send_message', (data) => {
     
      data.id = socket.id
      console.log("data: ", data )
      // socket.broadcast.emit('recieve_message', data)
      io.emit('recieve_message', data)

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