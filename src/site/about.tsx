import React from "react";
import { useUser } from "../context/UserContext";

const About: React.FC = () => {
  const { user } = useUser();
  return (
    <div>
      <p>Hello, {user?.name}</p>
    </div>
  );
};

export default About;
