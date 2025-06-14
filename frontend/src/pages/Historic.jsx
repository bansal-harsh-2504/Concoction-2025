import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Historic = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_EVENT_API_ENDPOINT}?category=prehistoric`
        );
        console.log(response.data);
        setEvents(response.data.eventts);
      } catch (error) {
        console.error("Error fetching historic events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/prehistoric.jpg')" }}
    >
      <nav className="bg-stone-900/80 p-4">
        <Link
          to="/"
          className="text-amber-200 text-3xl font-[Cinzel] hover:text-amber-400 transition-colors"
        >
          FusionEra
        </Link>
      </nav>

      <div className="h-[60vh] flex items-center justify-center bg-black/50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-amber-200 font-[Cinzel] text-center px-4 leading-tight">
          Journey Through Time:
          <br />
          Where History Comes Alive
        </h1>
      </div>

      <div className="bg-stone-900/90 py-8 sm:py-12 md:py-16 px-2 sm:px-4">
        <h2 className="text-3xl sm:text-4xl text-amber-200 font-[Cinzel] text-center mb-8 sm:mb-12">
          Upcoming Prehistoric Adventures
        </h2>
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {events?.map((event) => (
              <Link
                to={`/event/${event._id}`}
                key={event._id}
                className="block hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-stone-800 rounded-lg overflow-hidden shadow-lg shadow-amber-900/20">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />

                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-[Cinzel] text-amber-200 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amber-100/80 mb-2">
                      {event.date}
                    </p>
                    <p className="text-sm sm:text-base text-gray-400 mb-3">
                      {event.description}
                    </p>
                    <div className="border-t border-stone-700 pt-3">
                      <p className="text-sm sm:text-base text-amber-100/80">
                        📍 {event.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historic;
