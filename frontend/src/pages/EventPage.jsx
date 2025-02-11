import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HistoricEvent from "../components/HistoricEvent";
import FutureEvent from "../components/FutureEvent";
import MedievalEvent from "../components/MedievalEvent";

const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_EVENT_API_ENDPOINT}/${eventId}`
        );
        setEvent(response.data.eventt);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  const renderEventComponent = () => {
    switch (event.category) {
      case "prehistoric":
        return <HistoricEvent event={event} />;
      case "future":
        return <FutureEvent event={event} />;
      case "medieval":
        return <MedievalEvent event={event} />;
      default:
        return <div>Unknown event category</div>;
    }
  };

  return <div>{renderEventComponent()}</div>;
};

export default EventPage;
