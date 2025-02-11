import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("participant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/login`,
        {
          email,
          password,
          role: selectedRole,
        }
      );

      if (response.data.token) {
        login(
          response.data.userId,
          response.data.token,
          response.data.registeredEvents
        );
        setShowModal(false);
        setEmail("");
        setPassword("");
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_ENDPOINT}/register`,
        {
          email,
          password,
          role: selectedRole,
        }
      );

      if (response.data.token) {
        login(
          response.data.userId,
          response.data.token,
          response.data.registeredEvents
        );
        setShowModal(false);
        setEmail("");
        setPassword("");
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: "#4CAF50",
              color: "white",
            },
          },
          error: {
            style: {
              background: "#EF4444",
              color: "white",
            },
          },
          duration: 3000,
        }}
      />
      <nav className="flex justify-between items-center py-4 px-32 bg-gradient-to-r ">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-[#090a0b]">FusionEra</h1>
        </div>

        <button
          onClick={user.isLoggedIn ? handleLogout : () => setShowModal(true)}
          className="px-6 py-2 bg-[#2c2a2a] text-white font-semibold rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {user.isLoggedIn ? "Log Out" : "Get Started"}
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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <button
                  type="button"
                  className="cursor-pointer w-full mb-4 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#000038] focus:border-transparent outline-none"
                    placeholder="johndoe@gmail.com"
                  />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-[#000038] focus:border-transparent outline-none"
                    placeholder="********"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#000038] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isLogin ? "Logging in..." : "Signing up..."}
                    </div>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
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
