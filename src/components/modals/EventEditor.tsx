import { useEffect, useState } from "react";
import "../../styles/modal.css";
import classNames from "classnames";
import { Event } from "../../models/Event";
import "../../styles/event-editor.css";

export function EventEditor({
  event,
  show,
  close,
}: {
  event: Event | null;
  show: string;
  close: () => void;
}) {
  const [display, setDisplay] = useState<string>("hidden");
  const [newEvent, setEvent] = useState<Event | null>(null);
  const [eventID, setEventID] = useState<string | undefined>("");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [performer, setPerformer] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [pictureUrl, setPictureUrl] = useState<string | undefined>("");
  const [tags, setTags] = useState<string[] | undefined>([]);
  const [numberOfSeats, setNbOSeats] = useState<number | undefined>(0);

  useEffect(() => {
    if (event === null) {
      setIsNew(true);
    } else {
      setEvent(event);
      setEventID(newEvent?.eventId);
      setDate(newEvent?.date);
      setPerformer(newEvent?.performer);
      setDescription(newEvent?.description);
      setLocation(newEvent?.location);
      setPictureUrl(newEvent?.pictureUrl);
      setTags(newEvent?.tags);
      setNbOSeats(newEvent?.numberOfSeats);
    }
    setDisplay(show);
  }, [show]);

  const handleCancel = () => {
    close();
  };

  const handleCreate = () => {
    console.log("create event");
  };

  return (
    <section className={classNames("modal", display)}>
      <i>
        Event ID#:{" "}
        {newEvent?.eventId
          ? newEvent.eventId
          : "new event -> ID to be generated."}
      </i>
      <form action="edit" className="edit-form">
        <div>
          <label htmlFor="date">Date: </label>

          <input
            type="datetime-local"
            id="date"
            value={
              newEvent?.date ? newEvent.date.toISOString().slice(0, 16) : ""
            }
            className="date-input"
          />
        </div>
        <div>
          <label htmlFor="performer">Performer: </label>
          <input
            type="text"
            id="performer"
            value={newEvent?.performer}
            placeholder="name of the artist"
          />
        </div>
        <div>
          <label htmlFor="desciption">Description: </label>
          <textarea
            id="description"
            value={newEvent?.description}
            placeholder="description fo the event"
          />
        </div>
        <div>
          <label htmlFor="location">location: </label>
          <input
            type="text"
            id="location"
            value={newEvent?.location}
            placeholder="Arena, Town, Country"
          />
        </div>
        <div>
          <label htmlFor="pictureUrl">picture URL: </label>
          <input
            type="text"
            id="pictureUrl"
            value={newEvent?.pictureUrl}
            placeholder="Optional: a link to a picture from the web"
          />
        </div>
        <div>
          <label htmlFor="tags">tags: </label>
          <input
            type="text"
            id="tags"
            value={newEvent?.tags}
            placeholder="Tags separated by spaces"
          />
        </div>
        <div>
          <label htmlFor="number-of-seats">Number of seats: </label>
          <input
            type="text"
            id="number-of-seats"
            value={newEvent?.numberOfSeats}
            placeholder="A number without decimals nor spaces."
          />
        </div>
      </form>
      <div className="event-editor-buttons">
        {isNew ? (
          <button className="menu-button" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="update-button">Update event</button>
        )}
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}
