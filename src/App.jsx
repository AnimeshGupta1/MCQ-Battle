// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Registration from "./components/RegisterUser";
import Header from "./components/Header";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
const App = () => {
    return (
        <Router>
            <div className="app">
                {/* Your Header component or placeholder */}
                <Routes>
                    <Route path="/landing" element={<Header />} />
                    <Route path="/lobby" element={<Lobby />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/game" element={<Game />} />
                    {/* Add more routes as needed */}
                    <Route path="/registerUsers" element={<Registration />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
