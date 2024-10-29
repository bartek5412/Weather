import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
const Navbar: React.FC = () => {
  const { user, isLoggedIn } = useUser();
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex flex-row">
        <div className="basis-1/4">
          <h1 className="text-white text-xl font-bold">TK-B</h1>
        </div>
        <div className="basis-1/2">
          {" "}
          <Link to="/" className="text-white hover:text-blue-200 mx-4">
            Home
          </Link>
          <Link to="/weather" className="text-white hover:text-blue-200 mx-4">
            Weather
          </Link>
          <Link to="/map" className="text-white hover:text-blue-200 mx-4">
            Map
          </Link>
          <Link to="/posts" className="text-white hover:text-blue-200 mx-4">
            Posts
          </Link>
        </div>
        <div className="basis-1/8 ">
          {isLoggedIn ? (
            <>
              {" "}
              <p className="text-white ">User:</p>
              <h2 className="text-white text-xl font-bold">{user?.name}</h2>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
