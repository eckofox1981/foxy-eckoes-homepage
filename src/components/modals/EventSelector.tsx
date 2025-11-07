import classNames from "classnames";
import { useEffect, useState } from "react";
import { Event } from "../../models/Event";
import { getAllEvents } from "../../api/EventRequests";
import { useToastStore } from "../../store/ToastStore";
import { AdminEventCard } from "../AdminEventCard";
import { useEventListUpdateStore } from "../../store/EventUpdateStore";

export function EventUpdateSelector({
  show,
  close,
  showEventEditor,
}: {
  show: string;
  close: () => void;
  showEventEditor: () => void;
}) {
  const [display, setDisplay] = useState<string>("hidden");
  const showToast = useToastStore((store) => store.showToast);
  const events = useEventListUpdateStore((store) => store.eventListUpdate);
  const setEvents = useEventListUpdateStore(
    (store) => store.setEventListUpdate
  );

  const fetchEvents = async () => {
    try {
      const list = await getAllEvents();
      setEvents(list);
    } catch (error: any) {
      showToast("Error fetching events:", error.message, "red");
    }
  };

  useEffect(() => {
    if (show !== "hidden") {
      fetchEvents();
    }
    setDisplay(show);
  }, [show]);

  const handleCancel = () => {
    close();
  };

  return (
    <section className={classNames("modal", display)}>
      <h2 style={{ margin: "0.25rem" }}>Select event to update or delete</h2>
      <div className="scrollable">
        {!events || events.length === 0 ? (
          <p>No events in database or unable to fetch events.</p>
        ) : (
          events.map((e, index) => (
            <AdminEventCard
              key={index}
              event={e}
              refreshEventList={fetchEvents}
              showEventEditor={showEventEditor}
            />
          ))
        )}
      </div>
      <button className="menu-button" onClick={handleCancel}>
        Close
      </button>
    </section>
  );
}
