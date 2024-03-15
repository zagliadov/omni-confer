import { FC } from "react";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  return (
    <div>
      <Link to="/lobby-room">Create Connection</Link>
    </div>
  );
};
