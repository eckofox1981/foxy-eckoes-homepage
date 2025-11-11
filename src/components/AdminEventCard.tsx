import type { Event } from "../models/Event";
import { convertDate } from "../utility/DateUtility";
import "../styles/admin-event-card.css";
import "../styles/buttons.css";
import { deleteEvent } from "../api/EventRequests";
import { useToastStore } from "../store/ToastStore";
import { useEventUpdateStore } from "../store/EventUpdateStore";

export function AdminEventCard({
  event,
  refreshEventList,
  showEventEditor,
}: {
  event: Event;
  refreshEventList: () => void;
  showEventEditor: () => void;
}) {
  const showToast = useToastStore((store) => store.showToast);
  const eventDate: string = event ? convertDate(event?.date) : "";
  const setEventUpdate = useEventUpdateStore((store) => store.setEventUpdate);

  const handleUpdate = () => {
    setEventUpdate(event);
    showEventEditor();
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this event? I will be DELETED from the database."
      )
    ) {
      return;
    }

    try {
      const response: string = await deleteEvent(event.eventId);
      refreshEventList();
      showToast("Event deleted", response, "green");
    } catch (error: any) {
      showToast("Error deleting event:", error.message, "red");
    }
  };

  return (
    <article className="admin-event-card">
      <div className="admin-event-card-details">
        <b>{event.performer}</b>
        <i>{event.location}</i>
        <p>{eventDate}</p>
      </div>
      <div className="admin-event-card-buttons">
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
        <button className="cancel-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
