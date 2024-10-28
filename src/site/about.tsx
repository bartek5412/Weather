import React from "react";
import { useUser } from "../context/UserContext";

const About: React.FC = () => {
  const { user, isLoggedIn } = useUser();
  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Hello, {user?.name}</p>
          <p></p>
        </>
      ) : (
        <>
          <p>Nie jesteś zalogowany</p>
        </>
      )}
    </div>
  );
};

export default About;
