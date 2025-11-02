export class Event {
  eventId: string;
  date: Date;
  performer: string;
  description: string;
  location: string;
  pictureUrl: string;
  tags: string[];
  numberOfSeats: number;
  numberOfSeatsLeft: number;
  numberOfBookings: number;

  constructor(
    eventId: string,
    date: Date,
    performer: string,
    description: string,
    location: string,
    pictureUrl: string,
    tags: string[],
    numberOfSeats: number,
    numberOfSeatsLeft: number,
    numberOfBookings: number
  ) {
    this.eventId = eventId;
    this.date = date;
    this.performer = performer;
    this.description = description;
    this.location = location;
    this.pictureUrl = pictureUrl;
    this.tags = tags;
    this.numberOfSeats = numberOfSeats;
    this.numberOfSeatsLeft = numberOfSeatsLeft;
    this.numberOfBookings = numberOfBookings;
  }
}
