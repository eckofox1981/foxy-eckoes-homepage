import { getToken } from "../localstorage/Token";
import { Booking } from "../models/Booking";
import { convertDate } from "../utility/DateUtility";
import { BOOK_EVENT_URL } from "./API_URLS";

export async function bookEvent(eventID: string, nbOfTickets: number) {
  try {
    const response = await fetch(
      `${BOOK_EVENT_URL}?eventID=${eventID}&numberOfTickets=${nbOfTickets}`,
      {
        method: "POST",
        headers: {
          Authorization: getToken(),
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const bookingJson = await response.json();
    const booking = new Booking(
      bookingJson.bookingId,
      bookingJson.event,
      bookingJson.username,
      bookingJson.numberOfTickets,
      bookingJson.status,
      bookingJson.dateCreated
    );

    return booking;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
