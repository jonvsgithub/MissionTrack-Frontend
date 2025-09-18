import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeadLanding: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white w-full  border-b fixed top-0 left-0 border-gray-200 px-8 md:px-[120px] max-sm:px-4 py-4">
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="sm:hidden p-2 rounded-md bg-primaryColor-600 text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="src/assets/logo.svg" className="h-10" alt="Logo" />
          <h1 className="font-bold text-2xl sm:text-3xl text-transparent bg-clip-text">
            <span className="text-primaryColor-700">Mission</span>{" "}
            <span className="text-accent-700">Track.</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
          <a href="#hero" className="hover:text-primaryColor-600">Home</a>
          <a href="#features" className="hover:text-primaryColor-600">Features</a>
          <a href="#working" className="hover:text-primaryColor-600">How It Works</a>
          <a href="#pricing" className="hover:text-primaryColor-600">Pricing</a>
          <a href="#feedback" className="hover:text-primaryColor-600">Feedback</a>
        </nav>

        {/* Log In Button */}
        <div>
          <Link
            to="/login"
            className="bg-primaryColor-500 whitespace-nowrap text-white border rounded-lg px-4 py-2 font-medium hover:bg-primaryColor-600 transition"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden fixed top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start px-4 py-4 gap-4 z-40">
          <a href="#hero" className="text-gray-800">Home</a>
          <a href="#features" className="text-gray-800">Features</a>
          <a href="#working" className="text-gray-800">How It Works</a>
          <a href="#pricing" className="text-gray-800">Pricing</a>
          <a href="#feedback" className="text-gray-800">Feedback</a>
        </div>
      )}
    </header>
  );
};

export default HeadLanding;
