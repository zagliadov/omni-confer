import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { roomHandler } from "./room";

const PORT = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("User is connected");
  roomHandler(socket);
  socket.on("disconnect", () => {
    console.log("User is disconnected");
  })
})

server.listen(PORT, () => {
  console.log(`Listening to the server on ${PORT}`);
})