import { useEffect, useState } from "react";
import "../../styles/modal.css";
import classNames from "classnames";
import { Event, NewEvent } from "../../models/Event";
import "../../styles/event-editor.css";
import { useToastStore } from "../../store/ToastStore";
import {
  createEvent,
  getAllEvents,
  updateEvent,
} from "../../api/EventRequests";
import { useNavigate } from "react-router-dom";
import {
  useEventListUpdateStore,
  useEventUpdateStore,
} from "../../store/EventUpdateStore";

export function EventEditor({
  show,
  close,
}: {
  show: string;
  close: () => void;
}) {
  const [display, setDisplay] = useState<string>("hidden");
  const [isNew, setIsNew] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [performer, setPerformer] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [numberOfSeats, setNbOSeats] = useState<number>(0);
  const showToast = useToastStore((store) => store.showToast);
  const navigate = useNavigate();
  const event = useEventUpdateStore((store) => store.eventUpdate);
  const removeEvent = useEventUpdateStore((store) => store.removeEventUpdate);
  const setEvents = useEventListUpdateStore(
    (store) => store.setEventListUpdate
  );

  useEffect(() => {
    console.log("Effect triggered - event:", event);

    if (event === null) {
      // New event - reset to defaults
      setIsNew(true);
      setDate(new Date());
      setPerformer("");
      setDescription("");
      setLocation("");
      setPictureUrl("");
      setTags([]);
      setNbOSeats(0);
    } else {
      setIsNew(false);
      const eventDate = new Date(event.date);
      setDate(eventDate);
      setPerformer(event.performer);
      setDescription(event.description);
      setLocation(event.location);
      setPictureUrl(event.pictureUrl || "");
      setTags(event.tags || []);
      setNbOSeats(event.numberOfSeats);
    }
    setDisplay(show);
  }, [show, event]);

  const handleCancel = () => {
    removeEvent();
    close();
  };

  const handleCreate = async () => {
    const errors = checkFields(
      date,
      performer,
      description,
      location,
      tags,
      numberOfSeats
    );
    if (errors.length > 0) {
      showToast("New Event incomplete:", errors.join("\n"), "red");
      return;
    }

    const event = new NewEvent(
      date,
      performer,
      description,
      location,
      pictureUrl,
      tags,
      numberOfSeats
    );
    console.log(JSON.stringify(event));

    try {
      const eventID = await createEvent(event);
      showToast(
        "Event created!",
        "The event with " + performer + " has been created.",
        "green"
      );
      navigate(`/event/${eventID}`);
    } catch (error: any) {
      showToast("Error creating event:", error.message, "red");
    }
  };

  const handleUpdate = async () => {
    const updatedEvent = new Event(
      event?.eventId ?? "",
      date,
      performer,
      description,
      location,
      pictureUrl,
      tags,
      numberOfSeats,
      event?.numberOfSeatsLeft ?? numberOfSeats,
      event?.numberOfBookings ?? 0
    );

    try {
      const eventID = await updateEvent(updatedEvent);
      showToast(
        "Event updated",
        "The event \n" + eventID + "\n has been updated.",
        "green"
      );
      const newList: Event[] = await getAllEvents();
      setEvents(newList);
      setDisplay("hidden");
    } catch (error: any) {
      showToast("Error updating event:", error.message, "red");
    }
  };

  return (
    <section className={classNames("modal", display)}>
      <i>
        Event ID#:{" "}
        {event?.eventId ? event.eventId : "new event -> ID to be generated."}
      </i>
      <form action="edit" className="edit-form">
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="datetime-local"
            id="date"
            value={date ? date.toISOString().slice(0, 16) : ""}
            className="date-input"
            onChange={(e) => {
              setDate(new Date(e.target.value));
            }}
          />
        </div>
        <div>
          <label htmlFor="performer">Performer: </label>
          <input
            type="text"
            id="performer"
            value={performer}
            placeholder="name of the artist"
            onChange={(e) => {
              setPerformer(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="desciption">Description: </label>
          <textarea
            id="description"
            value={description}
            placeholder="description fo the event"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="location">location: </label>
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Arena, Town, Country"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="pictureUrl">picture URL: </label>
          <input
            type="text"
            id="pictureUrl"
            value={pictureUrl}
            placeholder="Optional: a link to a picture from the web"
            onChange={(e) => {
              setPictureUrl(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="tags">tags: </label>
          <input
            type="text"
            id="tags"
            value={tags?.join(" ")}
            placeholder="Tags separated by spaces"
            onChange={(e) => {
              setTags(e.target.value.split(" "));
            }}
          />
        </div>
        <div>
          <label htmlFor="number-of-seats">Number of seats: </label>
          <input
            type="text"
            id="number-of-seats"
            value={numberOfSeats}
            placeholder="A number without decimals nor spaces."
            onChange={(e) => {
              const seats = Number.parseInt(e.target.value);
              setNbOSeats(seats);
            }}
          />
        </div>
      </form>
      <div className="event-editor-buttons">
        {isNew ? (
          <button className="menu-button" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="update-button" onClick={handleUpdate}>
            Update event
          </button>
        )}
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}

function checkFields(
  date: Date | null | undefined,
  performer: string | undefined,
  description: string | undefined,
  location: string | undefined,
  tags: string[] | undefined,
  numberOfSeats: number | undefined
) {
  let errors: string[] = [];

  if (date === undefined || date === null) {
    errors.push("Please pick a date.");
  }

  if (performer === "") {
    errors.push("Please enter a performer.");
  }

  if (description === "") {
    errors.push("Please enter a description.");
  }

  if (location === "") {
    errors.push("Please enter a location.");
  }

  if (!tags || tags?.length === 0) {
    errors.push("Please enter a tag.");
  }

  if (numberOfSeats === 0) {
    errors.push("Please enter the number of seats available.");
  }

  return errors;
}
