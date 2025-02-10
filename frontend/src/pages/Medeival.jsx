import React from "react";
import { Link } from "react-router-dom";
import "../styles/Medieval.css";

const Medieval = () => {
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
          <Link to="/event/1" className="event-card">
            <div className="event-image">
              <img
                src="/images/joust.jpg"
                alt="Grand Jousting Tournament"
              />
            </div>
            <div className="event-content">
              <h3>Grand Jousting Tournament</h3>
              <p className="event-date">June 15, 2025</p>
              <p className="event-description">
                Witness knights clash in an epic jousting tournament featuring the realm's finest warriors
              </p>
            </div>
          </Link>

          <Link to="/event/2" className="event-card">
            <div className="event-image">
              <img
                src="/images/knight.jpg"
                alt="Knight Costume Contest"
              />
            </div>
            <div className="event-content">
              <h3>Knight Costume Contest</h3>
              <p className="event-date">July 20, 2025</p>
              <p className="event-description">
                Show off your finest medieval attire and compete for the title of Best Dressed Knight
              </p>
            </div>
          </Link>

          <Link to="/event/3" className="event-card">
            <div className="event-image">
              <img
                src="/images/combat.jpg"
                alt="Medieval Games & Combat"
              />
            </div>
            <div className="event-content">
              <h3>Medieval Games & Combat</h3>
              <p className="event-date">August 5, 2025</p>
              <p className="event-description">
                Participate in archery contests, sword fighting demonstrations, and authentic combat training
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Medieval;
