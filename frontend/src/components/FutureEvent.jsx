import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { ThumbsUp } from "lucide-react";

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
      const endpoint = hasVoted
        ? `${import.meta.env.VITE_EVENT_API_ENDPOINT}/vote/${event._id}`
        : `${import.meta.env.VITE_EVENT_API_ENDPOINT}/vote/${event._id}`;
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
    <div className="min-h-screen bg-indigo-950 text-indigo-200 font-[Cinzel]">
      <nav className="p-4 bg-indigo-900/90">
        <Link
          to="/"
          className="text-3xl text-indigo-300 hover:text-indigo-100 transition-colors"
        >
          FusionEra
        </Link>
      </nav>

      <div className="p-8">
        <div className="flex gap-8 mb-8">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-[45%] h-auto border-8 border-indigo-400 rounded-lg object-cover shadow-[0_0_20px_rgba(129,140,248,0.3)]"
          />
          <div className="flex-1">
            <h1 className="text-5xl text-indigo-300 uppercase mb-4 font-bold tracking-wider shadow-text">
              {event.title}
            </h1>
            <p className="text-xl leading-relaxed mb-6">{event.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{votes} Votes</span>
              {user && (
                <button
                  disabled={isVoting}
                  onClick={handleVote}
                  className={`flex items-center gap-1 p-2 rounded transition-all duration-300 
                    ${isVoting ? "cursor-not-allowed opacity-50" : "hover:scale-110"}`}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${hasVoted ? "fill-indigo-400" : ""} text-indigo-400`}
                  />
                </button>
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
              className={`px-6 py-3 text-lg uppercase rounded transition-all duration-300 
                ${
                  !user
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : event.registeredParticipants?.includes(user?.id)
                    ? "bg-indigo-700 text-indigo-200 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-400 cursor-pointer hover:shadow-[0_0_15px_rgba(129,140,248,0.5)]"}`}
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
          <div className="inline-block bg-indigo-900 text-indigo-300 text-6xl font-mono p-4 rounded-lg tracking-[0.2em] shadow-[0_0_15px_rgba(129,140,248,0.3)] border border-indigo-400/30">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-indigo-900/20 p-8 rounded-lg backdrop-blur-sm">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveSection("rules")}
              className={`px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
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
              className={`px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
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
              className={`px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-indigo-400 rounded hover:-translate-y-1 hover:bg-indigo-400 hover:text-indigo-950
                ${
                  activeSection === "activities"
                    ? "bg-indigo-400 text-indigo-950"
                    : "bg-indigo-900"
                }`}
            >
              Activities
            </button>
          </div>

          <div className="bg-indigo-950/70 p-8 rounded-lg text-lg leading-relaxed backdrop-blur-sm">
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
