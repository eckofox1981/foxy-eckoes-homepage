import { Event } from "../models/Event";
import "../styles/hero-section.css";
import "../styles/buttons.css";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

export function HeroSection({ event }: { event: Event | undefined }) {
  const eventDate: Date = event ? new Date(event.date) : new Date();

  return (
    <>
      {event === null || event === undefined ? (
        <div className="loading">
          <Bars
            height={80}
            width={80}
            color="var(--button-std)"
            ariaLabel="Fetching list"
          />
          <p>Loading...</p>
        </div>
      ) : (
        <Link to={`/event/${event.eventId}`}>
          <section className="hero-section">
            <img src={event.pictureUrl} alt={event.performer} />
            <div className="text-content">
              <div className="title">
                <h2>{event.performer}</h2>
                <h3>Live at {event.location}</h3>
                <h4>{eventDate.toDateString()}</h4>
              </div>
              <button className="book-button">Book now!</button>
              <p>{event.description}</p>
            </div>
          </section>
        </Link>
      )}
    </>
  );
}
