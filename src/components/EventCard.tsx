import { Link } from "react-router-dom";
import { Event } from "../models/Event";
import "../styles/buttons.css";
import "../styles/event-card.css";
import { convertDate } from "../utility/DateUtility";

export function EventCard({ show }: { show: Event }) {
  const eventDate: string = show ? convertDate(show?.date) : "";

  return (
    <article className="event-card">
      <img src={show.pictureUrl} alt={show.performer} />
      <div className="details">
        <div className="info">
          <h2>{show.performer}</h2>
          <h3>Live at {show.location}</h3>
          <h4>{eventDate}</h4>
        </div>
        <Link to={`/event/${show.eventId}`}>
          <button className="book-event">Book Event</button>
        </Link>
      </div>
    </article>
  );
}
