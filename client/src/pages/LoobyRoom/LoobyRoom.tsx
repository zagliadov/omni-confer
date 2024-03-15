import { ChangeEvent, FC, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import * as _ from "lodash";

export const LoobyRoom: FC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const { socket } = useContext(RoomContext);
  const navigate = useNavigate();

  const handleGetRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = _.get(e, "target.value");
    setRoomId(value);
  };

  const handleCreateRoom = (): void => {
    socket.emit("create room");
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border rounded-md p-6">
        <h1 className="text-center text-2xl">Meeting Room</h1>
        <div className="pt-4 flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={handleGetRoomId}
            className="input input-bordered w-96"
          />
          <button className="btn mt-2 w-96" onClick={handleJoinRoom}>
            <span>Join Room</span>
          </button>
        </div>
        <div className="divider"></div>
        <button onClick={handleCreateRoom} className="btn w-96 ">
          Create a new room
        </button>
      </div>
    </div>
  );
};
