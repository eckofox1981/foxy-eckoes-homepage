import { useEffect, useState } from "react";
import { EventList } from "../components/Eventlist";
import { HeroSection } from "../components/Hero";
import "../styles/home.css";
import { getAllEvents } from "../api/EventRequests";
import { Event } from "../models/Event";

export function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetched = await getAllEvents();
        setEvents(fetched);
      } catch (err: any) {
        //TODO show toast
        console.log("====================================");
        console.log(err.message);
        console.log("====================================");
      }
    };

    getEvents();
  }, []);

  return (
    <main className="home-main">
      <HeroSection event={events[0]} />
      <EventList events={events} />
    </main>
  );
}
