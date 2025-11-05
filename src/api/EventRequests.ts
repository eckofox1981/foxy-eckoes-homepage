import { Event, EventFilterDTO } from "../models/Event";
import {
  FILTER_EVENT_URL,
  GET_ALL_EVENT_URL,
  GET_EVENT_BY_ID_URL,
} from "./API_URLS";

export async function getAllEvents() {
  try {
    const response = await fetch(GET_ALL_EVENT_URL, {
      method: "GET",
      headers: {
        CORS: "Access-control-Allow-Origin",
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json: any[] = await response.json();

    const events: Event[] = json.map(
      (e) =>
        new Event(
          e.eventId,
          e.date,
          e.performer,
          e.description,
          e.location,
          e.pictureUrl,
          e.tags,
          e.numberOfSeats,
          e.numberOfSeatsLeft,
          e.numberOfBookings
        )
    );

    return events;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getEventById(eventID: string) {
  try {
    const response = await fetch(`${GET_EVENT_BY_ID_URL}${eventID}`, {
      method: "GET",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();

    return new Event(
      json.eventId,
      json.date,
      json.performer,
      json.description,
      json.location,
      json.pictureUrl,
      json.tags,
      json.numberOfSeats,
      json.numberOfSeatsLeft,
      json.numberOfBookings
    );
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function filterEvent(filterDTO: EventFilterDTO) {
  try {
    const response = await fetch(FILTER_EVENT_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(filterDTO),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json: any[] = await response.json();

    const events: Event[] = json.map(
      (e) =>
        new Event(
          e.eventId,
          e.date,
          e.performer,
          e.description,
          e.location,
          e.pictureUrl,
          e.tags,
          e.numberOfSeats,
          e.numberOfSeatsLeft,
          e.numberOfBookings
        )
    );

    return events;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
