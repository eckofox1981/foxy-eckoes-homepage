import { EventCard } from "./EventCard";
import "../styles/event-list.css";
import { Event } from "../models/Event";
import { Bars } from "react-loader-spinner";

export function EventList({ events }: { events: Event[] }) {
  return (
    <>
      {events.length !== 0 ? (
        <section className="event-list">
          {events.map((e, index) => (
            <EventCard key={index} show={e} />
          ))}
        </section>
      ) : (
        <div className="loadingList">
          <Bars
            height={80}
            width={80}
            color="var(--special-color)"
            ariaLabel="Fetching list"
          />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
