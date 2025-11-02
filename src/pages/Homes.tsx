import { EventList } from "../components/Eventlist";
import { HeroSection } from "../components/Hero";
import "../styles/home.css";

export function Home() {
  return (
    <main className="home-main">
      <HeroSection />
      <EventList />
    </main>
  );
}
