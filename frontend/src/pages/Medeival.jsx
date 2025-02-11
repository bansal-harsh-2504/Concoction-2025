import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Medieval.css";

const Medieval = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_EVENT_API_ENDPOINT}?category=medieval`
        );
        setEvents(response.data.eventts);
      } catch (error) {
        console.error("Error fetching medieval events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="px-4 py-3 bg-white shadow-md">
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
          FusionEra
        </Link>
      </nav>

      <div className="px-4 py-12 text-center md:py-16">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
          Journey Back to the Age of Knights and Castles
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Experience the grandeur and mystique of medieval times through our
          authentic themed events
        </p>
      </div>

      <section className="px-4 py-8 md:py-12">
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          Upcoming Events
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="overflow-hidden bg-white rounded-lg shadow-md hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative w-full pb-[56.25%]">
                <img 
                  src={event.images[0]} 
                  alt={event.title}
                  className="absolute top-0 left-0 w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  {event.date}
                </p>
                <p className="text-gray-700 overflow-hidden text-ellipsis h-[4.5rem]">
                  {event.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Medieval;
