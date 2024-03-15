import { FC, useEffect, useRef } from "react";

interface IProps {
  stream: MediaStream;
}
export const VideoPlayer: FC<IProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return <video ref={videoRef} autoPlay muted={true} />;
};
