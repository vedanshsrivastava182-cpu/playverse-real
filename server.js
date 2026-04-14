const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = 0;

io.on("connection", (socket) => {
  users++;
  console.log("User connected");
  io.emit("count", users);

  // Chat
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  // Game move
  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });

  // Disconnect
  socket.on("disconnect", () => {
    users--;
    console.log("User disconnected");
    io.emit("count", users);
  });
});

// Public folder serve karega
app.use(express.static("public"));

// Server start
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
