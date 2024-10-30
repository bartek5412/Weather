import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./site/home";
import Navbar from "./components/navbar";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import Map from "./site/map";
import Weather from "./site/weather";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostProvider } from "./context/PostContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          {" "}
          <div>
            <UserProvider>
              <div>
                <div>
                  <Router>
                    <header>
                      <Navbar />
                    </header>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/weather" element={<Weather />}></Route>
                      <Route path="/map" element={<Map />}></Route>
                      <Route path="/posts" element={<PostList />}></Route>
                      <Route
                        path="/posts/:id"
                        element={<PostDetails />}
                      ></Route>
                    </Routes>
                  </Router>
                </div>
              </div>
            </UserProvider>
          </div>
        </PostProvider>
      </QueryClientProvider>
    </>
  );
}
export default App;
