import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-white hover:text-purple-300 transition-colors duration-300">
            fest
          </h1>
        </div>

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-full hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Welcome</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Login
              </button>
              <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
