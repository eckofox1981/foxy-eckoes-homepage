import { useState } from "react";
import "../styles/buttons.css";
import "../styles/admin-controls.css";
import { SeatAvailibityControl } from "./modals/SeatAvailibilityControl";
import { EventEditor } from "./modals/EventEditor";
import { AdminEventCard } from "./AdminEventCard";
import { EventUpdateSelector } from "./modals/EventSelector";
import type { Event } from "../models/Event";
export function AdminControls() {
  const [eventToUpdate, setEventToUpdate] = useState<Event | null>(null);
  const [showSeatControl, setShowSeatControl] = useState<string>("hidden");
  const [showEventEditor, setShowEventEditor] = useState<string>("hidden");
  const [showEventUpdate, setShowEventUpdate] = useState<string>("hidden");

  const handleCreate = () => {
    if (showEventEditor === "hidden") {
      setShowEventEditor("");
    } else {
      setShowEventEditor("hidden");
    }
  };

  const handleUpdate = () => {
    if (showEventUpdate === "hidden") {
      setShowEventUpdate("");
    } else {
      setShowEventUpdate("hidden");
    }
  };

  const handleAvailibilityControl = () => {
    if (showSeatControl === "hidden") {
      setShowSeatControl("");
    } else {
      setShowSeatControl("hidden");
    }
  };

  const handleSeeBookings = () => {
    console.log("see bookings");
  };

  return (
    <>
      <section className="admin-section">
        <h2>Administrator section</h2>
        <h3>Event management</h3>
        <div>
          <button className="update-button" onClick={handleCreate}>
            Create Event
          </button>
          <button className="update-button" onClick={handleUpdate}>
            Update Event
          </button>
          <button className="update-button" onClick={handleAvailibilityControl}>
            Seat Availibity control
          </button>
        </div>
        <h3>Booking management</h3>
        <div>
          <button className="update-button" onClick={handleSeeBookings}>
            See all bookings
          </button>
          <br />
        </div>
      </section>
      <EventEditor
        event={eventToUpdate}
        show={showEventEditor}
        close={handleCreate}
      />
      <EventUpdateSelector show={showEventUpdate} close={handleUpdate} />
      <SeatAvailibityControl
        show={showSeatControl}
        close={handleAvailibilityControl}
      />
    </>
  );
}
