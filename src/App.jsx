// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Registration from "./components/RegisterUser";

const App = () => {
    return (
        <Router>
            <div className="app">
                {/* Your Header component or placeholder */}
                <Routes>
                    <Route path="/login" element={<Login />} />
            {/* Add more routes as needed */}
                  <Route path="/registerUsers" element={<Registration />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
