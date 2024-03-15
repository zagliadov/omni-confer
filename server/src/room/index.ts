import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { IJoinRoom } from "./definitions";
import * as _ from "lodash";

const rooms: Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidv4();
    rooms[roomId] = [];
    socket.emit("room created", { roomId });
    console.log("User created the room");
  };

  const joinRoom = ({ roomId, peerId }: IJoinRoom) => {
    if (!rooms[roomId]) return;
    if (!peerId || !roomId) return;
    console.log(`User joined the room: ${roomId}, peer: ${peerId}`);
    rooms[roomId] = _.union(rooms[roomId], [peerId]);
    socket.join(roomId);
    socket.to(roomId).emit("user joined", { peerId });
    socket.emit("get users", {
      roomId,
      participants: rooms[roomId],
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", peerId)
      leaveRoom({ roomId, peerId});
    })
  };

  const leaveRoom = ({ roomId, peerId }: IJoinRoom) => {
    rooms[roomId] = _.filter(rooms[roomId], (id) => id !== peerId);
    socket.to(roomId).emit("user disconnected", peerId);
  }

  socket.on("create room", createRoom);
  socket.on("join room", joinRoom);
};
