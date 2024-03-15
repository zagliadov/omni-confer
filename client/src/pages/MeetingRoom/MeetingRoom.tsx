import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";

export const MeetingRoom: FC = () => {
  const { roomId } = useParams();
  const { socket, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    if (me) socket.emit("join room", { roomId, peerId: me._id });
  }, [me, roomId, socket]);

  return (
    <div>
      <VideoPlayer stream={stream} />
    </div>
  );
};
