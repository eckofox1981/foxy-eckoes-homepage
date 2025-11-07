import { useState } from "react";
import "../styles/buttons.css";
import "../styles/admin-controls.css";
import { SeatAvailibityControl } from "./modals/SeatAvailibilityControl";
import { EventEditor } from "./modals/EventEditor";
import { EventUpdateSelector } from "./modals/EventSelector";
import { useEventUpdateStore } from "../store/EventUpdateStore";
export function AdminControls() {
  const [showSeatControl, setShowSeatControl] = useState<string>("hidden");
  const [showEventEditor, setShowEventEditor] = useState<string>("hidden");
  const [showEventUpdate, setShowEventUpdate] = useState<string>("hidden");

  const removeEventUpdate = useEventUpdateStore(
    (store) => store.removeEventUpdate
  );

  const handleCreate = () => {
    if (showEventEditor === "hidden") {
      setShowEventEditor("");
    } else {
      setShowEventEditor("hidden");
      removeEventUpdate();
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
            See bookings
          </button>
          <br />
        </div>
      </section>
      {/*Lesson today: modal at the bottom appears on top of the others*/}
      <EventUpdateSelector
        show={showEventUpdate}
        close={handleUpdate}
        showEventEditor={handleCreate}
      />
      <SeatAvailibityControl
        show={showSeatControl}
        close={handleAvailibilityControl}
      />
      <EventEditor show={showEventEditor} close={handleCreate} />
    </>
  );
}
