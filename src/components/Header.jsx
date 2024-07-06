// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated }) => {
    return (
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo or Application Name */}
                    <Link to="/" className="text-3xl font-bold">
                        MCQ Battle
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/lobby" className="nav-link">
                            Lobby
                        </Link>
                        {isAuthenticated && (
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        )}
                        <Link to="/about" className="nav-link">
                            About
                        </Link>
                        <Link to="/contact" className="nav-link">
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Navigation Menu */}
                    <div className="md:hidden">
                        {/* Example for mobile menu icon */}
                        {/* Replace with your preferred mobile menu icon */}
                        <button className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
