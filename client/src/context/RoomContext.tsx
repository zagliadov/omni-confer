import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  useReducer,
} from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { peersReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";

const WS = "http://localhost:9000";
export const RoomContext = createContext<null | any>(null);
const socket = socketIOClient(WS);

export const RoomProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {});

  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/meeting-room/${roomId}`);
  };

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log("participants: ", participants);
  };

  useEffect(() => {
    const meId = uuidv4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.log(error);
    }

    socket.on("room created", enterRoom);
    socket.on("get users", getUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    socket.on("user joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      })
    })

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      })
    })
  }, [me, stream]);

  console.log({peers})

  return (
    <RoomContext.Provider value={{ socket, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
