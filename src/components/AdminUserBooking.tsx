import classNames from "classnames";
import { useState } from "react";
import { Booking } from "../models/Booking";
import { getBookingsByUserId } from "../api/BookingRequests";
import { useToastStore } from "../store/ToastStore";
import { UserBookings } from "./UserBookings";
import { convertDate } from "../utility/DateUtility";

export function AdminUserBooking({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  const [hidden, setHidden] = useState<string>("hidden");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const showToast = useToastStore((store) => store.showToast);

  const fetchBookings = async () => {
    try {
      const fetched: Booking[] = await getBookingsByUserId(userId);
      setBookings(fetched);
    } catch (error: any) {
      showToast("Error fetching user booking:", error.message, "red");
      setBookings([]);
    }
  };

  const show = () => {
    if (hidden === "hidden") {
      setHidden("");
      fetchBookings();
    } else {
      setHidden("hidden");
    }
  };

  const statusWithColor = (s: string) => {
    let statusColor: string;
    if (s === "CONFIRMED") {
      statusColor = "green";
    } else if (s === "CANCELLED") {
      statusColor = "red";
    } else {
      statusColor = "var(--text-color)";
    }

    return <p style={{ color: statusColor }}>STATUS: {s}</p>;
  };

  const handleDelete = (bookingID: string) => {
    console.log("delete ID: " + bookingID);
  };

  //TODO add keys to booking item
  return (
    <li className="user-item" key={userId} onClick={show}>
      <span className="user-item-username">{username}</span>
      <span>{userId}</span>
      <div className={classNames("user-booking-list", hidden)}>
        {bookings.length === 0 ? (
          <i>No booking for this user.</i>
        ) : (
          bookings.map((b, index) => (
            <div key={index} className="user-booking-item-for-admin">
              <i>Booking ID: {b.bookingId}</i>
              <div>
                <div className="user-booking-event-info">
                  <h3>{b.event.performer}</h3>
                  <p>{convertDate(b.event.date)}</p>
                  <p>{b.event.location}</p>
                </div>
                <div className="user-booking-booking-info">
                  <p>Nb of tickets: {b.numberOfTickets}</p>
                  {statusWithColor(b.status)}
                </div>
                <button
                  className="cancel-button"
                  onClick={() => {
                    handleDelete(b.bookingId);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </li>
  );
}
