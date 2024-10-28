// src/components/Home.tsx

import React from "react";
import { useUser } from "../context/UserContext";

const Home: React.FC = () => {
  const { user, isLoggedIn, login, logout } = useUser();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {isLoggedIn ? (
        <>
          <h1 className="text-2xl font-semibold">Hello, {user?.name}!</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Welcome, Guest!</h1>
          <button
            onClick={() =>
              login({ id: "1", name: "John Doe", email: "john@example.com" })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
