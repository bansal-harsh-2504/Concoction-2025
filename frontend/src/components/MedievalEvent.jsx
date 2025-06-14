import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { ThumbsUp } from "lucide-react";

const MedievalEvent = ({ event }) => {
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
    <div
      className="min-h-screen bg-[#2B1D0E] text-[#f5d0a9] bg-fixed bg-center bg-cover bg-blend-overlay bg-opacity-70 font-['MedievalSharp']"
      style={{ backgroundImage: "url('/images/castle.jpg')" }}
    >
      <nav className="p-4 bg-black/70">
        <Link
          to="/"
          className="text-3xl text-[#f5d0a9] hover:text-[#d4af37] transition-colors duration-300 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
        >
          FusionEra
        </Link>
      </nav>

      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full md:w-[45%] h-auto border-4 border-[#8b4513] rounded-lg object-cover shadow-[0_4px_15px_rgba(139,69,19,0.4)]"
          />
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl text-[#f5d0a9] uppercase mb-4 font-bold tracking-wider drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
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
                    ${
                      isVoting
                        ? "cursor-not-allowed opacity-50"
                        : "hover:scale-110"
                    }`}
                >
                  <ThumbsUp
                    className={`w-5 h-5 ${
                      hasVoted ? "fill-[#d4af37]" : ""
                    } text-[#d4af37]`}
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
                    ? "bg-[#8b4513] text-[#f5d0a9] cursor-not-allowed"
                    : "bg-[#8b4513] text-[#f5d0a9] hover:bg-[#a0522d] cursor-pointer hover:shadow-[0_4px_15px_rgba(139,69,19,0.4)]"
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
          <div className="inline-block bg-[#2B1D0E]/90 text-[#d4af37] text-3xl md:text-6xl font-mono p-4 rounded-lg tracking-[0.2em] shadow-[2px_2px_4px_rgba(0,0,0,0.5)] border-2 border-[#8b4513]">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-[#2B1D0E]/90 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            {["rules", "info", "activities"]?.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 text-lg uppercase transition-all duration-300 border-2 border-[#8b4513] rounded hover:-translate-y-1
                  ${
                    activeSection === section
                      ? "bg-[#8b4513] text-[#f5d0a9]"
                      : "bg-[#2B1D0E] text-[#f5d0a9] hover:bg-[#8b4513]"
                  }`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="bg-[#2B1D0E]/90 p-8 rounded-lg text-lg leading-relaxed border-2 border-[#8b4513]">
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
                  <span className="text-[#d4af37] font-bold">Venue:</span>{" "}
                  {event.venue}
                </p>
                <p>
                  <span className="text-[#d4af37] font-bold">Date:</span>{" "}
                  {event.date}
                </p>
                <p>
                  <span className="text-[#d4af37] font-bold">Time:</span>{" "}
                  {event.time}
                </p>
                <p>
                  <span className="text-[#d4af37] font-bold">Location:</span>{" "}
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

export default MedievalEvent;
