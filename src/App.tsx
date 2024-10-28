import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./site/home";
import Navbar from "./components/navbar";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import About from "./site/about";
import Weather from "./site/weather";
function App() {
  return (
    <>
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
                  <Route path="/about" element={<About />} />
                  <Route path="/weather" element={<Weather />}></Route>
                </Routes>
              </Router>
            </div>
          </div>
        </UserProvider>
      </div>
    </>
  );
}
export default App;
