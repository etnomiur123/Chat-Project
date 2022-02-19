const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const socketConnection = "connection";
const socketDisconnect = "disconnect";
const sendMsgToServer = "send message to server";
const sendMsgToClient = "send message to client";
const messageType = {
  connection: "connection",
  disconnection: "disconnection",
};

io.on(socketConnection, (socket) => {
  console.log("a user connected");

  socket.on(sendMsgToServer, (msg) => {
    io.emit(sendMsgToClient, msg);
  });

  socket.on(socketDisconnect, (msg) => {
    const userDisconnectedMsg = {
      type: messageType.disconnection,
      user: null,
      value: `a user disconnected`,
    };

    console.log(msg);
    io.emit(sendMsgToClient, userDisconnectedMsg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
