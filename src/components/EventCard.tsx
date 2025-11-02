import { Event } from "../models/Event";
import "../styles/buttons.css";
import "../styles/event-card.css";

export function EventCard({ show }: { show: Event }) {
  const eventDate = new Date(show.date);

  return (
    <article className="event-card">
      <img src={show.pictureUrl} alt={show.performer} />
      <div className="details">
        <div className="info">
          <h2>{show.performer}</h2>
          <h3>Live at {show.location}</h3>
          <h4>{eventDate.toDateString()}</h4>
        </div>
        <button className="book-event">Book Event</button>
      </div>
    </article>
  );
}
