import { useState } from "react";
import { EventList } from "../components/Eventlist";
import "../styles/buttons.css";
import "../styles/events.css";
import { Event, EventFilterDTO } from "../models/Event";
import { filterEvent } from "../api/EventRequests";
import { useToastStore } from "../store/ToastStore";

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [performer, setPerformer] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const showToast = useToastStore((store) => store.showToast);

  const handleFilter = async () => {
    const filterDTO: EventFilterDTO = new EventFilterDTO(
      fromDate,
      toDate,
      performer,
      location,
      tags.split(" ")
    );

    try {
      const eventsReturned: Event[] = await filterEvent(filterDTO);
      setEvents(eventsReturned);
    } catch (error: any) {
      showToast(
        "Error filtering events:",
        error.message,
        "var(--special-color)"
      );
    }
  };

  return (
    <main>
      <h2>Fill in the fields below to filter the events available</h2>
      <section className="events-filter-section">
        <form action="filter" className="filter-form">
          <label htmlFor="fromDate">From date:</label>
          <input
            type="date"
            id="fromDate"
            onChange={(e) => {
              setFromDate(new Date(e.target?.value));
            }}
          />
          <label htmlFor="toDate">To date:</label>
          <input
            type="date"
            id="toDate"
            onChange={(e) => {
              setToDate(new Date(e.target?.value));
            }}
          />
          <label htmlFor="performer">Performer:</label>
          <input
            type="text"
            id="performer"
            placeholder="Metallica, Bob Marley..."
            onChange={(e) => {
              setPerformer(e.target?.value);
            }}
          />
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="Oslo, Paris..."
            onChange={(e) => {
              setLocation(e.target?.value);
            }}
          />
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            placeholder="Rock Oslo Sweden etc..."
            onChange={(e) => {
              setTags(e.target?.value);
            }}
          />
        </form>
        <button className="menu-button" onClick={handleFilter}>
          Filter
        </button>
      </section>
      {events === null || events.length === 0 ? (
        <p>That search did not return any events</p>
      ) : (
        <EventList events={events} />
      )}
    </main>
  );
}
