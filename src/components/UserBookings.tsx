import { Link } from "react-router-dom";
import type { Booking } from "../models/Booking";
import "../styles/buttons.css";
import "../styles/user-bookings.css";
import { convertDate } from "../utility/DateUtility";

export function UserBookings({ bookings }: { bookings: Booking[] }) {
  const status = (status: string) => {
    let statusColor: string = "grey";
    if (status === "CONFIRMED") statusColor = "green";
    if (status === "CANCELLED") statusColor = "red";
    if (status === "PENDING") statusColor = "var(--special-color)";

    return <p style={{ color: statusColor }}>{status.toUpperCase()}</p>;
  };

  return bookings === undefined || bookings.length === 0 ? (
    <i>You have no events booked.</i>
  ) : (
    <ul>
      {bookings.map((b) => (
        <li key={b.bookingId} className="booking-item">
          <i>Booking number: {b.bookingId}</i>
          <Link to={`/event/${b.event.eventId}`}>
            <h3>{b.event.performer}</h3>
          </Link>
          <div className="booking-detail">
            <div className="booking-date-location">
              <p>{convertDate(b.event.date)}</p>
              <i>{b.event.location}</i>
            </div>
            <div className="booking-tickets">
              <p>Tickets</p>
              <p>{b.numberOfTickets}</p>
            </div>
          </div>
          <div className="booking-detail">
            <div className="booking-status">
              <p>Status:</p>
              {status(b.status)}
            </div>
            <button className="update-button">Update</button>
            <button className="cancel-button">Cancel</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
