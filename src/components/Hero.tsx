import { Event } from "../models/Event";
import "../styles/hero-section.css";
import "../styles/buttons.css";

export function HeroSection() {
  const fillerEvent = new Event(
    "QQQQ-1234-ZZZ-4567",
    new Date(),
    "Metallica",
    "Heavy metal legends deliver an explosive evening of thrash metal classics and new material from their 72 Seasons album.",
    "Telenor Arena, Oslo, Norway",
    "https://contentf5.dailynewshungary.com/wp-content/uploads/2025/06/metallica-concert.jpg",
    ["metal", "heavy metal", "thrash metal", "Metallica", "Oslo", "Norway"],
    23000,
    23000,
    0
  );

  return (
    <section className="hero-section">
      <img src={fillerEvent.pictureUrl} alt={fillerEvent.performer} />
      <div className="text-content">
        <div className="title">
          <h2>{fillerEvent.performer}</h2>
          <h3>Live at {fillerEvent.location}</h3>
          <h4>{fillerEvent.date.toDateString()}</h4>
        </div>
        <button className="book-button">Book now!</button>
        <p>{fillerEvent.description}</p>
      </div>
    </section>
  );
}
