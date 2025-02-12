import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { ThumbsUp } from "lucide-react";

const HistoricEvent = ({ event }) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(9 * 60 * 60);
  const [activeSection, setActiveSection] = useState("rules");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [votes, setVotes] = useState(event.votes || 0);
  const [hasVoted, setHasVoted] = useState(
    event.votedUsers?.includes(user?.id)
  );

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
    if (!user) return;

    setIsRegistering(true);
    try {
      await axios.post(`${import.meta.env.VITE_EVENT_API_ENDPOINT}/register`, {
        eventId: event._id,
        userId: user.id,
        token: user.token,
      });

      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleVote = async () => {
    if (!user || isVoting) return;

    setIsVoting(true);
    try {
      const endpoint = `${import.meta.env.VITE_EVENT_API_ENDPOINT}/vote/${event._id}`;
      await axios.post(endpoint, {
        eventId: event._id,
        userId: user.id,
        token: user.token,
        type: hasVoted ? "down" : "up",
      });

      setVotes((prev) => (hasVoted ? prev - 1 : prev + 1));
      setHasVoted((prev) => !prev);
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-amber-200 font-[Cinzel]">
      <nav className="p-4 bg-stone-900/90">
        <Link
          to="/"
          className="text-3xl text-amber-400 hover:text-amber-200 transition-colors"
        >
          FusionEra
        </Link>
      </nav>

      <div className="p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full md:w-[45%] h-auto border-8 border-amber-400 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl text-amber-400 uppercase mb-4 font-bold tracking-wider shadow-text">
              {event.title}
            </h1>
            <p className="text-base md:text-xl leading-relaxed mb-6">
              {event.description}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{votes} Votes</span>
              {user ? (
                <button
                  disabled={isVoting}
                  onClick={handleVote}
                  className={`flex items-center gap-1 p-2 rounded transition-all duration-300 ${
                    isVoting ? "cursor-not-allowed opacity-50" : "hover:scale-110"
                  }`}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${
                      hasVoted ? "fill-amber-400" : ""
                    } text-amber-400`}
                  />
                </button>
              ) : (
                <ThumbsUp className="w-5 h-5 text-amber-400" />
              )}
            </div>
            <button
              disabled={
                !user ||
                event.registeredParticipants?.includes(user?.id) ||
                isRegistering
              }
              title={!user ? "Login to register" : ""}
              onClick={handleRegister}
              className={`w-full md:w-auto px-4 md:px-6 py-2 md:py-3 text-base md:text-lg uppercase rounded transition-all duration-300 
                ${
                  !user
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : event.registeredParticipants?.includes(user?.id)
                    ? "bg-amber-700 text-amber-200 cursor-not-allowed"
                    : "bg-amber-400 text-stone-900 hover:bg-amber-500 cursor-pointer"
                }`}
            >
              {isRegistering
                ? "Registering..."
                : event.registeredParticipants?.includes(user?.id)
                ? "Registered"
                : "Register"}
            </button>
          </div>
        </div>

        <div className="text-center my-8">
          <div className="inline-block bg-stone-900 text-amber-400 text-4xl sm:text-5xl md:text-6xl font-mono p-3 sm:p-4 md:p-6 rounded-lg tracking-[0.2em] shadow-[0_0_15px_rgba(251,191,36,0.3)] border border-amber-400/30">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-amber-400/20 p-4 md:p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveSection("rules")}
              className={`w-full md:w-auto px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-amber-400 rounded hover:-translate-y-1 hover:bg-amber-400 hover:text-stone-900 ${
                activeSection === "rules"
                  ? "bg-amber-400 text-stone-900"
                  : "bg-stone-900"
              }`}
            >
              Rules
            </button>
            <button
              onClick={() => setActiveSection("info")}
              className={`w-full md:w-auto px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-amber-400 rounded hover:-translate-y-1 hover:bg-amber-400 hover:text-stone-900 ${
                activeSection === "info"
                  ? "bg-amber-400 text-stone-900"
                  : "bg-stone-900"
              }`}
            >
              Event Information
            </button>
            <button
              onClick={() => setActiveSection("activities")}
              className={`w-full md:w-auto px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-amber-400 rounded hover:-translate-y-1 hover:bg-amber-400 hover:text-stone-900 ${
                activeSection === "activities"
                  ? "bg-amber-400 text-stone-900"
                  : "bg-stone-900"
              }`}
            >
              Activities
            </button>
          </div>

          <div className="bg-stone-900/70 p-4 md:p-8 rounded-lg text-base md:text-lg leading-relaxed">
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
                  <span className="text-amber-400 font-bold">Venue:</span>{" "}
                  {event.venue}
                </p>
                <p>
                  <span className="text-amber-400 font-bold">Date:</span>{" "}
                  {event.date}
                </p>
                <p>
                  <span className="text-amber-400 font-bold">Time:</span>{" "}
                  {event.time}
                </p>
                <p>
                  <span className="text-amber-400 font-bold">Location:</span>{" "}
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

export default HistoricEvent;
