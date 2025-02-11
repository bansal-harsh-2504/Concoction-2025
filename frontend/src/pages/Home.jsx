import React from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#eee]">
      <Navbar />

      <div className="max-w-4xl mx-auto text-center mt-20 px-4">
        <h1 className="text-6xl font-serif leading-tight md:text-5xl sm:text-4xl">
          Fusion of Eras
          <br />
          <span className="whitespace-normal">
            Travel Through Time and Beyond!
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg md:text-base">
          Join us for unforgettable travel experiences tailored to
          <br className="md:hidden" />
          your dreams and desires.
        </p>
        <button className="cursor-pointer mt-8 px-8 py-3 bg-[#2c2a2a] text-white rounded-full hover:bg-gray-800 transition">
          Start Your Adventure
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20 mt-16 px-4">
        <div className="rounded-3xl overflow-hidden relative group h-[500px] md:h-[400px] w-full">
          <img
            src="/images/three.jpg"
            alt="Prehistoric Era"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
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

        <div className="rounded-3xl overflow-hidden relative group h-[500px] md:h-[400px] w-full">
          <img
            src="/images/one.jpg"
            alt="Medieval Era"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
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

        <div className="rounded-3xl overflow-hidden relative group h-[500px] md:h-[400px] w-full">
          <img
            src="/images/two.jpg"
            alt="Future Era"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
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
