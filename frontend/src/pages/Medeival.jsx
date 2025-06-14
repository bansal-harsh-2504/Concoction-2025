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
    <div className="medieval-page">
      <nav className="medieval-nav">
        <Link to="/" className="nav-title">
          FusionEra
        </Link>
      </nav>

      <div className="hero-section">
        <h1>Journey Back to the Age of Knights and Castles</h1>
        <p>
          Experience the grandeur and mystique of medieval times through our
          authentic themed events
        </p>
      </div>

      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {events?.map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="event-card"
            >
              <div className="event-image">
                <img src={event.images[0]} alt={event.title} />
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>

                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Medieval;
