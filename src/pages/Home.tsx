import { useEffect, useState } from "react";
import { EventList } from "../components/Eventlist";
import { HeroSection } from "../components/Hero";
import "../styles/home.css";
import { getAllEvents } from "../api/EventRequests";
import { Event } from "../models/Event";
import { useToastStore } from "../store/ToastStore";

export function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const showToast = useToastStore((store) => store.showToast);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const fetched = await getAllEvents();
        setEvents(fetched);
      } catch (err: any) {
        showToast("Error loading events!", err.message, "red");
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
