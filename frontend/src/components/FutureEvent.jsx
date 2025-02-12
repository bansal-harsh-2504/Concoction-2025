import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const FutureEvent = ({ event }) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(9 * 60 * 60);
  const [activeSection, setActiveSection] = useState("rules");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votes, setVotes] = useState(event.votes || 0);
  const [hasVoted, setHasVoted] = useState(
    event.votedUsers?.includes(user?.id)
  );

  const isUserRegistered = event.registeredParticipants?.includes(user?.id);
  const isUserVoted = event.votedUsers?.includes(user?.id);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please login to register for the event");
      return;
    }

    if (isUserRegistered) {
      toast.error("You are already registered for this event");
      return;
    }

    setIsRegistering(true);
    try {
      await axios.post(`${import.meta.env.VITE_EVENT_API_ENDPOINT}/register`, {
        eventId: event._id,
        userId: user.id,
        token: user.token,
      });

      toast.success("Successfully registered for the event!");
      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Failed to register for the event. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleVote = async () => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }

    if (isVoting) {
      return;
    }

    setIsVoting(true);
    try {
      const endpoint = `${import.meta.env.VITE_EVENT_API_ENDPOINT}/vote/${
        event._id
      }`;
      await axios.post(endpoint, {
        eventId: event._id,
        userId: user.id,
        token: user.token,
        type: isUserVoted ? "down" : "up",
      });

      toast.success(isUserVoted ? "Vote removed!" : "Vote added!");
      setVotes((prev) => (isUserVoted ? prev - 1 : prev + 1));
      setHasVoted((prev) => !prev);
    } catch (error) {
      console.error("Voting failed:", error);
      toast.error("Failed to vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const getRegisterButtonText = () => {
    if (isRegistering) return "Registering...";
    if (isUserRegistered) return "Registered";
    return "Register";
  };

  const getRegisterButtonClass = () => {
    if (!user) return "bg-gray-600 text-gray-400 cursor-not-allowed";
    if (isUserRegistered)
      return "bg-indigo-700 text-indigo-200 cursor-not-allowed";
    return "bg-indigo-500 text-white hover:bg-indigo-400 cursor-pointer hover:shadow-[0_0_15px_rgba(129,140,248,0.5)]";
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-200 font-[Cinzel]">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1b4b',
            color: '#e0e7ff',
            border: '1px solid #6366f1'
          },
        }}
      />
      <nav className="p-4 bg-indigo-900/90">
        <Link
          to="/"
          className="text-3xl text-indigo-300 hover:text-indigo-100 transition-colors"
        >
          FusionEra
        </Link>
      </nav>

      <div className="p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full lg:w-[45%] h-[300px] lg:h-auto border-8 border-indigo-400 rounded-lg object-cover shadow-[0_0_20px_rgba(129,140,248,0.3)]"
          />
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-indigo-300 uppercase mb-4 font-bold tracking-wider shadow-text">
              {event.title}
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-6">
              {event.description}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{votes} Votes</span>
              <button
                onClick={() => {
                  if (!user?.loggedIn) {
                    toast.error("Please login to vote");
                    return;
                  }
                  handleVote();
                }}
                title={
                  !user?.loggedIn
                    ? "Login to vote"
                    : isUserVoted
                    ? "Remove vote"
                    : "Add vote"
                }
                className={`flex items-center gap-1 p-2 rounded transition-all duration-300 cursor-pointer
                  ${
                    isVoting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-110 hover:bg-indigo-900/50"
                  }`}
              >
                <ThumbsUp
                  className={`w-5 h-5 ${
                    isUserVoted ? "fill-indigo-400" : ""
                  } text-indigo-400`}
                />
              </button>
            </div>
            <button
              onClick={() => {
                if (!user?.loggedIn) {
                  toast.error("Please login to register");
                  return;
                }
                handleRegister();
              }}
              title={
                !user?.loggedIn
                  ? "Login to register"
                  : isUserRegistered
                  ? "Already registered"
                  : "Register for event"
              }
              className={`w-full sm:w-auto px-6 py-3 text-lg uppercase rounded transition-all duration-300 cursor-pointer
                ${
                  isUserRegistered
                    ? "bg-indigo-700 text-indigo-200 cursor-not-allowed"
                    : isRegistering
                    ? "bg-indigo-600 text-indigo-200 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.5)]"
                }`}
            >
              {getRegisterButtonText()}
            </button>
          </div>
        </div>

        <div className="text-center my-8">
          <div className="inline-block bg-indigo-900 text-indigo-300 text-3xl sm:text-4xl lg:text-6xl font-mono p-4 rounded-lg tracking-[0.2em] shadow-[0_0_15px_rgba(129,140,248,0.3)] border border-indigo-400/30">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-indigo-900/20 p-4 sm:p-8 rounded-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveSection("rules")}
              className={`px-4 sm:px-6 py-3 text-base sm:text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
                ${
                  activeSection === "rules"
                    ? "bg-indigo-400 text-indigo-950"
                    : "bg-indigo-900"
                }`}
            >
              Rules
            </button>
            <button
              onClick={() => setActiveSection("info")}
              className={`px-4 sm:px-6 py-3 text-base sm:text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
                ${
                  activeSection === "info"
                    ? "bg-indigo-400 text-indigo-950"
                    : "bg-indigo-900"
                }`}
            >
              Event Information
            </button>
            <button
              onClick={() => setActiveSection("activities")}
              className={`px-4 sm:px-6 py-3 text-base sm:text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
                ${
                  activeSection === "activities"
                    ? "bg-indigo-400 text-indigo-950"
                    : "bg-indigo-900"
                }`}
            >
              Activities
            </button>
          </div>

          <div className="bg-indigo-950/70 p-4 sm:p-8 rounded-lg text-base sm:text-lg leading-relaxed backdrop-blur-sm">
            {activeSection === "rules" && (
              <div className="space-y-4">
                <ol className="list-decimal list-inside">
                  {event.rules?.map((rule, index) => (
                    <li key={index} className="mb-2">
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {activeSection === "info" && (
              <div className="space-y-4">
                <p>
                  <span className="text-indigo-300 font-bold">Venue:</span>{" "}
                  {event.venue}
                </p>
                <p>
                  <span className="text-indigo-300 font-bold">Date:</span>{" "}
                  {event.date}
                </p>
                <p>
                  <span className="text-indigo-300 font-bold">Time:</span>{" "}
                  {event.time}
                </p>
                <p>
                  <span className="text-indigo-300 font-bold">Location:</span>{" "}
                  {event.venue}
                </p>
              </div>
            )}
            {activeSection === "activities" && (
              <div className="space-y-4">
                <ol className="list-decimal list-inside">
                  {event.activity?.map((activity, index) => (
                    <li key={index} className="mb-2">
                      {activity}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureEvent;
