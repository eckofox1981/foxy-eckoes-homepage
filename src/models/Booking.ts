import type { Event } from "./Event";

export class Booking {
  bookingId: string;
  event: Event;
  username: string;
  numberOfTickets: number;
  status: string;
  dateCreated: Date;

  constructor(
    bookingId: string,
    event: Event,
    username: string,
    numberOfTickets: number,
    status: string,
    dateCreated: Date
  ) {
    this.bookingId = bookingId;
    this.event = event;
    this.username = username;
    this.numberOfTickets = numberOfTickets;
    this.status = status;
    this.dateCreated = dateCreated;
  }
}
