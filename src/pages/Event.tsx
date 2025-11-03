import classNames from "classnames";
import { Event } from "../models/Event";
import { useEffect, useState } from "react";
import "../styles/buttons.css";
import "../styles/event-page.css";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/GetEvent";
import { Bars } from "react-loader-spinner";

export function EventPage() {
  const eventId: string | undefined = useParams().id;
  const [event, setEvent] = useState<Event | null>(null);
  useEffect(() => {
    const fetchEvent = async () => {
      const response: any = await getEventById(eventId);
      return response;
    };

    fetchEvent().then(setEvent);
  }, []);

  const [msgStatus, setMsgStatus] = useState<string>("hidden");
  const [message, setMessage] = useState<string>("");

  const eventDate: Date = event ? new Date(event.date) : new Date();

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
            <h3>{eventDate.toDateString()}</h3>
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
            <button
              className="book-event-page"
              onClick={() => {
                setMessage("Booking confirmed!");
                setMsgStatus("success");
              }}
            >
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
