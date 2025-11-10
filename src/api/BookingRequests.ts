import { getToken } from "../localstorage/Token";
import { Booking } from "../models/Booking";
import {
  BOOK_EVENT_URL,
  CANCEL_BOOKING_URL,
  DELETE_BOOKING_BY_BOOKINGID_ADMIN,
  GET_ALL_BOOKINGS_BY_USERID_URL_ADMIN,
  UPDATE_BOOKING_URL,
} from "./API_URLS";

export async function bookEvent(eventID: string, nbOfTickets: number) {
  try {
    const response = await fetch(
      `${BOOK_EVENT_URL}?eventID=${eventID}&numberOfTickets=${nbOfTickets}`,
      {
        method: "POST",
        headers: {
          Authorization: getToken() ?? "",
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

export async function cancelBooking(bookingID: string) {
  try {
    const response = await fetch(
      `${CANCEL_BOOKING_URL}?bookingID=${bookingID}`,
      {
        method: "PUT",
        headers: {
          Authorization: getToken() ?? "",
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    return await response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateBooking(bookingID: string, nbTickets: number) {
  try {
    const response = await fetch(
      `${UPDATE_BOOKING_URL}?bookingID=${bookingID}&numberOfTickets=${nbTickets}`,
      {
        method: "PUT",
        headers: {
          Authorization: getToken() ?? "",
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const updated = await response.json();

    return new Booking(
      updated.bookingId,
      updated.event,
      updated.username,
      updated.numberOfTickets,
      updated.status,
      updated.dateCreated
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
}

//AMIN
export async function getBookingsByUserId(userId: string) {
  try {
    const response = await fetch(
      `${GET_ALL_BOOKINGS_BY_USERID_URL_ADMIN}?userID=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: getToken() ?? "",
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const json = await response.json();
    const bookings: Booking[] = json.map((b: Booking) => {
      return new Booking(
        b.bookingId,
        b.event,
        b.username,
        b.numberOfTickets,
        b.status,
        b.dateCreated
      );
    });

    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteBookingById(bookingId: string) {
  try {
    const response = await fetch(
      `${DELETE_BOOKING_BY_BOOKINGID_ADMIN}?bookingID=${bookingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: getToken() ?? "",
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    return await response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
