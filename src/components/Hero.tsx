import { Event } from "../models/Event";
import "../styles/hero-section.css";
import "../styles/buttons.css";

export function HeroSection({ event }: { event: Event }) {
  const eventDate: Date = new Date(event.date);

  return (
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
  );
}
