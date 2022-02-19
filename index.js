const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send message to server", (msg) => {
    io.emit("send message to client", msg);
  });

  socket.on("disconnect", (msg) => {

    const userDisconnectedMsg = {
      type: "disconnection",
      user: null,
      value: `a user disconnected`,
    };

    console.log(msg)
    io.emit("send message to client", userDisconnectedMsg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
