import React from "react";
import { Link } from "react-router-dom";
import instagramLogo from "../assets/instgram.png";
import Singin from "../components/Singin";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        {/* Left: Image */}
        <div className="hidden md:flex items-center justify-center w-1/2">
          <img
            src={instagramLogo}
            alt="Instagram Logo"
            className="w-full h-auto"

          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-sm p-4">
            <div className="flex justify-center mb-6 md:hidden">
              <img src={instagramLogo} alt="Instagram Logo" className="w-32" />
            </div>
            <Singin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
