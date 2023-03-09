import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // console.log(socket);
  // console.log(socket.id);
  // console.log(socket.handshake);

  const { token } = socket.handshake.auth;
  if (token) {
    socket.emit("login", { token });
    // console.log(socket.rooms); // Set { <socket.id> }
    // socket.join("room1");
    // console.log(socket.rooms); // Set { <socket.id>, "room1" }

    socket.emit("msg", { msg: "下面将持续输出", c: [] });
    setInterval(() => {
      socket.emit("msg", { msg: "持续输出中：" + new Date() });
    }, 1000);
  }
});

httpServer.listen(3000);
