import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Future = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_EVENT_API_ENDPOINT}?category=future`
        );
        setEvents(response.data.eventts);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <div
              className="text-white text-xl font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              onClick={() => navigate("/")}
            >
              FusionEra
            </div>
          </div>
        </div>
      </nav>

      <div
        className="h-screen bg-fixed bg-cover bg-center flex items-center justify-center font-space-grotesk"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')",
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Journey to the Future</h1>
          <p className="text-lg md:text-xl">
            Experience tomorrow's wonders today through time travel
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Future Tech Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {events.map((event, index) => (
            <Link
              key={event._id || index}
              to={`/event/${event._id}`}
              className="block hover:shadow-xl transition duration-300"
            >
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 rounded-lg overflow-hidden border border-indigo-500/30">
                <div className="event-image">
                  <img
                    className="h-48 md:h-64 w-full object-cover"
                    src={event.images[0]}
                    alt={event.title}
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-2 md:mb-3">
                    {event.date}
                  </p>
                  <p className="text-gray-300 text-sm md:text-base">{event.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Future;
