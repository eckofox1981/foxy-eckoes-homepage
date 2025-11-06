import { useState } from "react";
import "../styles/buttons.css";
import "../styles/admin-controls.css";
import { SeatAvailibityControl } from "./modals/SeatAvailibilityControl";
import { EventEditor } from "./modals/EventEditor";
export function AdminControls() {
  const [eventId, setEventID] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [showSeatControl, setShowSeatControl] = useState<string>("hidden");
  const [showEventEditor, setShowEventEditor] = useState<string>("hidden");

  const handleCreate = () => {
    if (showEventEditor === "hidden") {
      setShowEventEditor("");
    } else {
      setShowEventEditor("hidden");
    }
  };

  const handleUpdate = () => {
    console.log("update event");
  };

  const handleAvailibilityControl = () => {
    if (showSeatControl === "hidden") {
      setShowSeatControl("");
    } else {
      setShowSeatControl("hidden");
    }
  };

  const handleCancelEvent = () => {
    console.log("cancel event: " + eventId);
  };

  const handleSeeBookings = () => {
    console.log("see bookings");
  };

  const handleDeleteBooking = () => {
    console.log("delete booking: " + bookingId);
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
          <br />
          <button className="update-button" onClick={handleAvailibilityControl}>
            Seat Availibity control
          </button>
          <div className="cancel-event">
            <input
              id="eventIdInput"
              type="text"
              value={eventId}
              onChange={(e) => {
                setEventID(e.target?.value);
              }}
              placeholder="Event ID to be cancelled"
            />
            <button className="cancel-button" onClick={handleCancelEvent}>
              Cancel Event
            </button>
          </div>
        </div>
        <h3>Booking management</h3>
        <div>
          <button className="update-button" onClick={handleSeeBookings}>
            See all bookings
          </button>
          <br />
          <div className="cancel-event">
            <input
              type="text"
              value={bookingId}
              onChange={(e) => {
                setBookingId(e.target?.value);
              }}
              placeholder="Booking ID to be deleted"
            />
            <button className="cancel-button" onClick={handleDeleteBooking}>
              Delete Booking
            </button>
          </div>
        </div>
      </section>
      <EventEditor event={null} show={showEventEditor} close={handleCreate} />
      <SeatAvailibityControl show={showSeatControl} />
    </>
  );
}
