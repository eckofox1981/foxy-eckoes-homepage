import { EventCard } from "./EventCard";
import "../styles/event-list.css";
import { useEffect, useState } from "react";
import { Event } from "../models/Event";
import { getAllEvents } from "../api/GetEvent";

export function EventList({ events }: { events: Event[] }) {
  return (
    <section className="event-list">
      {events.map((e, index) => (
        <EventCard key={index} show={e} />
      ))}
    </section>
  );
}
