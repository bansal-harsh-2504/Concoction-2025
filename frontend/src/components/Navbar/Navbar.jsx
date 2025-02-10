import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("participant");

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleSignup = () => {
    setIsLogin(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-32 bg-gradient-to-r ">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-[#090a0b]">FusionEra</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-[#2c2a2a] text-white font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="bg-[#fffff4] p-2 rounded-3xl shadow-xl w-[800px] flex overflow-hidden">
            <div className="w-1/2 p-8 relative">
              <div className="h-full w-full flex items-center justify-center">
                <img
                  src="/images/login.jpg"
                  className="w-full h-full object-fill"
                />
              </div>
            </div>

            <div className="w-1/2 p-8">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {isLogin ? "Log in" : "Sign Up"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-4 mb-4 p-1 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="participant"
                    id="r1"
                    className="hidden"
                    checked={selectedRole === "participant"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <label
                    htmlFor="r1"
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer text-center ${
                      selectedRole === "participant"
                        ? "bg-[#000038] text-white shadow-lg transform scale-105"
                        : "bg-transparent text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Participant
                  </label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    id="r2"
                    className="hidden"
                    checked={selectedRole === "organizer"}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <label
                    htmlFor="r2"
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 font-medium cursor-pointer text-center ${
                      selectedRole === "organizer"
                        ? "bg-[#000038] text-white shadow-lg transform scale-105"
                        : "bg-transparent text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    Organizer
                  </label>
                </div>
              </div>

              <form className="space-y-4">
                <button className="cursor-pointer w-full mb-4 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <img
                    src="/images/google.png"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <button className="cursor-pointer w-full mb-4 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors pr-2">
                  <img
                    src="/images/linked.png"
                    alt="LinkedIn logo"
                    className="w-5 h-5 scale-[1.3]"
                  />
                  Continue with LinkedIn
                </button>

                <div className="text-center text-gray-500 text-sm mb-4">
                  Or login with email
                </div>

                <div>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#000038] focus:border-transparent outline-none"
                    placeholder="johndoe@gmail.com"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-[#000038] focus:border-transparent outline-none"
                    placeholder="********"
                  />
                </div>

                <button
                  className="w-full py-2 bg-[#000038] text-white rounded-lg transition-colors"
                  onClick={handleSubmit}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>

                <div className="text-center text-sm">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
