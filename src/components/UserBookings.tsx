import { Link } from "react-router-dom";
import type { Booking } from "../models/Booking";
import "../styles/buttons.css";
import "../styles/user-bookings.css";
import { convertDate } from "../utility/DateUtility";
import { cancelBooking, updateBooking } from "../api/BookingRequests";
import { useToastStore } from "../store/ToastStore";

export function UserBookings({
  bookings,
  reloadUser,
}: {
  bookings: Booking[];
  reloadUser: () => void;
}) {
  const showToast = useToastStore((store) => store.showToast);

  const status = (status: string) => {
    let statusColor: string = "grey";
    if (status === "CONFIRMED") statusColor = "green";
    if (status === "CANCELLED") statusColor = "red";
    if (status === "PENDING") statusColor = "var(--special-color)";

    return <p style={{ color: statusColor }}>{status.toUpperCase()}</p>;
  };

  const handleCancel = async (bookingID: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const message: string = await cancelBooking(bookingID);
      showToast("Booking cancelled 😢", message, "var(--special-color");
      reloadUser();
    } catch (error: any) {
      showToast("Error while cancelling booking:", error.message, "red");
    }
  };

  const handleUpdate = async (bookingID: string) => {
    try {
      const ticketString = prompt("How many tickets do you want?", "1");
      const tickets: number = ticketString ? Number.parseInt(ticketString) : 0;

      if (tickets < 1)
        throw Error("You need to enter a valid number of tickets.");

      const booking: Booking = await updateBooking(bookingID, tickets);

      showToast(
        "Booking updated:",
        "Your booking for " +
          booking.event.performer +
          " on the " +
          convertDate(booking.event.date) +
          "has been updated",
        "green"
      );
      reloadUser();
    } catch (error: any) {
      showToast("ERROR WHILE UPDATING EVENT", error.message, "red");
    }
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
            {b.status !== "CANCELLED" ? (
              <button
                className="update-button"
                onClick={() => {
                  handleUpdate(b.bookingId);
                }}
              >
                Update
              </button>
            ) : (
              <button
                className="update-button"
                style={{
                  textDecoration: "line-through",
                  backgroundColor: "var(--backgroun-primary)",
                }}
              >
                Update
              </button>
            )}
            <button
              className="cancel-button"
              onClick={() => {
                handleCancel(b.bookingId);
              }}
            >
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
