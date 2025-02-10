import React from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#eee]">
      <Navbar />

      <div className="max-w-4xl mx-auto text-center mt-20 px-4">
        <h1 className="text-6xl font-serif leading-tight">
          Fusion of Eras
          <br />
          <span className="whitespace-nowrap">
            {" "}
            Travel Through Time and Beyond!
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Join us for unforgettable travel experiences tailored to
          <br />
          your dreams and desires.
        </p>
        <button className="cursor-pointer mt-8 px-8 py-3 bg-[#2c2a2a] text-white rounded-full hover:bg-gray-800 transition">
          Start Your Adventure
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-20 mt-16 px-4">
        <div className="rounded-3xl overflow-hidden relative group h-[400px]">
          <img
            src="/images/three.jpg"
            alt="Prehistoric Era"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
            <div className="flex justify-center">
              <Link to="/historic">
                <button className="cursor-pointer px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center gap-2 group-hover:bg-white/30 transition">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden relative group h-[400px]">
          <img
            src="/images/one.jpg"
            alt="Medieval Era"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
            <div className="flex justify-center">
              <Link to="/medieval">
                <button className="cursor-pointer px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center gap-2 group-hover:bg-white/30 transition">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden relative group h-[400px]">
          <img
            src="/images/two.jpg"
            alt="Future Era"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
            <div className="flex justify-center">
              <Link to="/future">
                <button className="cursor-pointer px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center gap-2 group-hover:bg-white/30 transition">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
}

export default App;
