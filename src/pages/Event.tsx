import classNames from "classnames";
import { Event } from "../models/Event";
import { useEffect, useState } from "react";
import "../styles/buttons.css";
import "../styles/event-page.css";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/EventRequests";
import { Bars } from "react-loader-spinner";
import { Toast } from "../components/modals/Toast";
import { convertDate } from "../utility/DateUtility";
import type { Booking } from "../models/Booking";
import { bookEvent } from "../api/BookingRequests";
import { useToastStore } from "../store/ToastStore";

export function EventPage() {
  const eventId: string | undefined = useParams().id;
  const [event, setEvent] = useState<Event | null>(null);
  const showToast = useToastStore((store) => store.showToast);

  const fetchEvent = async () => {
    const response: any = await getEventById(eventId);
    return response;
  };

  useEffect(() => {
    fetchEvent().then(setEvent);
  }, []);

  const [msgStatus, setMsgStatus] = useState<string>("hidden");
  const [message, setMessage] = useState<string>("");

  const handleBooking = async () => {
    let message: string;
    try {
      if (!event) return;

      const ticketString = prompt("How many tickets do you want?", "1");
      const tickets: number = ticketString ? Number.parseInt(ticketString) : 0;

      if (tickets < 1)
        throw Error("You need to enter a valid number of tickets.");

      const booking: Booking = await bookEvent(event?.eventId, tickets);
      message =
        "You've booked " +
        booking.numberOfTickets +
        " tickets for " +
        booking.event.performer +
        ".<br/> See you on the " +
        convertDate(booking.event.date) +
        "<br/> at " +
        booking.event.location +
        "!";
      fetchEvent().then(setEvent);
      showToast("STATUS:" + booking.status, message, "green");
    } catch (error: any) {
      showToast("Error while booking event", error.message, "red");
    }
  };

  return (
    <main className="event-main">
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
        <>
          <section className="event-section">
            <h2>{event.performer}</h2>
            <h3>{convertDate(event.date)}</h3>
            <img src={event.pictureUrl} alt={event.performer} />
            <p>{event.description}</p>
          </section>
          <section className="location-section">
            <h3>{event.location}</h3>
            <span>
              <b>Seat capacity:</b> {event.numberOfSeats}
            </span>
            <span>
              <b>Seats available:</b> {event.numberOfSeatsLeft}
            </span>
            <span>
              <b>Bookings made:</b> {event.numberOfBookings}
            </span>
            <button className="book-event-page" onClick={handleBooking}>
              Book {event.performer}
            </button>
          </section>
          <section className={classNames("message", msgStatus)}>
            {message}
          </section>
        </>
      )}
    </main>
  );
}
